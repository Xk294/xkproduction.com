#!/bin/bash

# Image Optimization Script using sips (macOS native tool)
# This script compresses JPEG and PNG images while maintaining quality

IMG_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/images"
TEMP_DIR="${IMG_DIR}/.optimized"
MAX_WIDTH=1920  # Max width for responsive images
QUALITY=80      # JPEG quality (0-100)

mkdir -p "$TEMP_DIR"

echo "🖼️  Starting image optimization..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Function to optimize a single image
optimize_image() {
    local file="$1"
    local filename=$(basename "$file")
    local ext="${filename##*.}"
    local name="${filename%.*}"
    
    # Skip if already optimized
    if [[ "$name" == *"-opt"* ]]; then
        return
    fi
    
    local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    
    if [ "$ext" = "jpg" ] || [ "$ext" = "jpeg" ] || [ "$ext" = "png" ]; then
        # Create optimized version with reduced width and quality
        sips -Z "$MAX_WIDTH" "$file" --out "$TEMP_DIR/${name}-opt.${ext}" > /dev/null 2>&1
        
        # For JPEG, try to reduce file size further (sips doesn't have direct quality control, 
        # but resizing usually reduces size automatically)
        if [ "$ext" = "jpg" ] || [ "$ext" = "jpeg" ]; then
            sips -Z "$MAX_WIDTH" -s formatOptions 80 "$file" --out "$TEMP_DIR/${name}-opt.jpg" > /dev/null 2>&1
        fi
        
        local optimized_size=$(stat -f%z "$TEMP_DIR/${name}-opt.${ext}" 2>/dev/null || stat -c%s "$TEMP_DIR/${name}-opt.${ext}")
        local reduction=$(( (original_size - optimized_size) * 100 / original_size ))
        
        # Only replace if optimization saves space
        if [ "$optimized_size" -lt "$original_size" ]; then
            mv "$TEMP_DIR/${name}-opt.${ext}" "$file"
            printf "✅ %-30s %6dKB → %6dKB (%d%% reduction)\n" "$filename" "$((original_size/1024))" "$((optimized_size/1024))" "$reduction"
        else
            rm "$TEMP_DIR/${name}-opt.${ext}" 2>/dev/null
            printf "⏭️  %-30s %6dKB (already optimal)\n" "$filename" "$((original_size/1024))"
        fi
    fi
}

# Process all images
for file in "$IMG_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    [ -f "$file" ] && optimize_image "$file"
done

# Cleanup
rmdir "$TEMP_DIR" 2>/dev/null

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Image optimization complete!"
echo ""
echo "📊 Final disk usage:"
du -sh "$IMG_DIR"
