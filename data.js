/* Nội dung thuyết trình — prototype 1 · v2.
   Mỗi phần (section) là một nút trên trục chính của "dòng bố cục".
   items: các nút rẽ nhánh xuống của phần đó, mỗi nút là một bước trình chiếu.
     kind: "person"  một nhân vật (ảnh chân dung hiện bên phải)
           "people"  nhiều nhân vật trong một bước
           "story"   một mẩu chuyện / sự kiện
           "quote"   một câu nói
           "idea"    một ý nghĩa / luận điểm
           "take"    một kết luận (các nút "take" liền nhau hiện thành lưới, mở dần)
     tag:   chữ nhỏ trên nhãn nút (mặc định theo kind)
     label: nhãn ngắn dưới nút
     at:    địa danh camera bản đồ đáp xuống (xem places); khác nơi trước thì có hải trình
     zoom:  mức zoom riêng (mặc định lấy của phần)
     bg / bgCap: ảnh nền chìm riêng (mặc định lấy của phần)
   map.center: [kinh độ, vĩ độ]; map.zoom: 1 = toàn thế giới; hl: mã ISO số quốc gia tô nhạt. */
window.DECK = {
  title: "Tư tưởng và văn hóa phương Tây",
  subtitle: "góp phần hình thành tư tưởng Hồ Chí Minh",

  places: {
    "Sài Gòn": [106.70, 10.77],
    "Marseille": [5.37, 43.30],
    "Paris": [2.35, 48.86],
    "Versailles": [2.13, 48.80],
    "Genève": [6.14, 46.20],
    "Bordeaux": [-0.58, 44.84],
    "London": [-0.13, 51.51],
    "Yasnaya Polyana": [37.53, 54.07],
    "Philadelphia": [-75.16, 39.95],
    "Roma · Vatican": [12.45, 41.90],
    "Hà Nội": [105.85, 21.03]
  },

  sections: [
    {
      id: "mo-dau",
      kind: "cover",
      rail: "Mở đầu",
      kicker: "Tư tưởng Hồ Chí Minh",
      title: "Tư tưởng và văn hóa phương Tây",
      sub: "góp phần hình thành tư tưởng Hồ Chí Minh",
      portraits: ["images/HCM_1.png", "images/HCM_3.png", "images/HCM_4.png"],
      map: { center: [20, 30], zoom: 1 }
    },

    {
      id: "boi-canh",
      rail: "Bối cảnh",
      kicker: "Bối cảnh & luận đề",
      place: "Sài Gòn → Marseille",
      title: "Ra đi tìm đường cứu nước",
      lead: "Ngày 5/6/1911, người thanh niên Nguyễn Tất Thành, lấy tên Văn Ba, làm phụ bếp trên tàu Amiral Latouche-Tréville, rời bến Nhà Rồng sang Pháp.",
      bg: "images/bg-saigon.jpg",
      bgCap: "Trụ sở hãng Messageries Maritimes, Sài Gòn (bưu ảnh đầu thế kỷ XX)",
      map: { at: "Sài Gòn", zoom: 3.2, hl: [704], pins: ["Sài Gòn", "Marseille"] },
      items: [
        {
          kind: "people", tag: "Tiền bối", label: "Phan Bội Châu · Phan Châu Trinh",
          title: "Khủng hoảng đường lối cứu nước",
          text: "Đất nước mất độc lập. Các phong trào yêu nước theo hệ tư tưởng phong kiến và dân chủ tư sản lần lượt thất bại: Đông Du hướng sang Nhật Bản, Duy Tân trông vào cải cách ôn hòa.",
          people: [
            { img: "images/p-pbc.jpg", name: "Phan Bội Châu", years: "1867–1940", note: "Phong trào Đông Du" },
            { img: "images/p-pct.jpg", name: "Phan Châu Trinh", years: "1872–1926", note: "Phong trào Duy Tân" }
          ],
          at: "Sài Gòn"
        },
        {
          kind: "story", tag: "Lựa chọn", label: "Sang phương Tây",
          title: "Sang phương Tây",
          text: "Khác các bậc tiền bối hướng sang phương Đông, Người chọn sang phương Tây, vào chính “sào huyệt” của chủ nghĩa thực dân. Ba mươi năm bôn ba (1911–1941), vừa lao động vừa học tập, đọc sách và hoạt động.",
          at: "Marseille", zoom: 3.4
        },
        {
          kind: "quote", label: "Trần Dân Tiên",
          text: "Tôi muốn đi ra nước ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.",
          src: "Trần Dân Tiên, Những mẩu chuyện về đời hoạt động của Hồ Chủ tịch",
          at: "Marseille", zoom: 3.4
        },
        {
          kind: "idea", tag: "Luận đề", label: "Luận đề",
          title: "Luận đề",
          text: "Tinh hoa văn hóa phương Tây là một trong những nguồn gốc lý luận góp phần hình thành tư tưởng Hồ Chí Minh, được Người tiếp thu có chọn lọc trên nền chủ nghĩa yêu nước Việt Nam.",
          at: "Paris", zoom: 3
        }
      ]
    },

    {
      id: "khai-sang",
      rail: "Khai sáng",
      kicker: "Triết học Khai sáng Pháp",
      place: "Paris · Genève · Bordeaux",
      title: "Ánh sáng của lý trí",
      lead: "Thế kỷ XVIII, các nhà Khai sáng Pháp phê phán chế độ chuyên chế và đặc quyền, đề cao lý trí, tự do và quyền con người, dọn đường tư tưởng cho Cách mạng Pháp.",
      bg: "images/bg-geoffrin.jpg",
      bgCap: "Buổi đọc sách ở salon của bà Geoffrin, 1755 (tranh của A. C. G. Lemonnier, 1812)",
      map: { at: "Paris", center: [2.6, 46.6], zoom: 6, hl: [250, 756], pins: ["Paris", "Genève", "Bordeaux"] },
      items: [
        {
          kind: "person", label: "Voltaire", img: "images/p-voltaire.jpg",
          title: "Voltaire", years: "1694–1778",
          text: "Đề cao tự do tư tưởng, khoan dung tôn giáo. Ngòi bút châm biếm sắc bén chống chuyên chế và giáo quyền.",
          at: "Paris", zoom: 7
        },
        {
          kind: "person", label: "J.-J. Rousseau", img: "images/p-rousseau.jpg",
          title: "Jean-Jacques Rousseau", years: "1712–1778",
          text: "Khế ước xã hội (1762): chủ quyền thuộc về nhân dân; nhà nước ra đời từ sự ưng thuận của người dân.",
          at: "Genève", zoom: 7
        },
        {
          kind: "person", label: "Montesquieu", img: "images/p-montesquieu.jpg",
          title: "Montesquieu", years: "1689–1755",
          text: "Tinh thần pháp luật (1748): tam quyền phân lập, dùng pháp luật để giới hạn quyền lực.",
          at: "Bordeaux", zoom: 7
        },
        {
          kind: "story", tag: "Dấu ấn", label: "Yêu sách 1919",
          title: "Bản Yêu sách của nhân dân An Nam",
          text: "Năm 1919, bản yêu sách gửi Hội nghị Versailles đòi “thay chế độ ra các sắc lệnh bằng chế độ ra các đạo luật”. Tinh thần thượng tôn pháp luật của Khai sáng đã thành yêu cầu chính trị.",
          at: "Versailles", zoom: 9,
          bg: "images/bg-encyclopedie.jpg",
          bgCap: "Tranh khắc mở đầu bộ Bách khoa toàn thư của Diderot (C.-N. Cochin, 1772)"
        },
        {
          kind: "quote", label: "Việt Nam yêu cầu ca",
          text: "Bảy xin hiến pháp ban hành,\nTrăm điều phải có thần linh pháp quyền.",
          src: "Nguyễn Ái Quốc, Việt Nam yêu cầu ca — diễn ca Bản yêu sách 8 điểm",
          at: "Versailles", zoom: 9,
          bg: "images/bg-encyclopedie.jpg",
          bgCap: "Tranh khắc mở đầu bộ Bách khoa toàn thư của Diderot (C.-N. Cochin, 1772)"
        }
      ]
    },

    {
      id: "van-hoc",
      rail: "Văn học",
      kicker: "Văn học phương Tây",
      place: "London · Paris · Yasnaya Polyana",
      title: "Những trang văn nhân đạo",
      lead: "Người tự học tiếng Pháp, tiếng Anh và đọc các nhà văn lớn của phương Tây. Văn học vừa là công cụ học ngôn ngữ, vừa nuôi dưỡng lòng thương người lao khổ.",
      bg: "images/bg-cosette.jpg",
      bgCap: "Cô bé Cosette — minh họa Những người khốn khổ, Émile Bayard (1862)",
      map: { at: "Paris", center: [14, 51], zoom: 3.4, hl: [826, 250, 643], pins: ["London", "Paris", "Yasnaya Polyana"] },
      items: [
        {
          kind: "person", label: "Shakespeare", img: "images/p-shakespeare.jpg",
          title: "William Shakespeare", years: "1564–1616",
          text: "Những vở kịch về thân phận, khát vọng và phẩm giá con người: đỉnh cao của chủ nghĩa nhân văn Phục hưng.",
          at: "London", zoom: 4.5
        },
        {
          kind: "person", label: "Victor Hugo", img: "images/p-hugo.jpg",
          title: "Victor Hugo", years: "1802–1885",
          text: "Những người khốn khổ (1862): lòng thương người nghèo, tiếng nói bênh vực kẻ bị áp bức.",
          at: "Paris", zoom: 4.5
        },
        {
          kind: "person", label: "Émile Zola", img: "images/p-zola.jpg",
          title: "Émile Zola", years: "1840–1902",
          text: "Văn học hiện thực về đời sống người lao động; bức thư “Tôi tố cáo” (1898) đứng về phía lẽ phải.",
          at: "Paris", zoom: 4.5
        },
        {
          kind: "person", label: "Anatole France", img: "images/p-anatole-france.jpg",
          title: "Anatole France", years: "1844–1924",
          text: "Nhà văn tiến bộ, giải Nobel Văn chương 1921, có cảm tình với phong trào công nhân.",
          at: "Paris", zoom: 4.5
        },
        {
          kind: "person", label: "Lev Tolstoy", img: "images/p-tolstoy.jpg",
          title: "Lev Tolstoy", years: "1828–1910",
          text: "Chủ nghĩa nhân đạo sâu sắc, đứng về phía người nông dân Nga.",
          at: "Yasnaya Polyana", zoom: 4.5
        },
        {
          kind: "story", tag: "Dấu ấn", label: "Ngòi bút Nguyễn Ái Quốc",
          title: "Ngòi bút Nguyễn Ái Quốc",
          text: "Chủ nghĩa nhân đạo và tinh thần phê phán hiện thực cộng hưởng với lòng thương dân của Người. Người viết báo, viết truyện bằng tiếng Pháp: kịch Con rồng tre (1922), các bài trên báo Người cùng khổ (Le Paria). Văn phong ngắn gọn, giàu hình ảnh, châm biếm sắc sảo.",
          at: "Paris", zoom: 6
        }
      ]
    },

    {
      id: "tu-do",
      rail: "Tự do · Bình đẳng · Bác ái",
      kicker: "Ba giá trị",
      place: "Pháp",
      title: "Tự do · Bình đẳng · Bác ái",
      motto: ["Liberté", "Égalité", "Fraternité"],
      lead: "Khẩu hiệu của Cách mạng Pháp là điều đầu tiên kéo người thanh niên xứ Nghệ đến với phương Tây.",
      bg: "images/bg-liberte.jpg",
      bgCap: "Nữ thần Tự do dẫn dắt nhân dân, Eugène Delacroix (1830)",
      map: { at: "Paris", center: [2.4, 46.6], zoom: 5, hl: [250], pins: ["Paris"] },
      items: [
        {
          kind: "quote", label: "Tuổi mười ba",
          text: "Vào trạc tuổi mười ba, lần đầu tiên tôi được nghe những từ Pháp: Tự do, Bình đẳng, Bác ái… Tôi rất muốn làm quen với nền văn minh Pháp, muốn tìm xem những gì ẩn giấu đằng sau những từ ấy.",
          src: "Trả lời nhà báo O. Mandelstam, tạp chí Ogoniok (1923)"
        },
        {
          kind: "story", tag: "Sự đối lập", label: "Chính quốc & thuộc địa",
          title: "Chính quốc và thuộc địa",
          text: "Sang Pháp, Người thấy rõ sự đối lập: ở “chính quốc” có khẩu hiệu tự do, bình đẳng, bác ái; còn ở thuộc địa là áp bức, bất công."
        },
        {
          kind: "idea", tag: "Kế thừa", label: "Nâng lên tầm mới",
          title: "Kế thừa và nâng lên",
          text: "Tự do cho cả dân tộc, bình đẳng giữa các dân tộc, bác ái thành tình thương với con người lao khổ. Tinh thần ấy đi vào tiêu ngữ Độc lập – Tự do – Hạnh phúc."
        }
      ]
    },

    {
      id: "cach-mang-phap",
      rail: "Cách mạng Pháp",
      kicker: "Cách mạng Pháp",
      place: "Paris",
      title: "Tuyên ngôn Nhân quyền và Dân quyền",
      lead: "Ngày 26/8/1789, Quốc hội lập hiến Pháp thông qua bản Tuyên ngôn Nhân quyền và Dân quyền, sau này được đặt ở đầu Hiến pháp 1791.",
      bg: "images/bg-ddhc.jpg",
      bgCap: "Tuyên ngôn Nhân quyền và Dân quyền, tranh của J.-J.-F. Le Barbier (khoảng 1789)",
      map: { at: "Paris", zoom: 10, hl: [250], pins: ["Paris"] },
      items: [
        {
          kind: "person", label: "La Fayette", img: "images/p-lafayette.jpg",
          title: "La Fayette", years: "1757–1834",
          text: "Trình bản dự thảo đầu tiên của Tuyên ngôn (7/1789); trước đó từng chiến đấu trong Cách mạng Mỹ."
        },
        {
          kind: "story", tag: "Nội dung", label: "Điều 1",
          title: "Điều 1",
          text: "“Người ta sinh ra tự do và bình đẳng về quyền lợi.” Quyền tự nhiên, bất khả xâm phạm: tự do, sở hữu, an toàn và chống áp bức."
        },
        {
          kind: "quote", label: "Tuyên ngôn độc lập",
          text: "Bản Tuyên ngôn Nhân quyền và Dân quyền của Cách mạng Pháp năm 1791 cũng nói: Người ta sinh ra tự do và bình đẳng về quyền lợi; và phải luôn luôn được tự do và bình đẳng về quyền lợi. Đó là những lẽ phải không ai chối cãi được.",
          src: "Hồ Chí Minh, Tuyên ngôn độc lập (2/9/1945)"
        },
        {
          kind: "quote", tag: "Phê phán", label: "Đường cách mệnh",
          text: "Cách mệnh Pháp cũng như cách mệnh Mỹ, nghĩa là cách mệnh tư bản, cách mệnh không đến nơi, tiếng là cộng hòa và dân chủ, kỳ thực trong thì nó tước lục công nông, ngoài thì nó áp bức thuộc địa.",
          src: "Nguyễn Ái Quốc, Đường cách mệnh (1927)",
          bg: "images/bg-bastille.jpg",
          bgCap: "Phá ngục Bastille, 14/7/1789 (tranh của J.-P. Houël)"
        }
      ]
    },

    {
      id: "my",
      rail: "Cách mạng Mỹ",
      kicker: "Cách mạng Mỹ",
      place: "Philadelphia",
      title: "Tuyên ngôn độc lập Hoa Kỳ",
      lead: "Ngày 4/7/1776, tại Philadelphia, mười ba thuộc địa Bắc Mỹ tuyên bố độc lập khỏi nước Anh.",
      bg: "images/bg-us-declaration.jpg",
      bgCap: "Tuyên ngôn độc lập, tranh của John Trumbull (1819)",
      map: { at: "Philadelphia", zoom: 8, hl: [840], pins: ["Philadelphia"] },
      items: [
        {
          kind: "person", label: "Thomas Jefferson", img: "images/p-jefferson.jpg",
          title: "Thomas Jefferson", years: "1743–1826",
          text: "Người chấp bút chính bản Tuyên ngôn 1776."
        },
        {
          kind: "quote", label: "Quyền con người",
          text: "Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc.",
          src: "Tuyên ngôn độc lập Mỹ 1776, trích ở đầu Tuyên ngôn độc lập Việt Nam"
        },
        {
          kind: "quote", tag: "Suy rộng ra", label: "Quyền dân tộc",
          text: "Suy rộng ra, câu ấy có ý nghĩa là: tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do.",
          src: "Hồ Chí Minh, Tuyên ngôn độc lập (2/9/1945)"
        }
      ]
    },

    {
      id: "thien-chua",
      rail: "Thiên Chúa giáo",
      kicker: "Thiên Chúa giáo",
      place: "Roma · Vatican",
      title: "Lòng nhân ái cao cả",
      lead: "Thiên Chúa giáo là một nền tảng của văn hóa phương Tây. Hồ Chí Minh trân trọng giá trị nhân văn của nó: lòng thương người, tinh thần hy sinh vì con người.",
      bg: "images/bg-vatican.jpg",
      bgCap: "Quảng trường Thánh Phêrô, tranh khắc của G. B. Piranesi (1772)",
      map: { at: "Roma · Vatican", zoom: 9, hl: [380, 336], pins: ["Roma · Vatican"] },
      items: [
        {
          kind: "quote", label: "Người học trò nhỏ",
          text: "Học thuyết của Khổng Tử có ưu điểm là sự tu dưỡng đạo đức cá nhân. Tôn giáo Giêsu có ưu điểm là lòng nhân ái cao cả. Chủ nghĩa Mác có ưu điểm là phương pháp làm việc biện chứng… Tôi cố gắng làm người học trò nhỏ của các vị ấy.",
          src: "Hồ Chí Minh, trích theo giáo trình Tư tưởng Hồ Chí Minh"
        },
        {
          kind: "story", tag: "Đoàn kết", label: "Lương — giáo",
          title: "Đoàn kết lương — giáo",
          text: "Tôn trọng tự do tín ngưỡng, đoàn kết đồng bào lương và giáo. Người gửi thư chúc mừng Giáng sinh tới đồng bào Công giáo, khuyến khích tinh thần “Kính Chúa — yêu nước”."
        },
        {
          kind: "idea", tag: "Chọn lọc", label: "Giá trị nhân văn",
          title: "Tiếp thu có chọn lọc",
          text: "Người tiếp thu giá trị đạo đức, nhân văn, chứ không tiếp thu thế giới quan duy tâm của tôn giáo."
        }
      ]
    },

    {
      id: "ket-luan",
      kind: "end",
      rail: "Kết luận",
      kicker: "Kết luận",
      place: "Hà Nội",
      title: "Tiếp thu có chọn lọc, để làm giàu cho dân tộc",
      lead: "Văn hóa phương Tây, được Người tiếp thu có chọn lọc và có phê phán trên nền chủ nghĩa yêu nước, đã góp phần quan trọng hình thành tư tưởng Hồ Chí Minh. Chủ nghĩa Mác – Lênin là cơ sở thế giới quan và phương pháp luận.",
      bg: "images/bg-tours-1920.jpg",
      bgCap: "Nguyễn Ái Quốc phát biểu tại Đại hội Tours, 12/1920",
      portrait: "images/HCM_4.png",
      map: { at: "Hà Nội", zoom: 1.2, hl: [704], pins: ["Hà Nội"] },
      items: [
        { kind: "take", label: "Dân chủ & pháp quyền", title: "Dân chủ & pháp quyền", text: "Từ Khai sáng: chủ quyền nhân dân, nhà nước hợp hiến, thượng tôn pháp luật." },
        { kind: "take", label: "Nhân quyền → dân tộc quyền", title: "Nhân quyền → dân tộc quyền", text: "Từ hai bản Tuyên ngôn 1776 và 1789: quyền con người “suy rộng ra” thành quyền độc lập của các dân tộc." },
        { kind: "take", label: "Chủ nghĩa nhân văn", title: "Chủ nghĩa nhân văn", text: "Từ văn học và Thiên Chúa giáo: lòng thương người, phẩm giá con người." },
        { kind: "take", label: "Phương pháp & phong cách", title: "Phương pháp & phong cách", text: "Tinh thần phê phán; lối viết ngắn gọn, sắc sảo, gần gũi." },
        {
          kind: "quote", label: "Đông — Tây",
          text: "Tây phương hay Đông phương có cái gì tốt, ta học lấy để tạo ra một nền văn hóa Việt Nam.",
          src: "Hồ Chí Minh"
        }
      ]
    }
  ]
};
