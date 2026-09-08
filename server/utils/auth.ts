import type { H3Event } from 'h3'

const FIREBASE_PROJECT_ID = 'xkproduction-d6fce'
const JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'

export interface FirebaseClaims {
  uid: string
  email: string
  name?: string
  picture?: string
  email_verified: boolean
  iat: number
  exp: number
}

interface JwkKey { kty: string; kid: string; n: string; e: string; alg: string; use: string }

let keyCache: Map<string, CryptoKey> | null = null
let keyCachedAt = 0
const KEY_CACHE_TTL_MS = 60 * 60 * 1000

async function getPublicKeys(): Promise<Map<string, CryptoKey>> {
  const now = Date.now()
  if (keyCache && now - keyCachedAt < KEY_CACHE_TTL_MS) return keyCache

  const res = await fetch(JWKS_URL)
  if (!res.ok) throw createError({ statusCode: 503, message: 'Cannot fetch Firebase public keys' })

  const jwks = (await res.json()) as { keys: JwkKey[] }
  const map = new Map<string, CryptoKey>()

  for (const jwk of jwks.keys) {
    const key = await crypto.subtle.importKey(
      'jwk',
      jwk,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify'],
    )
    map.set(jwk.kid, key)
  }

  keyCache = map
  keyCachedAt = now
  return map
}

function b64urlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

export async function verifyFirebaseToken(token: string, projectId = 'xkproduction-d6fce'): Promise<FirebaseClaims> {
  const parts = token.split('.')
  if (parts.length !== 3) throw createError({ statusCode: 401, message: 'Invalid token format' })

  const [headerB64, payloadB64, sigB64] = parts

  let header: { alg: string; kid: string }
  try {
    header = JSON.parse(new TextDecoder().decode(b64urlDecode(headerB64!)))
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid token header' })
  }

  if (header.alg !== 'RS256') throw createError({ statusCode: 401, message: 'Unsupported algorithm' })

  const keys = await getPublicKeys()
  let cryptoKey = keys.get(header.kid)
  if (!cryptoKey) {
    keyCache = null
    const freshKeys = await getPublicKeys()
    cryptoKey = freshKeys.get(header.kid)
    if (!cryptoKey) throw createError({ statusCode: 401, message: 'Unknown key ID' })
  }

  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`)
  const sigRaw = b64urlDecode(sigB64!)
  const sig = new Uint8Array(sigRaw.buffer as ArrayBuffer, sigRaw.byteOffset, sigRaw.byteLength)
  const dataFixed = new Uint8Array(data.buffer as ArrayBuffer, data.byteOffset, data.byteLength)

  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', cryptoKey, sig, dataFixed)
  if (!valid) throw createError({ statusCode: 401, message: 'Invalid token signature' })

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(new TextDecoder().decode(b64urlDecode(payloadB64!)))
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid token payload' })
  }

  const now = Math.floor(Date.now() / 1000)
  if ((payload.exp as number) < now) throw createError({ statusCode: 401, message: 'Token expired' })
  if (payload.iss !== `https://securetoken.google.com/${projectId}`)
    throw createError({ statusCode: 401, message: 'Invalid token issuer' })
  if (payload.aud !== projectId) throw createError({ statusCode: 401, message: 'Invalid token audience' })
  if (!payload.sub) throw createError({ statusCode: 401, message: 'Missing subject' })

  return {
    uid: payload.sub as string,
    email: payload.email as string,
    name: payload.name as string | undefined,
    picture: payload.picture as string | undefined,
    email_verified: Boolean(payload.email_verified),
    iat: payload.iat as number,
    exp: payload.exp as number,
  }
}

export async function requireAdmin(event: H3Event): Promise<FirebaseClaims> {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer '))
    throw createError({ statusCode: 401, message: 'Missing or invalid Authorization header' })

  const config = useRuntimeConfig(event)
  const projectId = (config.public.firebase as Record<string, string>)?.projectId || 'xkproduction-d6fce'

  const token = authHeader.slice(7).trim()
  const claims = await verifyFirebaseToken(token, projectId)

  // Load admin emails from env: NUXT_ADMIN_EMAILS=email1@gmail.com,email2@gmail.com
  const adminEmails = (config.adminEmails as string || '')
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .filter(Boolean)

  if (!adminEmails.length) {
    console.warn('[auth] NUXT_ADMIN_EMAILS is empty. Set NUXT_ADMIN_EMAILS in Cloudflare secrets/env to allow access.')
  }

  const email = (claims.email || '').trim().toLowerCase()
  if (!adminEmails.includes(email))
    throw createError({ statusCode: 403, message: 'Forbidden: admin access only' })

  return claims
}
