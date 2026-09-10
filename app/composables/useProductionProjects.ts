import type { XKProject, XKRelease, XKCapability } from '~/types/production'

export const xkProjects: XKProject[] = [
  {
    id: 'nhat-ki-cua-me',
    slug: 'nhat-ki-cua-me',
    title: 'Nhật Kí Của Mẹ',
    subtitle: 'Bản phối Ballad mộc mạc tôn vinh tình mẫu tử thiêng liêng',
    artist: 'Mai Linh (Cover)',
    year: '2025',
    category: 'Arrangement',
    categoryLabel: 'Hoà Âm Phối Khí & Mix Master',
    featured: true,
    published: true,
    coverImage: 'https://img.youtube.com/vi/F5tPTow1xkE/hqdefault.jpg',
    heroBannerImage: '/images/blog-nhat-ki-cua-me.jpg',
    videoEmbedId: 'F5tPTow1xkE',
    videoUrl: 'https://www.youtube.com/watch?v=F5tPTow1xkE',
    audioDemoUrl: '/product-audio-demo/pop-rnb-1-Gm.102.mp3',
    story: {
      origin: 'Ca khúc bất hủ "Nhật Kí Của Mẹ" của nhạc sĩ Nguyễn Văn Chung là một trong những tượng đài âm nhạc thiêng liêng nhất về tình mẫu tử tại Việt Nam. Nữ ca sĩ Mai Linh tìm đến XKProduction với mong muốn thực hiện một bản cover mang góc nhìn chân phương, tôn vinh giọng hát mộc mạc và sự thổn thức tự nhiên thay vì lạm dụng hiệu ứng phòng thu hào nhoáng.',
      challenge: 'Thách thức lớn nhất là làm mới một tác phẩm đã quá quen thuộc mà không làm mất đi hồn cốt thiêng liêng vốn có. Giọng hát của Mai Linh rất giàu tình cảm ở quãng trung nhưng dễ bị chìm nếu bản phối quá dày, hoặc sẽ bị trơ trọi nếu phần đệm quá đơn điệu.',
      approach: 'Ekip quyết định đưa nhịp 3/4 ở tempo 82 BPM, sử dụng tiếng Grand Piano thu mộc làm tâm điểm dẫn dắt cảm xúc. Ở điệp khúc 2, dàn dây (Strings) được đẩy vào một cách thanh thoát để mở rộng không gian 3D. Phần thu âm vocal được thực hiện bằng microphone condenser cao cấp với pre-amp analog ấm áp, chỉ cân chỉnh nhẹ nhàng để giữ trọn từng hơi thở và độ rung tự nhiên.',
      outcome: 'Bản cover sau khi phát hành trên YouTube và mạng xã hội đã lay động hàng trăm ngàn trái tim thính giả, trở thành một dấu ấn tiêu biểu cho năng lực sản xuất âm nhạc truyền cảm và chuẩn mực tại XKProduction.'
    },
    decisions: [
      {
        stage: 'Arrangement',
        title: 'Tempo 82 BPM & Giữ Tiếng Piano Mộc Làm Xương Sống',
        rationale: 'Không sử dụng beat điện tử nhằm bảo toàn sự lắng đọng và chiều sâu tự sự của lời ca khúc Nguyễn Văn Chung.'
      },
      {
        stage: 'Recording',
        title: 'Bảo Toàn Hơi Thở & Rung Giọng Tự Nhiên',
        rationale: 'Thay vì dùng pitch-correction nặng tay, producer dành trọn 3 giờ đồng hồ hướng dẫn nghệ sĩ nhả chữ và lấy hơi sâu, giữ sự chân thật.'
      },
      {
        stage: 'Mixing',
        title: 'Đẩy Dàn Dây Vào Chiều Sâu Stereo Vòm',
        rationale: 'Panning dải violin sang hai bên mạn sườn tai nghe, để khoảng trống tuyệt đối ở giữa (Center) cho vocal Mai Linh ngự trị.'
      }
    ],
    credits: [
      { role: 'Sáng tác', name: 'Nhạc sĩ Nguyễn Văn Chung' },
      { role: 'Thể hiện', name: 'Ca sĩ Mai Linh' },
      { role: 'Hoà âm phối khí', name: 'Xkprod ft LacAnh' },
      { role: 'Thu âm phòng thu', name: 'XKProduction Studio' },
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt (Xkprod)' }
    ],
    streamingLinks: {
      youtube: 'https://www.youtube.com/watch?v=F5tPTow1xkE'
    }
  },
  {
    id: 'chang-muon-noi-nhieu-loi',
    slug: 'chang-muon-noi-nhieu-loi',
    title: 'Chẳng Muốn Nói Nhiều Lời',
    subtitle: 'Âm thanh R&B sắc nét với vocal ấm áp và không gian 3D hiện đại',
    artist: 'Revan',
    year: '2025',
    category: 'Mix & Master',
    categoryLabel: 'Mixing & Mastering Chuyên Sâu',
    featured: true,
    published: true,
    coverImage: 'https://img.youtube.com/vi/IxlFvQQP_4c/hqdefault.jpg',
    heroBannerImage: 'https://img.youtube.com/vi/IxlFvQQP_4c/hqdefault.jpg',
    videoEmbedId: 'IxlFvQQP_4c',
    videoUrl: 'https://www.youtube.com/watch?v=IxlFvQQP_4c',
    audioDemoUrl: '/product-audio-demo/pop-rnb-1-Gm.102.mp3',
    story: {
      origin: 'Revan gửi đến studio một bản multitrack R&B hiện đại. Yêu cầu then chốt từ nghệ sĩ là biến bản thu thành một tác phẩm có âm thanh "đắt tiền" (expensive sound) — âm bass phải đầm chắc, vocal phải nổi khối phía trước và không gian reverb phải mượt như các sản phẩm quốc tế.',
      challenge: 'Các track vocal chính và backing vocals ban đầu bị xung đột tần số với dải mid của synthesizer, khiến giọng hát thiếu độ sắc nét và bị đục khi nghe trên các thiết bị phổ thông.',
      approach: 'XKProduction thực hiện quy trình dynamic EQ và mid/side processing chuyên sâu. Dải low-mid được dọn sạch để nhường không gian cho vocal ấm áp. Compressor analog phần cứng được can thiệp nhẹ nhàng tạo độ keo (glue) cho tổng thể track.',
      outcome: 'Bản master cuối cùng đạt -14 LUFS với dynamic range hoàn hảo, giữ được độ nẩy của trống kick và sự cuốn hút của vocal trên cả tai nghe in-ear lẫn hệ thống loa lớn.'
    },
    decisions: [
      {
        stage: 'Mixing',
        title: 'Tách Bạch Dải Low-Mid Giữa Bass & Vocal',
        rationale: 'Sidechain dynamic notch filter tại tần số 250Hz giúp giọng nam không bị che lấp bởi con beat dày đặc.'
      },
      {
        stage: 'Mastering',
        title: 'Tối Ưu Hoá Headroom Đạt Chuẩn -14 LUFS',
        rationale: 'Đảm bảo nền tảng phát hành số Spotify không bị limiter tự động của nền tảng dập méo tiếng.'
      }
    ],
    credits: [
      { role: 'Nghệ sĩ thể hiện', name: 'Revan' },
      { role: 'Sản xuất âm nhạc', name: 'XKProduction' },
      { role: 'Guitarist', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' }
    ],
    streamingLinks: {
      youtube: 'https://www.youtube.com/watch?v=IxlFvQQP_4c'
    }
  },
  {
    id: 'love-du-phong',
    slug: 'love-du-phong',
    title: 'Love Dự Phòng',
    subtitle: 'Bản Acoustic tự sự mộc mạc tôn vinh chất giọng ấm áp',
    artist: 'Howl',
    year: '2025',
    category: 'Music Production',
    categoryLabel: 'Vocal Production & Acoustic Arrangement',
    featured: true,
    published: true,
    coverImage: 'https://img.youtube.com/vi/OCnKTCslJUU/hqdefault.jpg',
    videoEmbedId: 'OCnKTCslJUU',
    videoUrl: 'https://www.youtube.com/watch?v=OCnKTCslJUU',
    audioDemoUrl: '/product-audio-demo/pop-rnb-1-Gm.102.mp3',
    story: {
      origin: 'Howl mong muốn tạo nên một phiên bản mộc mạc cho ca khúc "Love Dự Phòng", đi ngược lại cấu trúc điện tử xập xình trên thị trường để chạm đến góc sâu nhất trong nỗi niềm tự sự của người nghe.',
      challenge: 'Với một bản phối tối giản ít nhạc cụ, mọi lỗi nhỏ về phát âm, nhịp thở và âm sắc của nhạc cụ đều dễ dàng bị phơi bày.',
      approach: 'Sử dụng tiếng đàn Guitar Nylon thủ công đầm ấm kết hợp tiếng Piano lơ lửng và dải strings mở rộng không gian stereo. Vocal được thu âm tỉ mỉ tại studio với vocal coach đồng hành từng câu.',
      outcome: 'Bài hát nhận được sự đón nhận nồng nhiệt, khẳng định triết lý: âm nhạc ít nhạc cụ nhưng giàu tính sắp đặt không gian luôn tạo ra sức nặng cảm xúc vô cùng lớn.'
    },
    credits: [
      { role: 'Music Producer', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Acoustic Guitar', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'XKProduction' }
    ],
    streamingLinks: {
      youtube: 'https://www.youtube.com/watch?v=OCnKTCslJUU'
    }
  },
  {
    id: 'ly-do-bat-dau',
    slug: 'ly-do-bat-dau',
    title: 'Lý Do Bắt Đầu',
    subtitle: 'Nội lực Hip-hop bùng nổ với bass 808 căng tràn năng lượng',
    artist: 'Revan',
    year: '2025',
    category: 'Music Production',
    categoryLabel: 'Hip-Hop & Beat Production',
    featured: false,
    published: true,
    coverImage: 'https://img.youtube.com/vi/vzfr1ddayYY/hqdefault.jpg',
    videoEmbedId: 'vzfr1ddayYY',
    videoUrl: 'https://www.youtube.com/watch?v=vzfr1ddayYY',
    story: {
      origin: 'Một dự án Rap Hip-hop tự sự kể về hành trình kiên định theo đuổi đam mê âm nhạc của Revan.',
      challenge: 'Con beat đòi hỏi âm bass 808 phải cực kỳ sâu, rung chuyển nhưng không làm vỡ vocal hay đè nghẹt nhịp snare.',
      approach: 'Thiết kế sub-bass với saturation analog tạo sự dày dặn trên cả loa điện thoại. Vocal rap được panning ad-libs rộng hai bên để bao trùm thính giác.',
      outcome: 'Một track rap đầy nội lực, khẳng định phong cách sản xuất sắc bén và hiện đại của phòng thu.'
    },
    credits: [
      { role: 'Music Producer', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' }
    ],
    streamingLinks: {
      youtube: 'https://www.youtube.com/watch?v=vzfr1ddayYY'
    }
  },
  {
    id: 'kiep-sau',
    slug: 'kiep-sau',
    title: 'Kiếp Sau',
    subtitle: 'Bản ballad da diết được thu âm và làm sạch vocal thủ công',
    artist: 'Phương Thanh Tuyền (Cover)',
    year: '2024',
    category: 'Thu âm',
    categoryLabel: 'Thu Âm & Vocal Production',
    featured: false,
    published: true,
    coverImage: 'https://img.youtube.com/vi/z4GB-X1OiPg/hqdefault.jpg',
    videoEmbedId: 'z4GB-X1OiPg',
    videoUrl: 'https://www.youtube.com/watch?v=z4GB-X1OiPg',
    story: {
      origin: 'Dự án thu âm cover một bản tình ca đầy hoài niệm của nữ ca sĩ Phương Thanh Tuyền với yêu cầu giữ trọn độ êm và mềm mại của giọng hát.',
      challenge: 'Giữ được sự mượt mà tự nhiên mà không tạo cảm giác giọng hát bị "nhựa" hay qua chỉnh sửa máy móc.',
      approach: 'Sử dụng phòng thu tiêu âm chuẩn, cân chỉnh vocal pre-amp phần cứng tỉ mỉ và chỉnh sửa tone thủ công từng nốt nắn nót.',
      outcome: 'Bản thu đạt độ ấm áp và sạch sẽ tối đa, nhận được nhiều lời khen từ cộng đồng nghe nhạc.'
    },
    credits: [
      { role: 'Thu âm & Vocal Coach', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'XKProduction' }
    ],
    streamingLinks: {
      youtube: 'https://www.youtube.com/watch?v=z4GB-X1OiPg'
    }
  },
  {
    id: 'viet-tiep-cau-chuyen-hoa-binh',
    slug: 'viet-tiep-cau-chuyen-hoa-binh',
    title: 'Viết Tiếp Câu Chuyện Hoà Bình',
    subtitle: 'Sản phẩm âm nhạc và MV hào hùng tri ân lịch sử hào sảng',
    artist: 'Mai Linh (Cover)',
    year: '2024',
    category: 'Sound Design',
    categoryLabel: 'Sản Xuất MV & Âm Thanh Toàn Diện',
    featured: false,
    published: true,
    coverImage: 'https://img.youtube.com/vi/P8FPXHJe_go/hqdefault.jpg',
    videoEmbedId: 'P8FPXHJe_go',
    videoUrl: 'https://www.youtube.com/watch?v=P8FPXHJe_go',
    story: {
      origin: 'Dự án nghệ thuật mang thông điệp tri ân lịch sử, đòi hỏi chất lượng hình ảnh cinematic cùng bản phối khí hào tráng.',
      challenge: 'Kết hợp hài hoà giữa âm thanh phòng thu tinh tế và bối cảnh quay phim sân khấu hoành tráng.',
      approach: 'Sử dụng 5 góc máy quay chuyên dụng, ánh sáng tương phản điện ảnh và hậu kỳ màu sắc tone lạnh cổ điển.',
      outcome: 'Tác phẩm hoàn chỉnh, giàu cảm xúc, nhận được đánh giá rất cao từ giới chuyên môn.'
    },
    credits: [
      { role: 'Đạo diễn & Hậu kỳ hình ảnh', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Sản xuất âm nhạc', name: 'XKProduction' }
    ],
    streamingLinks: {
      youtube: 'https://www.youtube.com/watch?v=P8FPXHJe_go'
    }
  },
  {
    id: 'ao-cu-tinh-moi',
    slug: 'ao-cu-tinh-moi',
    title: 'Áo Cũ Tình Mới',
    subtitle: 'Bản Remake Remix sôi động với nhịp House thời thượng',
    artist: 'Remake Remix',
    year: '2024',
    category: 'Arrangement',
    categoryLabel: 'Hoà Âm Phối Khí & EDM Remix',
    featured: false,
    published: true,
    coverImage: 'https://img.youtube.com/vi/hlvg9YBxRqY/hqdefault.jpg',
    videoEmbedId: 'hlvg9YBxRqY',
    videoUrl: 'https://www.youtube.com/watch?v=hlvg9YBxRqY',
    story: {
      origin: 'Ý tưởng biến một bài hát ballad quen thuộc thành bản House sôi động phục vụ các sân khấu tiệc và live set.',
      challenge: 'Tăng tốc độ BPM mà vẫn giữ được sự truyền cảm của vocal gốc, không bị biến dạng cao độ.',
      approach: 'Thiết kế nhịp drop bốc lửa, bassline thiết kế riêng bằng synth ảo chuyên nghiệp, mix sound sắc nét trên dải tần cao.',
      outcome: 'Bản remix tạo hiệu ứng lan toả mạnh mẽ tại các sự kiện trực tiếp với hàng chục ngàn lượt nghe.'
    },
    credits: [
      { role: 'Music Producer & Remix', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mastering', name: 'XKProduction' }
    ],
    streamingLinks: {
      youtube: 'https://www.youtube.com/watch?v=hlvg9YBxRqY'
    }
  },
  {
    id: 'tet-xa-cover',
    slug: 'tet-xa-cover',
    title: 'Tết Xa (Cover)',
    subtitle: 'Giai điệu hoài niệm về quê hương chạm đến hàng triệu người con xa xứ',
    artist: 'Khánh Linh',
    year: '2024',
    category: 'Thu âm',
    categoryLabel: 'Thu Âm & Video Production',
    featured: false,
    published: true,
    coverImage: '/images/quocchi-3.jpg',
    videoUrl: 'https://www.tiktok.com/@xkstudio/video/7589982843418266901?lang=vi-VN',
    story: {
      origin: 'Dự án thu âm và sản xuất video ngắn chất lượng cao phát hành dịp Tết cho ca sĩ Khánh Linh.',
      challenge: 'Tối ưu âm thanh và hình ảnh để đạt độ sắc nét tối đa trên nền tảng TikTok.',
      approach: 'Thu vocal ấm cúng, mix reverb nhẹ nhàng tạo độ mộc, khung hình dọc 9:16 được canh chỉnh góc sáng chuẩn studio.',
      outcome: 'Video ngắn đạt lượt tương tác vượt trội trên TikTok, lan toả cảm xúc ấm áp đến hàng ngàn khán giả.'
    },
    credits: [
      { role: 'Thu âm & Mixing', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Sản xuất hình ảnh', name: 'XKStudio Team' }
    ],
    streamingLinks: {
      tiktok: 'https://www.tiktok.com/@xkstudio/video/7589982843418266901?lang=vi-VN'
    }
  }
]

export const xkReleases: XKRelease[] = [
  {
    id: 'rel-nhat-ki-cua-me',
    title: 'Nhật Kí Của Mẹ (Cover)',
    artist: 'Mai Linh',
    cover: 'https://img.youtube.com/vi/F5tPTow1xkE/hqdefault.jpg',
    releaseDate: '2025',
    streamingUrl: 'https://www.youtube.com/watch?v=F5tPTow1xkE',
    platform: 'YouTube',
    productionRole: 'Hoà Âm Phối Khí & Mix Master'
  },
  {
    id: 'rel-chang-muon-noi-nhieu-loi',
    title: 'Chẳng Muốn Nói Nhiều Lời',
    artist: 'Revan',
    cover: 'https://img.youtube.com/vi/IxlFvQQP_4c/hqdefault.jpg',
    releaseDate: '2025',
    streamingUrl: 'https://www.youtube.com/watch?v=IxlFvQQP_4c',
    platform: 'YouTube',
    productionRole: 'Mixing & Mastering'
  },
  {
    id: 'rel-love-du-phong',
    title: 'Love Dự Phòng',
    artist: 'Howl',
    cover: 'https://img.youtube.com/vi/OCnKTCslJUU/hqdefault.jpg',
    releaseDate: '2025',
    streamingUrl: 'https://www.youtube.com/watch?v=OCnKTCslJUU',
    platform: 'YouTube',
    productionRole: 'Music Producer & Guitarist'
  },
  {
    id: 'rel-ly-do-bat-dau',
    title: 'Lý Do Bắt Đầu',
    artist: 'Revan',
    cover: 'https://img.youtube.com/vi/vzfr1ddayYY/hqdefault.jpg',
    releaseDate: '2025',
    streamingUrl: 'https://www.youtube.com/watch?v=vzfr1ddayYY',
    platform: 'YouTube',
    productionRole: 'Beat Production & Mix'
  },
  {
    id: 'rel-kiep-sau',
    title: 'Kiếp Sau',
    artist: 'Phương Thanh Tuyền',
    cover: 'https://img.youtube.com/vi/z4GB-X1OiPg/hqdefault.jpg',
    releaseDate: '2024',
    streamingUrl: 'https://www.youtube.com/watch?v=z4GB-X1OiPg',
    platform: 'YouTube',
    productionRole: 'Recording & Master'
  },
  {
    id: 'rel-tet-xa',
    title: 'Tết Xa',
    artist: 'Khánh Linh',
    cover: '/images/quocchi-3.jpg',
    releaseDate: '2024',
    streamingUrl: 'https://www.tiktok.com/@xkstudio/video/7589982843418266901',
    platform: 'TikTok',
    productionRole: 'Vocal Production'
  }
]

export const xkCapabilities: XKCapability[] = [
  {
    id: 'music-production',
    slug: 'music-production',
    title: 'Music Production',
    viTitle: 'Sản Xuất Âm Nhạc',
    enTitle: 'Music Production',
    subtitle: 'Sáng tác, Hoà âm phối khí độc bản & Định hình phong cách âm nhạc',
    enSubtitle: 'Bespoke Music Arrangement, Composition & Sonic Branding',
    badge: 'CỐT LÕI NGHỆ THUẬT',
    enBadge: 'ARTISTIC CORE',
    summary: 'Từ một ý niệm sơ khởi trên điện thoại (voice memo) hay vài câu guitar mộc, chúng tôi xây dựng nên cấu trúc bài hát hoàn chỉnh với tư duy phối khí đương đại, chọn lọc âm sắc độc bản và định hình cá tính riêng cho nghệ sĩ.',
    enSummary: 'From a rough voice memo sketch or acoustic guitar chords, we build a complete musical architecture tailored to your identity with contemporary sound design and zero generic loops.',
    deliverables: [
      'Bản hoà âm phối khí full multitrack 24-bit/48kHz',
      'Track Beat Playback chất lượng cao cho biểu diễn sân khấu',
      'Định hình cấu trúc Intro, Verse, Chorus, Bridge, Outro bài hát',
      'Tư vấn tone giọng, BPM và hợp âm tối ưu cho chất giọng ca sĩ'
    ],
    enDeliverables: [
      'Full 24-bit/48kHz multitrack arrangement stems',
      'High-fidelity stage performance backing track',
      'Arranged song structure: Intro, Verse, Chorus, Bridge, Outro',
      'Vocal key, BPM and harmonic voicing consultation'
    ],
    investmentStarting: 'Từ 1.500.000₫ / tác phẩm',
    enInvestmentStarting: 'From 1,500,000₫ / track',
    timeline: '5 — 10 ngày làm việc',
    enTimeline: '5 — 10 business days',
    icon: 'fa-solid fa-music',
    features: [
      {
        title: 'Xây dựng độc bản (Custom Tailored)',
        description: 'Tuyệt đối không dùng beat template hay pattern có sẵn. Mỗi con beat là một thiết kế riêng biệt cho nghệ sĩ.',
        enTitle: '100% Bespoke Tailoring',
        enDescription: 'Zero template beats or recycled patterns. Every production is engineered from scratch for your voice.'
      },
      {
        title: 'Nhạc cụ mộc & Nhạc cụ điện tử hiện đại',
        description: 'Kết hợp hài hoà giữa tiếng acoustic ấm áp của piano/guitar mộc với sound design synthesizer sắc sảo.',
        enTitle: 'Acoustic & Modern Synthesis',
        enDescription: 'Seamless blend of authentic acoustic instruments (Piano, Guitar) and cutting-edge sound design.'
      },
      {
        title: 'Đồng hành từ demo đến phát hành',
        description: 'Chỉnh sửa không giới hạn ở giai đoạn tiền kỳ để đảm bảo nghệ sĩ hoàn toàn hài lòng với nhịp điệu bài hát.',
        enTitle: 'Collaborative Pre-Production',
        enDescription: 'Unlimited feedback iterations during the draft stage to ensure complete artist alignment.'
      }
    ],
    faq: [
      {
        question: 'Tôi chỉ có một đoạn thu âm giọng hát qua điện thoại, có phối thành bài được không?',
        answer: 'Chính xác là thế mạnh của chúng tôi. Chúng tôi sẽ phân tích tone giọng, đo tempo, đệm hợp âm mẫu và gửi bạn nghe thử trước khi triển khai bản phối hoàn thiện.',
        enQuestion: 'Can you build a full track from a rough phone recording?',
        enAnswer: 'That is our core specialty. We analyze your vocal key, tempo, map out harmonic chords, and send you a draft preview before completing the master arrangement.'
      },
      {
        question: 'Bản phối hoàn chỉnh có bao gồm bản quyền độc quyền không?',
        answer: 'Có. Mọi bản phối do XKProduction sản xuất theo yêu cầu đều trao toàn quyền thương mại và phát hành cho nghệ sĩ.',
        enQuestion: 'Does the arrangement include full commercial ownership?',
        enAnswer: 'Yes. 100% of commercial and publishing rights belong exclusively to the artist.'
      }
    ]
  },
  {
    id: 'creative-sound',
    slug: 'creative-sound',
    title: 'Creative Sound',
    viTitle: 'Kỹ Nghệ Mix & Master',
    enTitle: 'Creative Sound',
    subtitle: 'Kỹ nghệ Mixing & Mastering chuyên sâu chuẩn quốc tế Spotify/Apple Music',
    enSubtitle: 'International Spotify/Apple Music Standard Mixing & Mastering',
    badge: 'CHUẨN MỰC KỸ THUẬT',
    enBadge: 'ENGINEERING EXCELLENCE',
    summary: 'Biến các track thu âm thô ráp thành tác phẩm âm thanh gắn kết, sắc nét, có chiều sâu không gian ba chiều và độ lớn (loudness) đạt chuẩn phát hành toàn cầu mà không hề bị méo tiếng hay gắt dải tần.',
    enSummary: 'Transform raw multitrack stems into cohesive, spacious 3D audio masters calibrated to -14 LUFS international streaming standards with zero harsh distortion.',
    deliverables: [
      'Bản Master phát hành số chuẩn -14 LUFS (WAV 24-bit & MP3 320kbps)',
      'Bản Master Beat không lời (Backing Track)',
      'Bản TV Track (Beat + bè) phục vụ biểu diễn truyền hình',
      'File lưu trữ multitrack đã cân chỉnh time & tune'
    ],
    enDeliverables: [
      'Digital Master file at -14 LUFS (WAV 24-bit & MP3 320kbps)',
      'Instrumental Backing Track Master',
      'TV Performance Track (Beat + Backing Vocals)',
      'Archival multitrack files with precision pitch & time alignment'
    ],
    investmentStarting: 'Từ 300.000₫ / bản thu',
    enInvestmentStarting: 'From 300,000₫ / track',
    timeline: '2 — 4 ngày làm việc',
    enTimeline: '2 — 4 business days',
    icon: 'fa-solid fa-sliders',
    features: [
      {
        title: 'Tuning & Timing tự nhiên',
        description: 'Xử lý cao độ và nhịp thở tỉ mỉ từng câu chữ bằng Melodyne chuẩn xác, giữ trọn vẹn cảm xúc nguyên bản mà không bị méo tiếng.',
        enTitle: 'Natural Pitch & Time Alignment',
        enDescription: 'Precision Melodyne editing preserves vocal emotion, micro-vibratos and nuances without synthetic artifacts.'
      },
      {
        title: 'Không gian 3D & Chiều sâu stereo',
        description: 'Bố trí reverb, delay và dynamic EQ đa dải để giọng hát nổi khối vững vàng trước dàn nhạc.',
        enTitle: '3D Spatial Depth & Imaging',
        enDescription: 'Sculpted stereo imaging and multi-band dynamic EQ keep the lead vocal upfront and crystal-clear.'
      },
      {
        title: 'Kiểm tra trên đa thiết bị (Real-world testing)',
        description: 'Bản mix được kiểm âm chéo trên loa kiểm âm phòng thu, tai nghe in-ear, loa điện thoại và hệ thống âm thanh xe hơi.',
        enTitle: 'Cross-Device Acoustic Verification',
        enDescription: 'A-B tested across studio reference monitors, smartphone speakers, car audio, and consumer earbuds.'
      }
    ],
    faq: [
      {
        question: 'Tôi có thể gửi multitrack thu từ phòng thu khác để XKProduction mix được không?',
        answer: 'Hoàn toàn được. Chúng tôi hỗ trợ nhận file online từ khắp mọi tỉnh thành qua Google Drive với hướng dẫn xuất stem chi tiết.',
        enQuestion: 'Can I send vocal stems recorded at another studio for mixing?',
        enAnswer: 'Absolutely. We regularly mix stems submitted online via Google Drive or Dropbox with detailed export guides.'
      }
    ]
  },
  {
    id: 'studio-recording',
    slug: 'studio-recording',
    title: 'Studio Recording',
    viTitle: 'Thu Âm Phòng Thu',
    enTitle: 'Studio Recording',
    subtitle: 'Thu âm Vocal & Nhạc cụ tiêu âm chuẩn quốc tế, Vocal Coach đồng hành',
    enSubtitle: 'Vocal & Instrument Tracking with In-Studio Vocal Coaching',
    badge: 'TIÊU ÂM CHUYÊN SÂU',
    enBadge: 'ACOUSTIC EXCELLENCE',
    summary: 'Không gian phòng thu cách âm và tiêu âm chuyên nghiệp với dàn microphone Neumann/Rode và Preamp analog British Warm Audio. Vocal Coach hướng dẫn lấy hơi và nhả chữ tỉ mỉ, giúp bạn có được bản thu cảm xúc nhất mà không bị áp lực thời gian.',
    enSummary: 'Acoustically calibrated tracking room equipped with Neumann/Rode condenser microphones and British discrete preamps. In-house vocal coaching guarantees your most expressive performance without hourly pressure.',
    deliverables: [
      'Bản thu Vocal đa track độ phân giải cao 24-bit/48kHz',
      'Xử lý làm sạch tạp âm, tiếng thở và sibilance',
      'Định hướng thanh nhạc & chỉnh sửa trực tiếp từng take',
      'Bản Rough Mix demo nghe thử ngay sau buổi thu'
    ],
    enDeliverables: [
      'High-resolution 24-bit/48kHz raw vocal multitrack stems',
      'Advanced noise reduction, de-breath and de-essing cleanup',
      'Live vocal coaching and take selection guidance',
      'Immediate rough mix preview delivered upon session wrap'
    ],
    investmentStarting: 'Từ 200.000₫ / giờ (hoặc theo bài)',
    enInvestmentStarting: 'From 200,000₫ / hour',
    timeline: '1 — 2 ngày làm việc',
    enTimeline: '1 — 2 business days',
    icon: 'fa-solid fa-microphone-lines',
    features: [
      {
        title: 'Microphone & Preamp Cao Cấp',
        description: 'Microphone condenser Neumann TLM 102 cùng Warm Audio WA73-EQ mang lại chất giọng dày dặn, ấm áp và rõ nét.',
        enTitle: 'Studio-Grade Mic & Preamp Chain',
        enDescription: 'Neumann TLM 102 and British Warm Audio WA73-EQ preamps deliver rich, warm and upfront vocal presence.'
      },
      {
        title: 'Vocal Coach Trực Tiếp',
        description: 'Producer trực tiếp đồng hành hướng dẫn nhả chữ, ngân rung và biểu cảm để bản thu đạt cảm xúc chân thực nhất.',
        enTitle: 'Direct Vocal Coaching',
        enDescription: 'Hands-on producer guidance on breath control, phrasing, and dynamic emotional delivery.'
      }
    ],
    faq: [
      {
        question: 'Người chưa từng thu âm bao giờ có thu được không?',
        answer: 'Hoàn toàn yên tâm. Hơn 70% khách hàng tại XKStudio là người mới bắt đầu. Producer sẽ hướng dẫn bạn từng nhịp và chọn ra các take đẹp nhất.',
        enQuestion: 'Can beginners with zero studio experience record here?',
        enAnswer: 'Absolutely. Over 70% of our clients are first-timers. Our producer guides you step-by-step to capture your best natural performance.'
      }
    ]
  },
  {
    id: 'project-production',
    slug: 'project-production',
    title: 'Project Production',
    viTitle: 'Sản Xuất Trọn Gói',
    enTitle: 'Full Single & MV Production',
    subtitle: 'Sản xuất bài hát trọn gói từ A đến Z, Audio TVC & Video Studio',
    enSubtitle: 'End-to-End Single Production & 4K Cinematic Music Video',
    badge: 'GIẢI PHÁP TOÀN DIỆN',
    enBadge: 'END-TO-END PRODUCTION',
    summary: 'Đóng vai trò Music Producer toàn quyền: từ lên ý tưởng, sáng tác/phối khí, hướng dẫn thu âm, hậu kỳ mix master cho đến quay dựng video MV studio và hỗ trợ đưa bài hát lên các nền tảng phát hành số.',
    enSummary: 'Full-service single production from conception, custom beat arranging, vocal coaching, Spotify-grade mixing to 4K cinematic studio music video production and digital distribution support.',
    deliverables: [
      'Bài hát hoàn chỉnh trọn gói (Arrangement + Recording + Mix & Master)',
      'Video Studio Session hoặc MV Cinematic chất lượng 4K',
      'Hồ sơ đăng ký bản quyền tác giả & phân phối nhạc số',
      'Bộ ảnh nghệ sĩ chụp tại studio phục vụ thiết kế bìa phát hành'
    ],
    enDeliverables: [
      'Mastered single package (Arrangement + Tracking + Mix & Master)',
      '4K Cinematic Studio Session or narrative Music Video',
      'Full commercial ownership certification & digital release setup',
      'High-res artist photo package for Spotify & social artwork'
    ],
    investmentStarting: 'Từ 3.500.000₫ / dự án trọn gói',
    enInvestmentStarting: 'From 3,500,000₫ / project',
    timeline: '7 — 14 ngày làm việc',
    enTimeline: '7 — 14 business days',
    icon: 'fa-solid fa-film',
    features: [
      {
        title: 'Một đầu mối chịu trách nhiệm duy nhất',
        description: 'Nghệ sĩ không cần phải làm việc với 3-4 đơn vị riêng lẻ. Một quy trình liền mạch tiết kiệm thời gian và đảm bảo chất lượng đồng nhất.',
        enTitle: 'Single Point of Accountability',
        enDescription: 'One unified producer oversees every stage, preventing miscommunication and ensuring cohesive sonic and visual vision.'
      },
      {
        title: 'Đạo diễn hình ảnh & Âm thanh đồng điệu',
        description: 'Hình ảnh MV được quay dựng khớp từng nhịp phách và tôn vinh câu chuyện của giai điệu.',
        enTitle: 'Sonic & Visual Harmony',
        enDescription: 'Cinematic video pacing cut precisely to the musical dynamics and emotional arcs of the song.'
      }
    ],
    faq: [
      {
        question: 'Gói trọn gói có giới hạn thời gian thu âm không?',
        answer: 'Chúng tôi không tính theo giờ để tránh gây áp lực cho nghệ sĩ. Buổi thu sẽ tiếp tục cho đến khi đạt được take thu hoàn hảo nhất.',
        enQuestion: 'Is studio recording time capped in the all-in package?',
        enAnswer: 'No hourly pressure. Sessions continue until both artist and producer agree on the perfect takes.'
      }
    ]
  },
  {
    id: 'live-production',
    slug: 'live-production',
    title: 'Live Production',
    viTitle: 'Âm Thanh & Live Band',
    enTitle: 'Live Sound & Band',
    subtitle: 'Âm thanh sân khấu chuyên nghiệp, Ban nhạc Live Acoustic & FOH Engine',
    enSubtitle: 'Stage Audio Engineering, Midas M32R FOH & Live Acoustic Band',
    badge: 'THỰC CHIẾN SÂN KHẤU',
    enBadge: 'STAGE PRODUCTION',
    summary: 'Mang trải nghiệm âm thanh phòng thu sống động ra sân khấu thực tế. Vận hành bàn mixer kỹ thuật số Midas M32R, căn chỉnh FOH không rú rít và điều phối ban nhạc acoustic giàu cảm xúc cho tiệc cưới, sự kiện cao cấp.',
    enSummary: 'Bringing studio fidelity directly to the stage. Powered by the Midas M32R digital console, feedback-free FOH tuning, and a seasoned live acoustic band for weddings and premium events.',
    deliverables: [
      'Hệ thống âm thanh sân khấu chất lượng cao theo quy mô khách mời',
      'Kỹ sư FOH vận hành trực tiếp trong suốt chương trình',
      'Ban nhạc Live Acoustic (Guitar, Cajon/Trống, Keyboard, Bass)',
      'Microphone không dây chuyên dụng chống hú tuyệt đối'
    ],
    enDeliverables: [
      'Stage sound reinforcement scaled to event audience size',
      'Dedicated FOH sound engineer running the Midas M32R throughout',
      'Live Acoustic Band ensemble (Guitar, Percussion, Keyboard, Bass)',
      'Wireless microphone systems with zero feedback calibration'
    ],
    investmentStarting: 'Liên hệ theo quy mô sự kiện',
    enInvestmentStarting: 'Custom quote based on event scale',
    timeline: 'Đặt lịch trước 3 — 7 ngày',
    enTimeline: 'Reserve 3 — 7 days in advance',
    icon: 'fa-solid fa-guitar',
    features: [
      {
        title: 'Kỹ sư âm thanh Midas M32R thực chiến',
        description: 'Founder Nguyễn Xuân Kiệt trực tiếp căn chỉnh và quản lý dải tần sân khấu, đảm bảo âm thanh trong trẻo, êm tai.',
        enTitle: 'Midas M32R Digital Precision',
        enDescription: 'Calibrated by founder Nguyen Xuan Kiet to ensure clean, balanced sound without piercing peaks.'
      },
      {
        title: 'Ban nhạc chơi live ăn ý',
        description: 'Các nghệ sĩ nhạc công giàu kinh nghiệm, nắm vững hàng trăm ca khúc pop, ballad, acoustic đương đại.',
        enTitle: 'Seasoned Live Musicians',
        enDescription: 'Professional instrumentalists with deep repertoire across contemporary pop, ballad, and acoustic sets.'
      }
    ],
    faq: [
      {
        question: 'Studio có nhận setup âm thanh cho sự kiện ngoài trời tại Bù Đăng, Đồng Xoài không?',
        answer: 'Có. Chúng tôi phục vụ toàn tỉnh Bình Phước và các khu vực lân cận với đầy đủ trang thiết bị sân khấu.',
        enQuestion: 'Do you provide outdoor event sound setups across Binh Phuoc?',
        enAnswer: 'Yes. We service all districts in Binh Phuoc and neighboring provinces with turnkey stage gear.'
      }
    ]
  },
  {
    id: 'commercial-audio',
    slug: 'commercial-audio',
    title: 'Commercial Audio & TVC',
    viTitle: 'Âm Thanh Quảng Cáo & TVC',
    enTitle: 'Commercial Audio & TVC',
    subtitle: 'Audio Branding, Nhạc hiệu nhận diện doanh nghiệp, TVC & Podcast chuyên nghiệp',
    enSubtitle: 'B2B Audio Branding, Commercial Jingles, TVC & Podcast Production',
    badge: 'GIẢI PHÁP DOANH NGHIỆP',
    enBadge: 'ENTERPRISE SOLUTIONS',
    summary: 'Thiết kế bản sắc âm thanh độc quyền (Sonic Identity) cho thương hiệu, sản xuất voice-over TVC quảng cáo, nhạc hiệu intro/outro YouTube/TikTok và xử lý hậu kỳ âm thanh podcast đạt chuẩn phát thanh quốc tế.',
    enSummary: 'Bespoke sonic branding, high-conversion commercial voice-overs, branded jingles, and broadcast-ready podcast post-production.',
    deliverables: [
      'Bộ nhận diện âm thanh (Audio Logo / Jingle) độc quyền',
      'File Voice-over TVC master theo chuẩn phát thanh truyền hình',
      'Nhạc nền thương mại không bản quyền (Royalty-free) có hợp đồng',
      'Định dạng xuất chuẩn cho YouTube, Facebook, TikTok và TV Broadcast'
    ],
    enDeliverables: [
      'Exclusive Sonic Brand Identity (Audio Logo / Jingle)',
      'Broadcast-compliant mastered commercial voice-over files',
      'Legally cleared commercial background music scoring',
      'Multi-platform output formats for TV, YouTube, and TikTok'
    ],
    investmentStarting: 'Báo giá theo brief dự án',
    enInvestmentStarting: 'Custom quote per project brief',
    timeline: '3 — 7 ngày làm việc',
    enTimeline: '3 — 7 business days',
    icon: 'fa-solid fa-bullhorn',
    features: [
      {
        title: 'Âm Thanh Chuẩn Truyền Hình & Mạng Xã Hội',
        description: 'Tối ưu độ rõ nét của giọng đọc trên loa điện thoại, loa tivi và thiết bị di động mà không bị rè hay lấn át nhạc nền.',
        enTitle: 'Broadcast & Social Media Compliant',
        enDescription: 'Engineered for voice clarity across mobile devices, laptops, and television broadcast.'
      },
      {
        title: 'Hợp Đồng Bản Quyền Rõ Ràng',
        description: 'Cung cấp đầy đủ giấy phép bản quyền âm nhạc thương mại cho doanh nghiệp sử dụng vĩnh viễn trên mọi phương tiện truyền thông.',
        enTitle: 'Full Commercial Clearance',
        enDescription: 'Complete commercial usage licenses with zero recurring copyright royalties.'
      }
    ],
    faq: [
      {
        question: 'Doanh nghiệp có được cung cấp hóa đơn và hợp đồng không?',
        answer: 'Có. Chúng tôi cung cấp đầy đủ hợp đồng sản xuất và chứng từ thanh toán hợp lệ cho doanh nghiệp.',
        enQuestion: 'Do you provide formal contracts and tax receipts?',
        enAnswer: 'Yes. We provide full commercial service contracts and business documentation.'
      }
    ]
  }
]

export function useProductionProjects() {
  const getProjectBySlug = (slug: string): XKProject | undefined => {
    return xkProjects.find(p => p.slug === slug || p.id === slug)
  }

  const getFeaturedProjects = (): XKProject[] => {
    return xkProjects.filter(p => p.featured)
  }

  const getRelatedProjects = (currentSlug: string, limit = 3): XKProject[] => {
    return xkProjects.filter(p => p.slug !== currentSlug).slice(0, limit)
  }

  const getCapabilityBySlug = (slug: string): XKCapability | undefined => {
    return xkCapabilities.find(c => c.slug === slug || c.id === slug)
  }

  return {
    projects: xkProjects,
    releases: xkReleases,
    capabilities: xkCapabilities,
    getProjectBySlug,
    getFeaturedProjects,
    getRelatedProjects,
    getCapabilityBySlug
  }
}
