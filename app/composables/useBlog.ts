export interface BlogSection {
  id: string
  heading: string
  body: string[]
  quote?: string
  callout?: string
  bullets?: string[]
  image?: string
  videoEmbed?: string
}

export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  excerpt: string
  category: string
  icon: string
  author: string
  authorRole: string
  date: string
  isoDate: string
  readTime: string
  thumb: string
  cover: string
  content: string
  sections: BlogSection[]
  tags?: string[]
}

const sectionToHtml = (sections: BlogSection[]) => sections.map(section => `
  <h3>${section.heading}</h3>
  ${section.body.map(paragraph => `<p>${paragraph}</p>`).join('')}
  ${section.quote ? `<blockquote>${section.quote}</blockquote>` : ''}
  ${section.callout ? `<div class="article-note">${section.callout}</div>` : ''}
  ${section.image ? `<img src="${section.image}" alt="${section.heading}" loading="lazy" />` : ''}
  ${section.videoEmbed ? `<div class="video-embed"><iframe src="https://www.youtube.com/embed/${section.videoEmbed}?rel=0" allowfullscreen></iframe></div>` : ''}
  ${section.bullets ? `<ul>${section.bullets.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
`).join('')

export const useBlog = () => {
  const posts: Omit<BlogPost, 'content'>[] = [
    {
      slug: 'san-xuat-nhat-ki-cua-me-mai-linh',
      title: "Hậu trường sản xuất 'Nhật Kí Của Mẹ' (Cover Mai Linh): Từ bản phối Piano đến tiếng hát chạm cảm xúc",
      subtitle: "Một tác phẩm bất hủ về tình mẫu tử của nhạc sĩ Nguyễn Văn Chung được tái hiện bằng tư duy sản xuất mộc mạc: Xkprod ft LacAnh hoà âm phối khí, thu âm vocal tự sự và mix master chuẩn phát hành số.",
      excerpt: "Khám phá quy trình sản xuất âm nhạc ca khúc 'Nhật Kí Của Mẹ' do Mai Linh thể hiện: từ cách chọn tempo 82 BPM, khung hoà âm 3/4 mộc mạc, kỹ thuật thu âm vocal tại XKProduction đến khâu mix & master giữ trọn từng hơi thở cảm xúc.",
      category: 'Hoà Âm Phối Khí',
      icon: 'fa-solid fa-heart',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Founder / Music Producer tại XKProduction',
      date: '08/09/2026',
      isoDate: '2026-09-08',
      readTime: '9 phút đọc',
      thumb: '/images/blog-nhat-ki-cua-me.jpg',
      cover: '/images/blog-nhat-ki-cua-me.jpg',
      tags: ['Hoà Âm Phối Khí', 'Thu Âm', 'Mix & Master', 'Cover'],
      sections: [
        {
          id: 'tam-hon-cua-mot-tac-pham-kinh-dien',
          heading: '1. Tâm hồn của một tác phẩm kinh điển và áp lực khi làm mới',
          body: [
            "Khi nhắc đến những ca khúc thiêng liêng nhất về tình mẫu tử trong nền âm nhạc Việt Nam hiện đại, 'Nhật Kí Của Mẹ' của nhạc sĩ Nguyễn Văn Chung luôn là tượng đài lớn trong lòng khán giả. Từng câu chữ trong bài hát không đơn thuần là một bản nhạc, mà là cuốn nhật ký bằng thanh âm ghi lại trọn vẹn cuộc đời một người mẹ: từ ngày con tượng hình, tiếng khóc chào đời, bước chân chập chững, ngày con cắp sách đến trường cho đến khi con khôn lớn bước ra biển rộng.",
            "Khi ca sĩ Mai Linh cùng XKProduction ft LacAnh quyết định thực hiện bản cover này, áp lực lớn nhất đối với một người Music Producer không nằm ở kỹ thuật phức tạp, mà là làm sao giữ được sự khiêm nhường của âm thanh trước cảm xúc. Một bản phối quá ồn ào hay phô trương kỹ xảo sẽ lập tức giết chết sự chân phương của lời ca. Mục tiêu của chúng tôi là xây dựng một không gian âm nhạc đủ mộc mạc để làm nổi bật tiếng hát, nhưng đủ dày dặn và ấm áp để ôm lấy tâm hồn người nghe."
          ],
          quote: 'Với những ca khúc về mẹ, âm nhạc không cần chứng minh ai là kỹ sư âm thanh giỏi. Âm nhạc chỉ cần làm đúng một điều: khiến người nghe muốn nhấc máy gọi về cho mẹ ngay lập tức.'
        },
        {
          id: 'tu-duy-hoa-am-phoi-khi-3-4-tempo-82',
          heading: '2. Tư duy hoà âm phối khí: Nhịp điệu 3/4, Tempo 82 BPM và cấu trúc dạt dào',
          body: [
            "Dự án được khởi tạo trên Logic Pro X (nhat ki cua me3/4xk.logicx) với nhịp valse 3/4 quen thuộc nhưng được căn chỉnh ở tempo 82 BPM – một nhịp độ vừa đủ khoan thai để từng ca từ có không gian ngân vang, nhưng không bị trì trệ hay kéo lê cảm xúc.",
            "Điểm tựa linh hồn của toàn bộ bản phối là tiếng Grand Piano (track Piano Aki). Xkprod và LacAnh lựa chọn lối rải arpeggio mộc, nhấn mạnh vào các nốt bass trầm ấm ở phách 1 và buông lỏng hai phách sau để tạo cảm giác bồng bềnh như nhịp đưa nôi. Xen kẽ là lớp Electric Piano mềm mại mở rộng độ ngân.",
            "Càng về các đoạn sau, khi câu chuyện tiến đến giai đoạn người con trưởng thành và bước vào đời, bản phối bắt đầu mở rộng không gian bằng dàn nhạc dây (Strings Ensemble) và tiếng kèn Horn ấm áp ở nền xa. Dải solo violin da diết đan xen vào những khoảng ngắt của câu hát, tạo nên sự nâng đỡ cảm xúc mà không hề tranh chấp dải tần với giọng hát chính."
          ],
          bullets: [
            'Nhịp 3/4 ở Tempo 82 BPM: Tạo sự khoan thai, ấm áp như lời thủ thỉ tâm sự.',
            'Tầng nhạc cụ chính: Grand Piano mộc dẫn dắt xuyên suốt, Electric Piano đệm nền nhẹ nhàng.',
            'Cao trào dàn dây: Strings Ensemble và Solo Violin được phân lớp tỉ mỉ, tăng dần độ dày theo tiến trình trưởng thành của người con.',
            'Hiệu ứng không gian: SubKick FX và Chimes xuất hiện tinh tế ở các điểm chuyển đoạn (transition) để nhấn mạnh sự thiêng liêng.'
          ]
        },
        {
          id: 'thu-am-vocal-mai-linh',
          heading: '3. Kỹ thuật thu âm vocal tại XKStudio: Tôn trọng từng hơi thở tự nhiên',
          body: [
            "Giọng ca của Mai Linh có ưu điểm rất lớn là sự trong sáng, mộc mạc và chân thành – những phẩm chất vàng cho một ca khúc mang tính tự sự gia đình. Tại phòng thu XKProduction, chúng tôi chú trọng tuyệt đối vào tâm lý của người hát trước khi bấm nút Record.",
            "Chúng tôi sử dụng micro condenser màng lớn với đặc tính thu âm phẳng và trung thực, khoảng cách thu được tính toán khoảng 15–20cm kết hợp pop filter chuyên dụng. Khoảng cách này vừa đủ để tận dụng nhẹ hiệu ứng Proximity Effect nhằm tăng độ ấm ở dải 200–400 Hz cho giọng nữ, đồng thời giữ được sự sắc nét ở dải cao mà không bị chói gắt (harshness).",
            "Trong khâu Vocal Production, nguyên tắc cốt lõi là không lạm dụng tuning (Melodyne / Auto-tune) quá đà. Những chỗ rung tự nhiên, sự nấc nhẹ trong hơi thở hay độ rung cuối câu đều được chúng tôi trân trọng giữ lại. Sự hoàn hảo máy móc thường làm mất đi sự sống; chính những 'vết gợn' cảm xúc chân thật mới là thứ kết nối trái tim người nghe."
          ],
          callout: 'Một bản thu vocal hay không phải bản thu không có tì vết, mà là bản thu mà khi nghe lại, ca sĩ và thính giả đều cảm nhận được trọn vẹn nhịp đập của trái tim mình.'
        },
        {
          id: 'mix-master-khong-gian-va-thuong-thuc',
          heading: '4. Khâu Mix & Master: Không gian đa chiều và tối ưu hoá nền tảng số',
          body: [
            "Bước sang giai đoạn Mixing, thách thức là tạo ra sự tách bạch rõ rệt giữa dải trung âm của tiếng Piano và giọng hát của Mai Linh. Bằng kỹ thuật Dynamic EQ kết hợp Sidechain nhẹ ở vùng 1–3 kHz, mỗi khi vocal cất lên, tiếng Piano sẽ tự động nhường lại một khoảng trống tinh tế để giọng ca luôn nổi bật ở vị trí trung tâm.",
            "Không gian reverb được thiết kế bằng hai lớp: một Plate Reverb ngắn tạo độ dày thân vocal (body), và một Hall Reverb đuôi ấm với pre-delay 40ms để vocal hòa quyện vào dàn nhạc dây phía sau mà không bị đẩy lùi xa người nghe.",
            "Ở khâu Mastering, bản nhạc được xử lý độ động và màu âm tổng thể, xuất chuẩn loudness -14 LUFS với True Peak an toàn dưới -1.0 dBFS để khi phân phối lên YouTube, chất âm vẫn giữ nguyên độ trong trẻo, không bị nén méo tiếng. Bạn có thể thưởng thức trọn vẹn tác phẩm ngay dưới đây:"
          ],
          videoEmbed: 'F5tPTow1xkE'
        },
        {
          id: 'loi-ket-va-lan-toa',
          heading: '5. Lời kết: Cảm xúc chân thành là giá trị cốt lõi của âm nhạc',
          body: [
            "'Nhật Kí Của Mẹ' phiên bản cover của Mai Linh qua bàn tay hoà âm phối khí, thu âm, mix & master của Xkprod ft LacAnh là một món quà âm nhạc chan chứa tình cảm mà cả ê-kíp muốn gửi tặng đến tất cả những người mẹ, người con.",
            "Tại XKProduction, mỗi dự án âm nhạc – dù là một bản cover acoustic, một bài hát sáng tác mới hay một dự án thương mại – đều được thực hiện với sự cẩn trọng và tận tâm cao nhất. Chúng tôi tin rằng công nghệ phòng thu hiện đại chỉ thực sự có ý nghĩa khi nó được đặt vào tay những người biết lắng nghe và tôn vinh cảm xúc nguyên bản của nghệ sĩ."
          ],
          bullets: [
            'Tác phẩm: Nhật Kí Của Mẹ (Sáng tác: Nhạc sĩ Nguyễn Văn Chung)',
            'Thể hiện: Mai Linh',
            'Hoà âm - Phối khí (Arrangement): Xkprod ft LacAnh',
            'Thu âm (Rec), Mix & Master: XKProduction ft LacAnh (Nguyễn Xuân Kiệt)',
            'Nền tảng phát hành: YouTube & các nền tảng số'
          ]
        }
      ]
    },
    {
      slug: 'thu-am-gia-2026',
      title: 'Thu âm bài hát giá bao nhiêu trong năm 2026?',
      subtitle: 'Một cách nhìn thực tế về chi phí phòng thu: bạn đang trả tiền cho giờ thu, thiết bị, đôi tai producer và sự bình tĩnh để bản vocal thật sự có cảm xúc.',
      excerpt: 'Bảng giá thu âm chỉ là phần nổi. Bài viết này giúp bạn hiểu vì sao cùng một buổi thu có thể cho ra demo thô hoặc một bản vocal đủ tự tin để phát hành.',
      category: 'Bảng Giá',
      icon: 'fa-solid fa-tag',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Producer / Recording Engineer tại XKProduction',
      date: '28/04/2026',
      isoDate: '2026-04-28',
      readTime: '8 phút đọc',
      thumb: '/images/blog-thu-am-gia.jpg',
      cover: '/images/blog-thu-am-gia.jpg',
      tags: ['Bảng Giá', 'Thu Âm'],
      sections: [
        {
          id: 'gia-khong-chi-la-gio-thu',
          heading: 'Giá thu âm không chỉ là tiền thuê một căn phòng',
          body: [
            'Khi hỏi “thu âm một bài bao nhiêu tiền”, nhiều người thường nghĩ chi phí nằm ở số giờ đứng trước micro. Thực tế, một bản thu nghe sang hay không phụ thuộc vào cả chuỗi quyết định: chọn micro hợp chất giọng, gain staging sạch, hướng dẫn cách nhả chữ, kiểm soát hơi thở, chọn take, comp vocal, tuning và timing vừa đủ.',
            'Ở một buổi thu nghiêm túc, kỹ thuật viên không chỉ bấm record. Họ nghe độ mở của nguyên âm, độ gắt ở vùng 2–5 kHz, độ dày ở low-mid, độ sát beat của từng câu và cả việc ca sĩ có đang hát đúng tâm trạng của bài hay không.'
          ],
          quote: 'Một bản vocal tốt không phải bản không sai nốt; đó là bản khiến người nghe tin vào cảm xúc của người hát.'
        },
        {
          id: 'nen-chon-goi-nao',
          heading: 'Bạn nên chọn gói nào?',
          body: [
            'Nếu mục tiêu là demo, học thanh nhạc hoặc lưu lại một bản cover gọn gàng, gói cơ bản thường đã đủ. Bạn cần một buổi thu sạch, vocal được căn chỉnh nhẹ, không cần production quá phức tạp.',
            'Nếu bài hát dùng để đăng YouTube, gửi casting, phát hành digital hoặc làm portfolio nghệ sĩ, nên chọn gói có vocal production kỹ hơn. Lúc này việc chọn take, xử lý dynamics, bè, ad-lib và không gian reverb/delay sẽ tạo khác biệt rất rõ.'
          ],
          bullets: [
            'Demo / học viên: ưu tiên nhanh, sạch, đúng pitch cơ bản.',
            'Cover / YouTube: cần vocal mượt, timing chắc, màu giọng nổi bật.',
            'Phát hành thương mại: cần thu nhiều take, vocal production và mix/master đồng bộ.'
          ]
        },
        {
          id: 'yeu-to-lam-tang-chi-phi',
          heading: 'Những yếu tố làm chi phí thay đổi',
          body: [
            'Một ca khúc ballad một giọng chính sẽ khác hoàn toàn bài pop có bè dày, rap verse, ad-lib và nhiều đoạn harmony. Càng nhiều lớp vocal, thời gian chỉnh càng dài. Nếu bài cần producer ngồi coaching câu chữ và cảm xúc trong lúc thu, chi phí cũng sẽ khác với việc chỉ thu theo beat có sẵn.',
            'Điều quan trọng là phải xác định mục tiêu ngay từ đầu. Không phải bài nào cũng cần làm thật đắt. Nhưng nếu đã phát hành chính thức, tiết kiệm ở khâu vocal thường là khoản tiết kiệm dễ nghe thấy nhất.'
          ],
          callout: 'Trước khi đặt lịch, hãy chuẩn bị beat, lyric, tone mong muốn và 1–2 bài tham khảo về màu vocal. Việc này giúp buổi thu nhanh hơn và kết quả chính xác hơn.'
        },
        {
          id: 'ket-luan',
          heading: 'Một mức giá tốt là mức giá đúng với mục tiêu bài hát',
          body: [
            'Thu âm không nên được nhìn như một khoản phí cố định, mà là một quyết định sản xuất. Có bài chỉ cần ghi lại cảm xúc mộc. Có bài cần được nâng đỡ bằng kỹ thuật để đủ sức đứng cạnh các sản phẩm thương mại.',
            'Điều đáng đầu tư nhất vẫn là sự chuẩn bị: thuộc lời, hiểu bài, biết mình muốn người nghe cảm thấy gì. Khi người hát rõ mục tiêu và phòng thu đủ tinh tế, chi phí bỏ ra sẽ trở thành một phần của chất lượng, không phải gánh nặng.'
          ]
        }
      ]
    },
    {
      slug: 'phong-thu-am-binh-phuoc',
      title: 'Phòng thu âm Bình Phước: khi chất lượng không còn phụ thuộc vào địa chỉ',
      subtitle: 'Một studio tốt không được định nghĩa bằng thành phố nó nằm ở đâu, mà bằng hệ thống nghe, quy trình sản xuất và người chịu trách nhiệm cho từng quyết định âm thanh.',
      excerpt: 'Vì sao nghệ sĩ ở Bình Phước vẫn có thể làm sản phẩm chỉn chu mà không cần xuống thành phố cho mọi dự án.',
      category: 'Giới Thiệu',
      icon: 'fa-solid fa-building',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Founder / Music Producer tại XKProduction',
      date: '25/04/2026',
      isoDate: '2026-04-25',
      readTime: '7 phút đọc',
      thumb: '/images/blog-phong-thu.jpg',
      cover: '/images/blog-phong-thu.jpg',
      tags: ['Giới Thiệu', 'Thu Âm', 'Bình Phước'],
      sections: [
        {
          id: 'chat-luong-khong-nam-o-dia-chi',
          heading: 'Chất lượng không nằm ở tấm biển studio',
          body: [
            'Nhiều nghệ sĩ địa phương từng mặc định rằng muốn thu âm tốt phải đi xa. Điều đó đúng ở thời điểm thiết bị còn khó tiếp cận và workflow online chưa phổ biến. Nhưng hiện tại, khoảng cách lớn nhất không còn là địa lý, mà là tư duy sản xuất.',
            'Một phòng thu đáng tin phải có môi trường đủ yên tĩnh, hệ thống monitor trung thực, chain thu sạch và người nghe đủ kinh nghiệm để biết lúc nào nên thu lại, lúc nào nên giữ một take chưa hoàn hảo nhưng có cảm xúc.'
          ],
          quote: 'Địa chỉ có thể ở Bình Phước, nhưng tiêu chuẩn nghe phải đặt ở cùng mặt bằng với sản phẩm phát hành chuyên nghiệp.'
        },
        {
          id: 'khong-gian-lam-viec',
          heading: 'Không gian đủ yên để nghệ sĩ tập trung',
          body: [
            'Một buổi thu tốt cần sự riêng tư. Người hát cần cảm giác an toàn để thử, sai, hát lại và tìm ra cách thể hiện đúng nhất. Studio không nên tạo áp lực như một nơi kiểm tra giọng hát, mà nên là nơi bài hát được bình tĩnh hoàn thiện.',
            'Tại XKProduction, workflow được thiết kế để nghệ sĩ nghe lại nhanh, trao đổi trực tiếp và điều chỉnh ngay trong phiên. Những quyết định nhỏ như giảm một nửa tone, đổi cách vào câu, hay giữ lại một hơi thở tự nhiên đều có thể làm bài hát thuyết phục hơn.'
          ],
          image: '/images/blog-phong-thu.jpg'
        },
        {
          id: 'tu-demo-den-phat-hanh',
          heading: 'Từ demo cá nhân đến sản phẩm phát hành',
          body: [
            'Một studio địa phương mạnh không chỉ phục vụ thu cover. Nó cần đủ năng lực đi cùng nghệ sĩ qua nhiều cấp độ: demo ý tưởng, hòa âm phối khí, thu vocal, vocal production, mix, master và chuẩn bị file phát hành.',
            'Khi toàn bộ chuỗi sản xuất được giữ trong một tư duy thống nhất, bài hát ít bị rời rạc. Producer hiểu ý đồ bản phối, kỹ thuật thu hiểu khoảng trống vocal cần chiếm, mix engineer biết đâu là điểm cảm xúc cần giữ lại.'
          ],
          bullets: [
            'Thu demo nhanh để kiểm tra giai điệu và tone.',
            'Sản xuất bản phối theo định hướng nghệ sĩ.',
            'Thu vocal nhiều take, chọn và dựng câu tốt nhất.',
            'Mix/master để bản nhạc nghe ổn định trên nhiều hệ thống.'
          ]
        },
        {
          id: 'ket-luan',
          heading: 'Một studio tốt giúp nghệ sĩ bớt đơn độc',
          body: [
            'Điều nghệ sĩ cần không chỉ là thiết bị. Họ cần một người nghe được điều bài hát đang thiếu và đủ thẳng thắn để nói điều đó một cách xây dựng.',
            'Nếu một phòng thu làm được việc ấy, nó không còn là nơi ghi âm đơn thuần. Nó trở thành một điểm tựa sản xuất — nơi ý tưởng thô có cơ hội trở thành một sản phẩm có hình hài, có cảm xúc và có khả năng đi xa hơn.'
          ]
        }
      ]
    },
    {
      slug: 'mix-master-huong-dan',
      title: 'Mix và master là gì? Cách một bản nhạc đi từ đúng đến hay',
      subtitle: 'Mixing tạo nên không gian, chiều sâu và tương quan giữa các nhạc cụ. Mastering giúp bản nhạc giữ được năng lượng đó trên mọi nền tảng nghe.',
      excerpt: 'Một hướng dẫn dễ hiểu nhưng đủ chuyên môn về mixing, mastering và vì sao đây là hai bước quyết định cảm giác “đắt tiền” của bản nhạc.',
      category: 'Kiến Thức',
      icon: 'fa-solid fa-graduation-cap',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Mixing / Mastering Engineer',
      date: '20/04/2026',
      isoDate: '2026-04-20',
      readTime: '9 phút đọc',
      thumb: '/images/blog-mix-master.jpg',
      cover: '/images/blog-mix-master.jpg',
      tags: ['Kiến Thức', 'Mix & Master'],
      sections: [
        {
          id: 'mixing-la-gi',
          heading: 'Mixing là lúc bài nhạc bắt đầu có không gian',
          body: [
            'Một bản phối thô có thể đã đủ nốt, đủ nhạc cụ, nhưng chưa chắc đã nghe như một bài hát hoàn chỉnh. Mixing là quá trình đặt từng âm thanh vào đúng vị trí: vocal ở gần hay xa, kick có đủ lực không, bass có che mất giọng không, reverb có làm bài sang hơn hay chỉ khiến mọi thứ bị mờ.',
            'Engineer sẽ dùng EQ để dọn vùng tần số, compressor để kiểm soát dynamics, saturation để thêm màu, automation để dẫn cảm xúc và effect để tạo chiều sâu. Mục tiêu không phải làm mọi track thật to, mà làm chúng cùng kể một câu chuyện.'
          ],
          quote: 'Một bản mix tốt không làm người nghe chú ý đến kỹ thuật; nó làm người nghe ở lại với bài hát lâu hơn.'
        },
        {
          id: 'mastering-la-gi',
          heading: 'Mastering là bước giữ bản nhạc ổn định khi rời studio',
          body: [
            'Mastering không phải chỉ là kéo âm lượng cho lớn. Đây là bước cân bằng cuối cùng để bản nhạc nghe chắc, đủ sáng, đủ rộng và không bị lệch khi phát trên điện thoại, tai nghe, loa ô tô, club nhỏ hoặc các nền tảng streaming.',
            'Một master tốt giữ được transient, không bóp nghẹt dynamics và vẫn đạt mức loudness hợp lý. Với nhạc phát hành digital, việc kiểm soát true peak, low-end và độ chói ở high-mid quan trọng hơn việc chạy theo con số âm lượng cực đại.'
          ],
          callout: 'Nếu bản mix chưa ổn, mastering không thể cứu toàn bộ. Mastering tốt nhất xảy ra khi mix đã có cân bằng, không gian và ý đồ rõ ràng.'
        },
        {
          id: 'nhung-loi-thuong-gap',
          heading: 'Những lỗi thường gặp khi tự mix/master',
          body: [
            'Lỗi phổ biến nhất là mix quá lâu ở âm lượng lớn, khiến tai mệt và quyết định sai. Tiếp theo là lạm dụng preset: preset có thể là điểm khởi đầu, nhưng không thể hiểu chất giọng, bản phối và cảm xúc của từng bài.',
            'Một lỗi khác là để vocal quá chìm vì sợ “lộ”, hoặc đẩy vocal quá to khiến nhạc nền mất vai trò. Bản mix thương mại cần sự tự tin ở giọng hát nhưng vẫn phải có nền âm nhạc nâng đỡ.'
          ],
          bullets: [
            'Low-end bị ù vì kick và bass tranh cùng vùng tần số.',
            'Vocal bị gắt do boost presence quá tay.',
            'Reverb quá dài làm mất độ gần của giọng hát.',
            'Limiter ép quá mạnh khiến bài mất nhịp thở.'
          ]
        },
        {
          id: 'ket-luan',
          heading: 'Mix/master là nghệ thuật của sự cân bằng',
          body: [
            'Một bài nhạc hay không cần mọi thứ phải phô diễn. Nó cần đúng thứ được đặt lên trước, đúng lúc được mở rộng, đúng khoảnh khắc được nén lại để đoạn sau bung ra.',
            'Khi mix và master được làm có chủ đích, người nghe không cần biết EQ hay compressor là gì. Họ chỉ cảm thấy bài hát rõ hơn, sâu hơn và đáng tin hơn.'
          ]
        }
      ]
    },
    {
      slug: 'hoa-am-phoi-khi-online',
      title: 'Hòa âm phối khí online: từ demo mộc đến bản phối có hình hài',
      subtitle: 'Làm việc online không có nghĩa là làm nhanh cho xong. Một bản phối tốt vẫn bắt đầu bằng việc hiểu bài hát, hiểu người hát và chọn đúng ngôn ngữ âm thanh.',
      excerpt: 'Quy trình hòa âm phối khí online chuyên nghiệp: chuẩn bị demo, chọn reference, dựng arrangement, layering, revision và bàn giao stem.',
      category: 'Kiến Thức',
      icon: 'fa-solid fa-music',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Music Producer tại XKProduction',
      date: '15/04/2026',
      isoDate: '2026-04-15',
      readTime: '9 phút đọc',
      thumb: '/images/blog-hoa-am.jpg',
      cover: '/images/blog-hoa-am.jpg',
      tags: ['Kiến Thức', 'Hoà âm'],
      sections: [
        {
          id: 'ban-phoi-can-mot-huong-di',
          heading: 'Trước khi thêm nhạc cụ, bản phối cần một hướng đi',
          body: [
            'Nhiều demo thất bại không phải vì giai điệu yếu, mà vì bản phối không biết mình muốn trở thành gì. Một bài có thể đi theo hướng acoustic rất gần, pop-ballad rộng, R&B tối giản, cinematic dày hoặc electronic hiện đại. Mỗi hướng kéo theo tempo, groove, sound palette và cách build hoàn toàn khác.',
            'Vì vậy bước đầu tiên của hòa âm phối khí không phải mở phần mềm và thêm trống. Bước đầu tiên là nghe xem bài hát đang cần khoảng trống, cao trào, sự mộc mạc hay một thế giới âm thanh lớn hơn.'
          ],
          quote: 'Arrangement tốt là khi người nghe cảm thấy bài hát lớn dần một cách tự nhiên, không phải bị nhạc cụ kéo đi.'
        },
        {
          id: 'lam-viec-online',
          heading: 'Làm việc online cần brief rõ hơn, không phải ít giao tiếp hơn',
          body: [
            'Với workflow online, demo điện thoại vẫn có thể là điểm bắt đầu tốt nếu nó thể hiện rõ melody, lyric và cảm xúc. Producer cần thêm thông tin về tone mong muốn, bài tham khảo, đối tượng nghe và nơi bài hát sẽ được sử dụng: cover, YouTube, Spotify, MV hay sân khấu.',
            'Khi brief đủ rõ, bản draft đầu tiên sẽ không chỉ là “nghe thử cho vui”, mà là một bản định hướng: tempo, vòng hòa thanh, cấu trúc intro/verse/chorus/bridge và màu nhạc cụ chủ đạo.'
          ],
          bullets: [
            'Gửi demo vocal rõ melody, dù thu bằng điện thoại.',
            'Gửi lyric và ghi chú những đoạn muốn nhấn cảm xúc.',
            'Chọn 2–3 bài reference về màu sắc, không cần copy y nguyên.',
            'Nói rõ mục tiêu phát hành để quyết định độ dày của production.'
          ]
        },
        {
          id: 'layering-va-dynamics',
          heading: 'Layering và dynamics quyết định độ chuyên nghiệp',
          body: [
            'Một bản phối nghe đắt tiền thường không nằm ở việc có thật nhiều nhạc cụ, mà ở cách các lớp âm thanh vào ra đúng thời điểm. Verse có thể rất thưa để giữ lời hát gần. Pre-chorus bắt đầu mở bằng pad, percussion hoặc bass movement. Chorus mới bung đủ trống, harmony, counter melody và không gian stereo.',
            'Dynamics trong arrangement cũng quan trọng như dynamics trong mixing. Nếu đoạn nào cũng đầy, bài hát sẽ không còn cao trào. Nếu đoạn nào cũng mỏng, người nghe không có điểm để nhớ.'
          ],
          callout: 'Bản phối tốt cần biết tiết chế. Khoảng trống đôi khi là nhạc cụ quan trọng nhất.'
        },
        {
          id: 'ban-giao-va-revision',
          heading: 'Revision nên phục vụ bài hát, không làm mất định hướng',
          body: [
            'Chỉnh sửa là phần bình thường của production. Tuy nhiên revision hiệu quả cần cụ thể: đoạn nào cần dày hơn, nhạc cụ nào làm che vocal, chorus có cần nâng tone cảm xúc không, intro có quá dài với nền tảng nghe hiện tại không.',
            'Sau khi chốt bản phối, file bàn giao nên gồm WAV stereo chất lượng cao và stem nếu dự án cần mix/master riêng hoặc biểu diễn live. Với sản phẩm nghiêm túc, stem rõ ràng giúp các bước sau linh hoạt hơn rất nhiều.'
          ]
        },
        {
          id: 'ket-luan',
          heading: 'Online chỉ là phương thức, chất lượng vẫn nằm ở tư duy sản xuất',
          body: [
            'Một bản phối online vẫn có thể sâu, sang và cá nhân nếu producer thật sự nghe bài hát trước khi nghe yêu cầu. Công nghệ giúp rút ngắn khoảng cách, nhưng gu thẩm mỹ và kỷ luật arrangement mới là thứ giữ bài hát đứng vững.',
            'Khi demo được đặt vào đúng thế giới âm thanh, người hát sẽ không còn cảm giác đang hát trên một beat có sẵn. Họ đang đứng trong chính bài hát của mình.'
          ]
        }
      ]
    },
    {
      slug: 'vocal-tuning-va-vocal-production-la-gi',
      title: 'Vocal tuning và vocal production: làm đẹp giọng hát mà không đánh mất con người',
      subtitle: 'Chỉnh giọng không phải để biến một người thành người khác. Mục tiêu là giữ lại cảm xúc tốt nhất và loại bỏ những thứ làm người nghe bị phân tâm.',
      excerpt: 'Vocal tuning, timing, comping, bè và ad-lib được xử lý như thế nào để giọng hát vừa chuẩn vừa có hồn.',
      category: 'Kiến Thức',
      icon: 'fa-solid fa-microphone-lines',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Founder / Vocal Producer tại XKProduction',
      date: '10/05/2026',
      isoDate: '2026-05-10',
      readTime: '8 phút đọc',
      thumb: '/images/blog-before-after.jpg',
      cover: '/images/blog-before-after.jpg',
      tags: ['Vocal Production', 'Kiến Thức', 'Thu Âm'],
      sections: [
        {
          id: 'chinh-giong-khong-phai-che-giau',
          heading: 'Chỉnh giọng không phải là che giấu khuyết điểm',
          body: [
            'Trong sản xuất âm nhạc hiện đại, vocal tuning là một phần bình thường của workflow. Vấn đề không nằm ở việc có chỉnh hay không, mà nằm ở chỉnh đến mức nào và chỉnh để phục vụ điều gì.',
            'Một nốt hơi chênh có thể làm người nghe mất tập trung khỏi câu hát. Nhưng nếu kéo mọi thứ quá thẳng, giọng hát sẽ mất độ người, mất rung, mất cảm giác đang thở. Tuning tốt là thứ gần như không bị nhận ra.'
          ],
          quote: 'Vocal production tốt làm ca sĩ nghe giống phiên bản tập trung nhất của chính họ, không phải một nhân vật khác.'
        },
        {
          id: 'comping-va-timing',
          heading: 'Comping và timing là nơi cảm xúc được dựng lại',
          body: [
            'Một take hoàn hảo từ đầu đến cuối rất hiếm. Thông thường, producer sẽ chọn câu hay nhất từ nhiều lần thu: một câu verse có hơi thở đẹp, một câu chorus mở tốt, một ad-lib tự nhiên. Quá trình ghép những khoảnh khắc tốt nhất đó gọi là comping.',
            'Timing cũng quan trọng không kém pitch. Có câu cần đi sát beat để chắc. Có câu nên lùi nhẹ để tạo độ laid-back. Nếu chỉnh mọi thứ vào lưới quá cứng, bài hát sẽ mất groove.'
          ],
          bullets: [
            'Comping: chọn và ghép take tốt nhất.',
            'Tuning: chỉnh cao độ vừa đủ, giữ vibrato tự nhiên.',
            'Timing: căn nhịp nhưng không làm mất groove.',
            'De-essing và dynamics: giữ vocal sáng nhưng không gắt.'
          ]
        },
        {
          id: 'be-va-adlib',
          heading: 'Bè và ad-lib tạo chiều sâu cho giọng chính',
          body: [
            'Một vocal chính tốt có thể đứng một mình. Nhưng trong nhiều thể loại, harmony, double, whisper layer hoặc ad-lib giúp chorus mở rộng hơn và làm cảm xúc có điểm nhấn. Điều khó là thêm lớp mà không làm rối lời hát.',
            'Bè nên được viết theo chức năng: nâng hợp âm, trả lời câu chính, tạo cao trào hoặc làm dày một chữ quan trọng. Nếu chỉ thu thật nhiều lớp giống nhau, bản vocal sẽ lớn hơn nhưng chưa chắc hay hơn.'
          ],
          callout: 'Không phải đoạn nào cũng cần bè. Đôi khi để giọng chính một mình ở câu quan trọng lại khiến người nghe tin hơn.'
        },
        {
          id: 'ket-luan',
          heading: 'Kỹ thuật chỉ có ý nghĩa khi giữ được cảm xúc',
          body: [
            'Vocal production là một chuỗi can thiệp rất nhỏ nhưng có tác động lớn. Mỗi lần kéo pitch, cắt hơi thở hay thêm harmony đều phải trả lời câu hỏi: việc này có làm câu hát thuyết phục hơn không?',
            'Nếu câu trả lời là có, kỹ thuật đang phục vụ âm nhạc. Nếu không, sự hoàn hảo sẽ trở thành lớp kính lạnh giữa ca sĩ và người nghe.'
          ]
        }
      ]
    },
    {
      slug: 'chuan-bi-truoc-khi-den-phong-thu-am',
      title: 'Chuẩn bị gì trước khi đến phòng thu để không lãng phí buổi thu?',
      subtitle: 'Một buổi thu tốt bắt đầu trước khi bạn bước vào booth: thuộc lời, hiểu tone, biết cảm xúc và để cơ thể ở trạng thái sẵn sàng.',
      excerpt: 'Checklist thực tế giúp ca sĩ, học viên và người thu cover có buổi thu hiệu quả hơn, ít áp lực hơn và ra bản vocal tốt hơn.',
      category: 'Kiến Thức',
      icon: 'fa-solid fa-list-check',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Recording Engineer tại XKProduction',
      date: '24/05/2026',
      isoDate: '2026-05-24',
      readTime: '7 phút đọc',
      thumb: '/images/blog-meo-thu-am.jpg',
      cover: '/images/blog-meo-thu-am.jpg',
      tags: ['Thu Âm', 'Kiến Thức'],
      sections: [
        {
          id: 'thuoc-loi-la-ton-trong-cam-xuc',
          heading: 'Thuộc lời không phải để khoe trí nhớ',
          body: [
            'Khi còn phải nhìn lời liên tục, não sẽ chia đôi sự tập trung: một phần đọc chữ, một phần cố hát đúng. Cảm xúc vì vậy thường bị chậm hơn câu hát. Thuộc lời giúp bạn nhìn vào ý nghĩa của câu, không chỉ phát âm nó.',
            'Điều này đặc biệt quan trọng với ballad, R&B hoặc những bài cần xử lý nhỏ. Một chữ buông nhẹ, một hơi thở trước câu, một đoạn ngân ngắn hơn dự tính đều cần sự chủ động.'
          ],
          quote: 'Trong phòng thu, sự chuẩn bị tốt nhất là khiến kỹ thuật trở nên vô hình để cảm xúc được đi trước.'
        },
        {
          id: 'tap-voi-beat',
          heading: 'Tập với beat đúng tone và đúng cấu trúc',
          body: [
            'Đừng đợi đến phòng thu mới phát hiện beat quá cao, quá thấp hoặc bản nhạc có đoạn bridge khác với bản bạn tập. Hãy luyện với chính file sẽ dùng để thu, đánh dấu những đoạn khó vào, khó lấy hơi hoặc dễ lệch nhịp.',
            'Nếu chưa chắc tone, hãy thử trước ở nhà và ghi lại bằng điện thoại. Nghe lại sẽ giúp bạn biết mình bị đuối ở đâu, câu nào cần hạ tone hoặc đổi cách hát.'
          ],
          bullets: [
            'Gửi beat trước cho studio nếu cần kiểm tra chất lượng file.',
            'Chuẩn bị lyric bản cuối, tránh sửa lời ngay trong phiên thu.',
            'Đánh dấu đoạn cần bè, ad-lib hoặc đổi cách xử lý.',
            'Ngủ đủ và tránh đồ lạnh, rượu bia trước ngày thu.'
          ]
        },
        {
          id: 'tam-ly-trong-phong-thu',
          heading: 'Tâm lý trong booth quan trọng hơn bạn nghĩ',
          body: [
            'Nhiều người hát tốt ở nhà nhưng vào phòng thu lại cứng. Nguyên nhân thường là họ nghe tai nghe lạ, thấy giọng mình quá rõ hoặc sợ sai trước producer. Một phòng thu tốt sẽ giúp bạn bình tĩnh, nhưng bạn cũng nên chấp nhận rằng vài take đầu chỉ để làm quen.',
            'Đừng cố hát thật mạnh từ đầu. Hãy làm nóng giọng, thử mic, nghe headphone mix và trao đổi nếu giọng trong tai quá to, beat quá nhỏ hoặc reverb khiến bạn khó kiểm soát pitch.'
          ],
          callout: 'Headphone mix không thoải mái có thể làm bạn hát sai. Hãy nói ngay với kỹ thuật viên thay vì cố chịu.'
        },
        {
          id: 'ket-luan',
          heading: 'Buổi thu hiệu quả là buổi thu có ít quyết định thừa',
          body: [
            'Khi lời, beat, tone và cảm xúc đã rõ, thời gian trong studio được dùng cho những điều đáng giá hơn: tìm take hay, chỉnh cách nhả chữ, thử màu giọng và hoàn thiện chi tiết.',
            'Chuẩn bị kỹ không làm buổi thu mất tự nhiên. Ngược lại, nó tạo đủ an toàn để bạn tự do hơn khi hát.'
          ]
        }
      ]
    },
    {
      slug: 'thu-am-binh-phuoc-dia-chi-uy-tin',
      title: 'Thu âm tại Bình Phước: chọn studio uy tín bằng cách nào?',
      subtitle: 'Một địa chỉ thu âm đáng tin không chỉ có micro tốt. Nó phải có quy trình rõ, người nghe có trách nhiệm và kết quả đủ ổn định qua nhiều dự án.',
      excerpt: 'Những tiêu chí thực tế để chọn phòng thu tại Bình Phước cho demo, cover, sản phẩm phát hành và dự án thương mại.',
      category: 'Giới Thiệu',
      icon: 'fa-solid fa-location-dot',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Founder / Producer tại XKProduction',
      date: '16/05/2026',
      isoDate: '2026-05-16',
      readTime: '8 phút đọc',
      thumb: '/images/blog-studio-binh-phuoc.jpg',
      cover: '/images/blog-studio-binh-phuoc.jpg',
      tags: ['Bình Phước', 'Thu Âm', 'Giới Thiệu'],
      sections: [
        {
          id: 'nghe-san-pham-that',
          heading: 'Hãy nghe sản phẩm thật, không chỉ nhìn thiết bị',
          body: [
            'Danh sách thiết bị có thể gây ấn tượng, nhưng sản phẩm đã hoàn thành mới nói rõ năng lực của studio. Hãy nghe vocal có rõ lời không, mix có bị chói không, low-end có ù không, bài có giữ được cảm xúc hay chỉ nghe to và dày.',
            'Một studio uy tín thường có màu làm việc ổn định: bản thu sạch, tư vấn rõ, file bàn giao đúng hẹn và không hứa những điều vượt quá phạm vi dịch vụ.'
          ],
          quote: 'Thiết bị là điều kiện cần. Đôi tai và trách nhiệm sản xuất mới là điều kiện đủ.'
        },
        {
          id: 'quy-trinh-ro-rang',
          heading: 'Quy trình rõ giúp khách hàng biết mình đang trả tiền cho điều gì',
          body: [
            'Trước khi thu, studio nên hỏi mục tiêu bài hát: thu chơi, đăng mạng xã hội, gửi cuộc thi hay phát hành chính thức. Mỗi mục tiêu cần mức xử lý khác nhau. Nếu mọi khách hàng đều được đưa vào một quy trình giống hệt, kết quả rất dễ chung chung.',
            'Một quy trình tốt cũng cần rõ về số giờ thu, số lần chỉnh sửa, file nhận được, thời gian hoàn thiện và chi phí phát sinh nếu có thêm yêu cầu.'
          ],
          bullets: [
            'Tư vấn tone, beat và mục tiêu trước khi thu.',
            'Thu nhiều take đủ để chọn câu tốt nhất.',
            'Có bước nghe lại và góp ý ngay trong phiên.',
            'Bàn giao file đúng định dạng theo nhu cầu sử dụng.'
          ]
        },
        {
          id: 'dia-phuong-va-chat-luong',
          heading: 'Lợi thế của studio địa phương là sự gần gũi',
          body: [
            'Ở Bình Phước, nhiều nghệ sĩ trẻ cần một nơi có thể hỏi kỹ, thử nhiều và được hướng dẫn thay vì chỉ nhận dịch vụ lạnh lùng. Khi studio hiểu thị trường địa phương nhưng vẫn giữ tiêu chuẩn sản xuất hiện đại, khách hàng có lợi ở cả chi phí lẫn sự đồng hành.',
            'Không phải dự án nào cũng cần ngân sách lớn. Nhưng dự án nào cũng cần sự nghiêm túc vừa đủ để không biến bài hát thành một file thu tạm.'
          ],
          callout: 'Nếu bạn mới thu lần đầu, hãy chọn nơi giải thích rõ quy trình. Sự thoải mái trong phiên thu thường nghe được trong bản vocal cuối cùng.'
        },
        {
          id: 'ket-luan',
          heading: 'Uy tín là thứ được nghe thấy sau khi bài hát phát lên',
          body: [
            'Một studio tốt không cần nói quá nhiều về sự chuyên nghiệp. Điều đó nằm trong cách họ chuẩn bị, cách họ nghe, cách họ sửa và cách sản phẩm cuối cùng đứng được trên nhiều thiết bị nghe.',
            'Khi chọn đúng nơi, bạn không chỉ mua một buổi thu. Bạn mua sự yên tâm rằng bài hát của mình được đối xử nghiêm túc.'
          ]
        }
      ]
    },
    {
      slug: 'ky-am-bai-hat-va-soan-sheet-nhac-chuyen-nghiep',
      title: 'Ký âm bài hát và soạn sheet nhạc: biến giai điệu thành tài sản rõ ràng',
      subtitle: 'Một giai điệu hát ra có thể rất đẹp, nhưng sheet nhạc giúp nó được lưu giữ, truyền đạt, đăng ký và làm việc chuyên nghiệp hơn với ban nhạc hoặc producer.',
      excerpt: 'Vì sao ký âm và soạn sheet nhạc quan trọng với tác giả, ca sĩ, ban nhạc và các dự án cần lưu trữ tác phẩm nghiêm túc.',
      category: 'Kiến Thức',
      icon: 'fa-solid fa-file-lines',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Producer / Arranger tại XKProduction',
      date: '20/05/2026',
      isoDate: '2026-05-20',
      readTime: '7 phút đọc',
      thumb: '/images/blog-sheet-nhac.jpg',
      cover: '/images/blog-sheet-nhac.jpg',
      tags: ['Ký Âm', 'Sheet Nhạc', 'Kiến Thức'],
      sections: [
        {
          id: 'giai-dieu-can-duoc-ghi-lai',
          heading: 'Một giai điệu hay cần được ghi lại đúng cách',
          body: [
            'Rất nhiều tác giả bắt đầu bằng cách ngân nga một melody vào điện thoại. Đó là khoảnh khắc sáng tạo rất thật, nhưng nếu chỉ giữ ở dạng audio thô, bài hát khó được truyền đạt chính xác cho ca sĩ khác, ban nhạc, producer hoặc đơn vị đăng ký bản quyền.',
            'Ký âm giúp chuyển melody, nhịp, cao độ và cấu trúc thành ngôn ngữ âm nhạc rõ ràng. Sheet nhạc không làm bài hát hay hơn ngay lập tức, nhưng làm nó trở nên có hình dạng và dễ làm việc hơn.'
          ],
          quote: 'Sheet nhạc là bản đồ của tác phẩm: không thay thế cảm xúc, nhưng giúp cảm xúc được đi đúng đường.'
        },
        {
          id: 'khi-nao-can-sheet',
          heading: 'Khi nào bạn nên làm sheet nhạc?',
          body: [
            'Nếu bài hát chỉ để giữ làm kỷ niệm, một bản demo có thể đủ. Nhưng nếu bạn muốn gửi cho nhạc công, biểu diễn live, phối khí chuyên nghiệp, đăng ký quyền tác giả hoặc làm việc với nhiều người, sheet nhạc trở thành tài liệu rất quan trọng.',
            'Một bản sheet tốt cần rõ tone, nhịp, cấu trúc, melody chính, hợp âm và những ghi chú cần thiết về tempo hoặc cách thể hiện. Không cần trang trí phức tạp, nhưng phải sạch, dễ đọc và đúng.'
          ],
          bullets: [
            'Tác giả muốn lưu trữ và bảo vệ ý tưởng.',
            'Ca sĩ cần gửi bài cho ban nhạc tập.',
            'Producer cần nắm melody/harmony để phối khí.',
            'Dự án cần hồ sơ rõ ràng để đăng ký hoặc bàn giao.'
          ]
        },
        {
          id: 'tu-audio-den-ban-nhac',
          heading: 'Từ file audio thô đến bản nhạc hoàn chỉnh',
          body: [
            'Quá trình ký âm bắt đầu bằng việc nghe melody, xác định tone, chia nhịp và ghi lại cao độ. Với những bản thu tự do, người ký âm phải phân biệt đâu là chủ ý nghệ thuật, đâu là chênh phô tự nhiên khi hát mộc.',
            'Sau đó, sheet được trình bày lại để người khác có thể đọc: phân câu, đặt hợp âm, ghi lời dưới nốt và làm rõ các đoạn lặp. Đây là phần đòi hỏi cả tai nghe lẫn nhạc lý thực tế.'
          ],
          callout: 'Một bản thu điện thoại vẫn có thể ký âm được nếu melody và lời đủ rõ. Chất lượng file càng tốt, thời gian xử lý càng chính xác.'
        },
        {
          id: 'ket-luan',
          heading: 'Ký âm là cách tôn trọng bài hát của chính mình',
          body: [
            'Không phải tác giả nào cũng cần biết viết nốt nhạc, nhưng tác phẩm nghiêm túc nên có một hình thức lưu giữ nghiêm túc. Sheet nhạc giúp bài hát thoát khỏi trí nhớ cá nhân và bước vào một quy trình làm việc chuyên nghiệp hơn.',
            'Khi giai điệu được ghi lại rõ ràng, nó có cơ hội được phối tốt hơn, biểu diễn đúng hơn và tồn tại lâu hơn.'
          ]
        }
      ]
    },
    {
      slug: 'mix-vocal-cover-nghe-sang-hon',
      title: 'Mix vocal cover sao cho nghe sang hơn mà không mất sự gần gũi',
      subtitle: 'Cover hay không nằm ở việc bắt chước bản gốc, mà ở cách giọng hát được đặt vào không gian đủ đẹp để cá tính riêng được nghe rõ.',
      excerpt: 'Những quyết định quan trọng khi mix vocal cover: chọn tone, xử lý dynamics, reverb, delay, bè và khoảng cách giữa vocal với beat.',
      category: 'Mix & Master',
      icon: 'fa-solid fa-sliders',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Mixing / Mastering Engineer tại XKProduction',
      date: '27/05/2026',
      isoDate: '2026-05-27',
      readTime: '8 phút đọc',
      thumb: '/images/blog-mix-cover.jpg',
      cover: '/images/blog-mix-cover.jpg',
      tags: ['Mix & Master', 'Vocal Production', 'Thu Âm'],
      sections: [
        {
          id: 'cover-can-khoang-cach-rieng',
          heading: 'Một bản cover cần khoảng cách riêng với bản gốc',
          body: [
            'Nếu mix cover cố làm giống hệt bản gốc, giọng hát thường bị đặt vào một chiếc áo không vừa. Mỗi người có màu giọng, cách nhả chữ và độ dày khác nhau. Mix tốt phải làm nổi bật điểm riêng đó thay vì ép vocal đi theo texture của ca sĩ gốc.',
            'Điểm bắt đầu là chọn tone và beat phù hợp. Beat quá dày sẽ làm vocal cover bị nhỏ bé. Beat quá mỏng lại khiến mọi lỗi xử lý lộ rõ. Sự sang nằm ở cân bằng giữa gần gũi và được sản xuất chỉn chu.'
          ],
          quote: 'Cover tốt khiến người nghe nhớ giọng của bạn, không chỉ nhớ bài hát gốc.'
        },
        {
          id: 'vocal-front',
          heading: 'Đặt vocal đủ gần nhưng không thô',
          body: [
            'Vocal cover thường cần cảm giác gần, vì người nghe đến để nghe giọng. Tuy nhiên gần không có nghĩa là khô và chói. EQ cần dọn low-mid đục, giữ presence vừa đủ, de-ess cẩn thận và dùng compression để câu hát ổn định mà không bị bóp nghẹt.',
            'Reverb và delay nên được dùng như ánh sáng nền. Một plate ngắn có thể làm vocal bóng hơn, một delay nhỏ ở cuối câu giúp không gian mở ra mà không che lời.'
          ],
          bullets: [
            'Giữ vocal rõ lời ở vùng mid-range.',
            'Không lạm dụng reverb dài nếu beat đã nhiều không gian.',
            'Automation volume giúp câu nhỏ không bị chìm.',
            'Delay throw ở cuối câu tạo cảm giác hiện đại và tinh tế.'
          ]
        },
        {
          id: 'be-cover',
          heading: 'Bè trong cover nên đủ để nâng, không nên chiếm spotlight',
          body: [
            'Harmony có thể làm chorus dày hơn, nhưng nếu viết bè quá nhiều, bản cover mất sự thân mật. Với đa số cover pop-ballad hoặc acoustic, chỉ cần double nhẹ ở chorus, một vài harmony ở chữ khóa và ad-lib cuối bài là đủ.',
            'Cách xử lý bè cũng cần tinh tế: pan nhẹ, giảm presence, nén mềm và đặt lùi hơn vocal chính. Người nghe nên cảm thấy chorus rộng hơn chứ không nhất thiết phải nghe rõ từng lớp bè.'
          ],
          callout: 'Bè hay là bè làm người nghe thấy vocal chính tốt hơn, không phải bè khiến người nghe quên mất đâu là câu chính.'
        },
        {
          id: 'ket-luan',
          heading: 'Sự sang nằm ở những chi tiết nhỏ',
          body: [
            'Một bản cover không cần production quá lớn để nghe chuyên nghiệp. Nó cần vocal sạch, không gian đẹp, dynamics ổn định và vài khoảnh khắc xử lý có gu.',
            'Khi mix phục vụ đúng màu giọng, bản cover không còn là phiên bản phụ của một bài hát nổi tiếng. Nó trở thành một lời kể mới, đủ gần để chạm và đủ chỉn chu để người nghe muốn nghe lại.'
          ]
        }
      ]
    },
    {
      slug: 'live-sound-cho-su-kien-nho',
      title: 'Live sound cho sự kiện nhỏ: vì sao âm thanh rõ quan trọng hơn âm lượng lớn',
      subtitle: 'Một sự kiện ấm cúng không cần hệ thống phô trương. Nó cần lời nói rõ, nhạc nền vừa đủ và sân khấu không làm khách mời mệt tai.',
      excerpt: 'Góc nhìn thực tế về setup âm thanh ánh sáng cho workshop, tiệc thân mật, acoustic night và sự kiện doanh nghiệp quy mô nhỏ.',
      category: 'Live Sound',
      icon: 'fa-solid fa-volume-high',
      author: 'Nguyễn Xuân Kiệt',
      authorRole: 'Founder / Sound Engineer tại XKProduction',
      date: '30/05/2026',
      isoDate: '2026-05-30',
      readTime: '8 phút đọc',
      thumb: '/images/kiet-live-sound-wide.jpg',
      cover: '/images/kiet-live-sound-wide.jpg',
      tags: ['Live Sound', 'Sự Kiện', 'Âm Thanh'],
      sections: [
        {
          id: 'ro-hon-to',
          heading: 'Rõ luôn quan trọng hơn to',
          body: [
            'Ở sự kiện nhỏ, âm lượng lớn thường tạo cảm giác chuyên nghiệp giả. Khách mời không cần bị áp đảo bởi loa; họ cần nghe rõ người nói, cảm nhận được nhạc và vẫn có thể trò chuyện. Âm thanh tốt là âm thanh vừa đủ để hỗ trợ không khí.',
            'Điều này đòi hỏi setup đúng từ đầu: chọn loa phù hợp diện tích, đặt loa tránh hú, cân bằng micro, kiểm soát low-end và giữ dải mid rõ để lời nói không bị nuốt.'
          ],
          quote: 'Nếu khách mời phải nói lớn hơn hệ thống âm thanh, setup đó đang phục vụ sai mục tiêu.'
        },
        {
          id: 'micro-va-khong-gian',
          heading: 'Micro, phòng và vị trí loa quyết định rất nhiều',
          image: '/images/kiet-live-sound-focus.jpg',
          body: [
            'Một micro tốt vẫn có thể hú nếu đặt sai hướng loa. Một phòng kính hoặc trần thấp có thể làm tiếng nói bị dội và mệt tai. Vì vậy live sound không chỉ là mang thiết bị đến, mà là đọc không gian trước khi mở âm lượng.',
            'Với workshop hoặc talkshow, ưu tiên giọng nói rõ, ít vang và ổn định khi người cầm micro di chuyển. Với acoustic night, cần giữ vocal gần, guitar đủ thân và không để cajon hoặc kick lấn toàn bộ không gian.'
          ],
          bullets: [
            'Khảo sát diện tích và vật liệu phòng trước sự kiện.',
            'Đặt loa tránh hướng thu trực tiếp của micro.',
            'Soundcheck với người nói/người hát thật, không chỉ test bằng nhạc.',
            'Dự phòng dây, pin micro và phương án xử lý hú nhanh.'
          ]
        },
        {
          id: 'anh-sang-vua-du',
          heading: 'Ánh sáng nên nâng không khí, không làm sân khấu rẻ đi',
          body: [
            'Với sự kiện nhỏ, ánh sáng quá nhiều màu hoặc chuyển động liên tục dễ làm mất sự sang. Một vài nguồn sáng ấm, điểm nhấn vào người trình bày và nền đủ sâu thường hiệu quả hơn nhiều so với hiệu ứng dày đặc.',
            'Âm thanh và ánh sáng cần cùng một tinh thần. Nếu sự kiện là acoustic, workshop thương hiệu hoặc tiệc thân mật, sự tiết chế tạo cảm giác cao cấp hơn sự phô diễn.'
          ],
          callout: 'Premium không đồng nghĩa với nhiều thiết bị hơn. Premium là đúng thiết bị, đúng vị trí và đúng liều lượng.'
        },
        {
          id: 'ket-luan',
          heading: 'Sự kiện nhỏ cần sự tinh tế lớn',
          body: [
            'Một hệ thống live sound tốt giúp chương trình diễn ra nhẹ nhàng: không hú, không rè, không làm người nghe mệt, không buộc MC phải gồng giọng. Khi mọi thứ trơn tru, khách mời ít để ý đến kỹ thuật — đó chính là dấu hiệu kỹ thuật đang làm đúng.',
            'Với sự kiện nhỏ, mục tiêu không phải chứng minh dàn âm thanh mạnh. Mục tiêu là tạo một không gian nghe dễ chịu để nội dung và cảm xúc được đặt ở trung tâm.'
          ]
        }
      ]
    }
  ]

  const allBlogPosts: BlogPost[] = posts.map(post => ({
    ...post,
    content: sectionToHtml(post.sections)
  }))

  const getPostBySlug = (slug: string) => {
    return allBlogPosts.find(p => p.slug === slug)
  }

  const getRelatedPosts = (slug: string, limit = 3) => {
    const post = getPostBySlug(slug)
    if (!post) return allBlogPosts.slice(0, limit)

    const sameTagPosts = allBlogPosts
      .filter(p => p.slug !== slug)
      .map(p => ({
        post: p,
        score: (p.tags || []).filter(tag => post.tags?.includes(tag)).length + (p.category === post.category ? 2 : 0)
      }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.post)

    return sameTagPosts.slice(0, limit)
  }

  return {
    allBlogPosts,
    getPostBySlug,
    getRelatedPosts
  }
}
