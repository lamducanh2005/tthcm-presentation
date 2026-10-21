/* Nội dung thuyết trình — prototype 1 · v3 (theo khung .job/TOC.v1.md).
   Mỗi phần (section) là một nút trên trục chính của "dòng bố cục".
   items: các nút rẽ nhánh xuống của phần đó; mỗi nút là MỘT bước trình chiếu.
     kind:   "story"   một nội dung có tiêu đề (mặc định)
             "idea"    một luận điểm (chữ dẫn in nghiêng, đỏ son)
             "people"  nhiều nhân vật (ảnh chân dung khung vòm bên phải)
             "quote"   chỉ một câu trích lớn
             "summary" lưới tổng kết (grid), hiện cùng lúc
     tag:    chữ nhỏ trên nhãn nút ở dòng bố cục (và cạnh kicker)
     label:  nhãn ngắn dưới nút
     title:  tiêu đề bên trái;   text: một câu dẫn ngắn
     points: vài gạch đầu dòng NGẮN
     quote:  { text, src } câu trích đi kèm (kind "quote" dùng text/src trực tiếp)
     qfirst: true → câu trích đứng trước gạch đầu dòng
     img / people: ảnh nhân vật (khung vòm, bên phải). people: [{ img, name, years, note }]
     coda:   một dòng nhỏ cuối cùng
     at:     địa danh camera bản đồ đáp xuống (xem places); khác nơi trước thì có hải trình
     zoom:   mức zoom riêng (mặc định lấy của phần)
     center: [kinh độ, vĩ độ] tâm camera riêng (mặc định là địa danh "at"); dùng khi cần thu xa thấy trọn hải trình
     bg / bgCap: ảnh nền chìm riêng (mặc định lấy của phần); ảnh thiếu sẽ hiện ô "ẢNH THIẾU"
     bgDim:  true → ảnh nền chìm sâu hơn (dùng cho ảnh độ phân giải thấp)
   map.center: [kinh độ, vĩ độ]; map.zoom: 1 = toàn thế giới; hl: mã ISO số quốc gia tô nhạt.
   Các chỗ đánh dấu "QĐ tạm" là quyết định tạm, xem README mục "Quyết định tạm". */
window.DECK = {
  title: "Tư tưởng và văn hóa phương Tây",
  subtitle: "góp phần hình thành tư tưởng Hồ Chí Minh",

  places: {
    "Sài Gòn": [106.70, 10.77],
    "Marseille": [5.37, 43.30],
    "New York": [-74.01, 40.71],
    "Paris": [2.35, 48.86],
    "Genève": [6.14, 46.20],
    "Bordeaux": [-0.58, 44.84],
    "Vinh": [105.68, 18.68],
    "Huế": [107.59, 16.46],
    "Phan Thiết": [108.10, 10.93],
    "London": [-0.13, 51.51],
    "Yasnaya Polyana": [37.53, 54.07],
    "Philadelphia": [-75.15, 39.95],
    "Versailles": [2.12, 48.80],
    "Roma · Vatican": [12.45, 41.90],
    "Hà Nội": [105.84, 21.03]
  },

  sections: [
    /* ================= MỞ ĐẦU (~1 phút) ================= */
    {
      id: "mo-dau",
      kind: "cover",
      rail: "Mở đầu",
      kicker: "Tư tưởng Hồ Chí Minh",
      title: "Tư tưởng và văn hóa phương Tây",
      sub: "góp phần hình thành tư tưởng Hồ Chí Minh",
      portraits: ["images/HCM_1.png", "images/HCM_3.png", "images/HCM_4.png"],
      map: { center: [20, 30], zoom: 1, hl: [704], pins: ["Sài Gòn", "Marseille", "New York", "London", "Paris"] },
      bg: "images/bg-saigon.jpg",
      bgCap: "Trụ sở hãng Messageries Maritimes, Sài Gòn (bưu ảnh đầu thế kỷ XX)",
      items: [
        {
          /* Node 1 (TOC.draft): gộp nút "Bến Nhà Rồng" cũ; camera đáp xuống Sài Gòn (Bến Nhà Rồng) */
          kind: "story", kicker: "Mở đầu", tag: "Ra đi", label: "Tìm đường cứu nước",
          title: "Ra đi tìm đường cứu nước",
          points: [
            "Các phong trào yêu nước trong nước (Cần Vương, Đông Du, Duy Tân) lần lượt thất bại; đất nước khủng hoảng đường lối",
            "Ngày 5/6/1911, Nguyễn Tất Thành (21 tuổi) lấy tên Văn Ba, làm phụ bếp trên tàu Amiral Latouche-Tréville, rời Bến cảng Nhà Rồng sang Pháp"
          ],
          quote: {
            text: "Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.",
            src: "Nguyễn Tất Thành, về mục đích ra đi"
          },
          at: "Sài Gòn", zoom: 2.8
        },
        {
          /* Node 2 (TOC.draft, mới). QĐ tạm 10: gộp node "Luận đề" cũ thành dòng nhấn cuối nút này.
             Hải trình Sài Gòn → Marseille → vòng châu Phi → New York → London → Paris (SEA_VIA trong app.js) */
          kind: "idea", kicker: "Mở đầu", tag: "Bôn ba", label: "Những năm bôn ba",
          title: "Những năm bôn ba",
          points: [
            "1911–1917: làm thuê trên tàu biển và trên đất khách; đi qua châu Phi, sang Mỹ, sang Anh, cuối 1917 trở lại Pháp",
            "Đi tới đâu cũng vừa làm vừa tự học, tiếp xúc trực tiếp một nền văn hóa, tư tưởng phương Tây hoàn toàn mới",
            "Chính những tinh hoa văn hóa, tư tưởng phương Tây ấy đã góp phần hình thành nên tư tưởng của Người"
          ],
          bg: "images/bg-le-havre-1910.jpg",
          bgCap: "Tàu viễn dương rời cảng Le Havre, 1910 (Agence Rol, ảnh minh họa bối cảnh)",
          at: "Paris", center: [-32, 15], zoom: 1.05
        }
      ]
    },

    /* ================= MỤC 1 · TRIẾT HỌC KHAI SÁNG PHÁP (~2.5 phút) ================= */
    {
      id: "khai-sang",
      rail: "Triết học Khai sáng Pháp",
      kicker: "Triết học Khai sáng Pháp",
      place: "Paris",
      title: "Triết học Khai sáng Pháp",
      lead: "Lý trí, quyền tự nhiên, chủ quyền nhân dân: những ý niệm Người gặp trên đường tìm hiểu nước Pháp.",
      bg: "images/bg-geoffrin.jpg",
      bgCap: "Buổi đọc sách ở salon của bà Geoffrin (tranh của A. C. G. Lemonnier, 1812)",
      map: { at: "Paris", center: [2.6, 46.6], zoom: 5, hl: [250], pins: ["Paris", "Genève", "Bordeaux"] },
      items: [
        {
          kind: "story", tag: "Thời kỳ Khai sáng", label: "Thế kỷ của lý trí",
          title: "Thế kỷ của lý trí",
          text: "Phong trào tư tưởng châu Âu, đỉnh cao ở Pháp thế kỷ XVIII: “thế kỷ ánh sáng”.",
          points: [
            "Đề cao lý trí, lấy lý trí làm thước đo mọi thể chế, mọi niềm tin",
            "Khẳng định quyền tự nhiên: quyền sống, tự do, mưu cầu hạnh phúc",
            "Phê phán quân chủ chuyên chế, đặc quyền phong kiến và giáo quyền",
            "Mở đường cho Cách mạng Pháp 1789"
          ],
          at: "Paris", zoom: 6
        },
        {
          kind: "people", tag: "Nhà tư tưởng", label: "Ba ngọn đèn",
          title: "Ba ngọn đèn của Khai sáng Pháp",
          /* TOC.v1 Node 2 (b): nguyên văn 3 dòng; *...* = in nghiêng, **...** = in đậm */
          points: [
            "**Voltaire:** Chủ trương chống lại chế độ quân chủ chuyên chế và sự độc đoán của giáo hội, đề cao tự do tư tưởng, tự do ngôn luận và tinh thần khoan dung.",
            "**Montesquieu:** Tác phẩm *Tinh thần pháp luật* – Đề xuất thuyết Tam quyền phân lập nhằm kiểm soát quyền lực nhà nước.",
            "**Rousseau:** Tác phẩm *Khế ước xã hội* – Khẳng định chủ quyền thuộc về nhân dân, nhà nước là sản phẩm của khế ước xã hội."
          ],
          people: [
            { img: "images/p-voltaire.jpg", name: "Voltaire", years: "1694–1778" },
            { img: "images/p-montesquieu.jpg", name: "Montesquieu", years: "1689–1755" },
            { img: "images/p-rousseau.jpg", name: "J.-J. Rousseau", years: "1712–1778" }
          ],
          bg: "images/bg-encyclopedie.jpg",
          bgCap: "Tranh khắc mở đầu bộ Bách khoa toàn thư của Diderot (C.-N. Cochin, 1772)",
          at: "Paris", zoom: 5.5
        },
        {
          /* TOC.v1 Node 3 (b): nguyên văn 2 ý của người dùng, không chỉnh sửa (giữ cả "(cần làm rõ)", "sau hơn");
             phương án bám nguồn (Phan Thiết, Đảng Xã hội Pháp) xem TOC.v1 Node 3 (f), người dùng tự quyết */
          kind: "story", tag: "Con đường tiếp cận", label: "Tiếp cận bằng cách nào",
          title: "Người tiếp cận tư tưởng Khai sáng bằng cách nào",
          points: [
            "Ngay từ khi còn học ở Trường Bản Xứ ở Vinh (cần làm rõ) và Trường Quốc học Huế, Nguyễn Tất Thành đã lần đầu tiếp xúc với các tác phẩm của các nhà tư tưởng Khai sáng Pháp ở thế kỷ XVIII.",
            "Trong thời gian hoạt động tại Pháp, Người có điều kiện nghiên cứu sau hơn các học thuyết này, tham gia các câu lạc bộ chính trị và tranh luận trực tiếp về các giá trị dân chủ."
          ],
          quote: {
            text: "Khi tôi độ mười ba tuổi, lần đầu tiên tôi được nghe ba chữ Pháp: Tự do, Bình đẳng, Bác ái… Và từ thuở ấy, tôi rất muốn làm quen với nền văn minh Pháp, muốn tìm xem những gì ẩn đằng sau những chữ ấy.",
            src: "Nguyễn Ái Quốc trả lời báo Ogoniok, 1923"
          },
          qfirst: true,
          img: "images/HCM_1.png",
          bg: "images/bg-quoc-hoc-hue.jpg",
          bgCap: "Một lớp học ở trường Quốc học Huế (ảnh tư liệu thời Pháp thuộc)",
          at: "Huế", zoom: 4.5
        },
        {
          /* TOC.v1 Node 4 (b) */
          kind: "story", tag: "Sự kế thừa", label: "Dân làm chủ, pháp quyền",
          title: "Kế thừa: nhân dân làm chủ, nhà nước pháp quyền",
          points: [
            "Quyền lực thuộc về nhân dân: nước ta là nước dân chủ, mọi quyền bính của nhân dân (tinh thần “chủ quyền nhân dân” của Rousseau).",
            "Nhà nước pháp quyền, đề cao Hiến pháp và pháp luật: “Trăm điều phải có thần linh pháp quyền”.",
            "Tự do, bình đẳng là quyền tự nhiên, không ai được xâm phạm."
          ],
          quote: {
            text: "Bảy xin Hiến pháp ban hành,\nTrăm điều phải có thần linh pháp quyền.",
            src: "Nguyễn Ái Quốc, Việt Nam yêu cầu ca (1922)"
          },
          bg: "images/bg-hien-phap-1946.jpg", bgDim: true,
          bgCap: "Hiến pháp nước Việt Nam Dân chủ Cộng hòa năm 1946 (Cục Văn thư và Lưu trữ nhà nước)",
          at: "Hà Nội", zoom: 4.5
        },
        {
          /* TOC.v1 Node 5 (b): nguyên văn 2 ý của người dùng */
          kind: "story", tag: "Sự phát huy", label: "Vượt lên",
          title: "Vượt lên giới hạn của cách mạng tư sản",
          points: [
            "Các nhà khai sáng Pháp mới chỉ dừng lại ở giải phóng giai cấp tư sản và quyền tự do cá nhân trên danh nghĩa.",
            "Hồ Chí Minh mở rộng quyền con người thành quyền dân tộc tự quyết, gắn độc lập dân tộc với tự do, hạnh phúc."
          ],
          quote: {
            text: "Cách mệnh Pháp cũng như cách mệnh Mỹ, nghĩa là cách mệnh tư bản, cách mệnh không đến nơi, tiếng là cộng hoà và dân chủ, kỳ thực trong thì nó tước lục công nông, ngoài thì nó áp bức thuộc địa.",
            src: "Nguyễn Ái Quốc, Đường Kách mệnh (1927)"
          },
          bg: "images/bg-liberte.jpg",
          bgCap: "Nữ thần Tự do dẫn dắt nhân dân, Eugène Delacroix (1830)",
          at: "Hà Nội", zoom: 2.6
        }
      ]
    },

    /* ================= MỤC 2 · VĂN HỌC (~1.5 phút) ================= */
    {
      id: "van-hoc",
      rail: "Văn học phương Tây",
      kicker: "Văn học phương Tây",
      place: "London · Paris",
      title: "Giá trị nhân văn trong văn học phương Tây",
      bg: "images/bg-cosette.jpg",
      bgCap: "Cô bé Cosette — minh họa Những người khốn khổ, Émile Bayard (1862)",
      map: { at: "Paris", center: [14, 51], zoom: 3.4, hl: [826, 250], pins: ["London", "Paris"] },
      items: [
        {
          /* TOC.v1 Mục 2 Node 1: chỉ tiêu đề (a) + nguyên văn 2 ý (b); (c) không đưa lên slide.
             Ảnh theo (d): Hugo, Shakespeare, Tolstoy. Bản đồ theo (e): Paris, thu xa thấy cả London */
          kind: "people", tag: "Tiếp cận", label: "Con đường tiếp cận",
          title: "Con đường tiếp cận",
          points: [
            "Khi còn ở châu Âu, Nguyễn Ái Quốc vừa làm thuê vừa dành thời gian tại các thư viện để đọc kiệt tác văn học phương Tây.",
            "Người đặc biệt yêu thích Victor Hugo, đọc vở kịch của Shakespeare, và các tác phẩm của đại văn hào Lev Tolstoy."
          ],
          people: [
            { img: "images/p-hugo.jpg", name: "Victor Hugo", years: "1802–1885" },
            { img: "images/p-shakespeare.jpg", name: "Shakespeare", years: "1564–1616" },
            { img: "images/p-tolstoy.jpg", name: "Lev Tolstoy", years: "1828–1910" }
          ],
          bg: "images/bg-sainte-genevieve.jpg",
          bgCap: "Phòng đọc Thư viện Sainte-Geneviève, Paris (ảnh: Marie-Lan Nguyen, CC BY 2.0 fr)",
          at: "Paris", center: [4.4, 50.1], zoom: 5
        },
        {
          /* TOC.v1 Mục 2 Node 2: chỉ tiêu đề (a) + nguyên văn 2 ý (b); (c) không đưa lên slide.
             Ảnh theo (d): Hugo, Tolstoy; nền dùng nền chung của phần (bg-cosette). Bản đồ (e): Paris */
          kind: "people", tag: "Giá trị", label: "Giá trị trong các tác phẩm",
          title: "Giá trị trong các tác phẩm",
          points: [
            "Các tác phẩm đại diện cho những góc nhìn về xã hội lúc bấy giờ, mang giá trị nhân đạo, sự cảm thông với người yếu thế và phê phán sự bất công.",
            "Những giá trị này được tìm thấy trong tư tưởng của Người ở tinh thần nhân ái, sự quan tâm đến nhân dân lao động và tầng lớp bị áp bức."
          ],
          people: [
            { img: "images/p-hugo.jpg", name: "Victor Hugo", years: "1802–1885" },
            { img: "images/p-tolstoy.jpg", name: "Lev Tolstoy", years: "1828–1910" }
          ],
          at: "Paris", zoom: 6
        }
      ]
    },

    /* ================= MỤC 3 · DÂN CHỦ, NHÂN QUYỀN, TỰ DO (~2.5 phút) ================= */
    {
      id: "nhan-quyen",
      rail: "Dân chủ, nhân quyền, tự do",
      kicker: "Dân chủ · nhân quyền · tự do",
      place: "Philadelphia · Paris · Hà Nội",
      title: "Tư tưởng dân chủ, nhân quyền, tự do",
      motto: ["Liberté", "Égalité", "Fraternité"],
      lead: "Hai bản tuyên ngôn của cách mạng Mỹ và Pháp, và cách Người “suy rộng ra”.",
      bg: "images/bg-bastille.jpg",
      bgCap: "Phá ngục Bastille, 14/7/1789 (tranh của J.-P. Houël)",
      map: { at: "Paris", center: [-32, 42], zoom: 2.2, hl: [840, 250], pins: ["Philadelphia", "Paris"] },
      items: [
        {
          /* QĐ tạm 5: chỉ nhắc "từng đặt chân đến nước Mỹ", không chi tiết Boston/Brooklyn/Garvey */
          kind: "story", tag: "Tuyên ngôn Mỹ", label: "Tuyên ngôn Độc lập Mỹ",
          title: "Tuyên ngôn Độc lập Mỹ",
          text: "Philadelphia, 4/7/1776: mười ba thuộc địa Bắc Mỹ tuyên bố tách khỏi Anh; Thomas Jefferson soạn thảo.",
          points: [
            "Lần đầu quyền tự nhiên của con người làm cơ sở cho độc lập quốc gia",
            "Nguyễn Tất Thành từng đặt chân đến nước Mỹ (1912–1913)"
          ],
          quote: {
            text: "Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hoá cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc.",
            src: "Bản dịch trong Tuyên ngôn Độc lập Việt Nam, 2/9/1945"
          },
          img: "images/p-jefferson.jpg", imgName: "Thomas Jefferson",
          bg: "images/bg-us-declaration.jpg",
          bgCap: "Tuyên ngôn độc lập, tranh của John Trumbull (1819)",
          at: "Philadelphia", zoom: 6
        },
        {
          kind: "story", tag: "Tuyên ngôn Pháp", label: "Nhân quyền và Dân quyền",
          title: "Tuyên ngôn Nhân quyền và Dân quyền",
          text: "Paris, 26/8/1789, sau khi phá ngục Bastille.",
          points: [
            "Quyền tự nhiên: tự do, tài sản, an ninh, chống áp bức",
            "Chủ quyền thuộc về quốc gia; khẩu hiệu Tự do, Bình đẳng, Bác ái"
          ],
          quote: {
            text: "Người ta sinh ra tự do và bình đẳng về quyền lợi; và phải luôn luôn được tự do và bình đẳng về quyền lợi.",
            src: "Điều 1, bản dịch trong Tuyên ngôn Độc lập 1945 (văn bản ghi “năm 1791”)"
          },
          bg: "images/bg-ddhc.jpg",
          bgCap: "Tuyên ngôn Nhân quyền và Dân quyền, tranh của J.-J.-F. Le Barbier (khoảng 1789)",
          at: "Paris", zoom: 7
        },
        {
          /* QĐ tạm 6: Bản yêu sách 1919 gộp vào nút này; không nêu tranh luận người soạn thảo */
          kind: "story", tag: "Kế thừa", label: "Đến Ba Đình",
          title: "Từ hai bản tuyên ngôn đến Ba Đình",
          points: [
            "Bản yêu sách 8 điểm gửi tới Hội nghị Versailles (1919), ký tên Nguyễn Ái Quốc",
            "Tuyên ngôn Độc lập 2/9/1945 mở đầu bằng lời hai bản tuyên ngôn",
            "Dùng chính lý lẽ ấy tố cáo thực dân “lợi dụng lá cờ tự do, bình đẳng, bác ái”"
          ],
          quote: {
            text: "Suy rộng ra, câu ấy có ý nghĩa là: tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do.",
            src: "Hồ Chí Minh, Tuyên ngôn Độc lập, 2/9/1945"
          },
          img: "images/HCM_3.png",
          bg: "images/bg-ba-dinh-1945.jpg",
          bgCap: "Lễ đọc Tuyên ngôn Độc lập, Quảng trường Ba Đình, 2/9/1945",
          at: "Hà Nội", zoom: 5
        }
      ]
    },

    /* ================= MỤC 4 · THIÊN CHÚA GIÁO (~2 phút) ================= */
    {
      id: "thien-chua",
      rail: "Thiên Chúa giáo",
      kicker: "Thiên Chúa giáo",
      place: "Roma · Vatican",
      title: "Thiên Chúa giáo",
      lead: "Một nền tảng của văn hóa phương Tây: lòng bác ái, tinh thần hy sinh vì con người.",
      bg: "images/bg-vatican.jpg",
      bgCap: "Quảng trường Thánh Phêrô, tranh khắc của G. B. Piranesi (1772)",
      map: { at: "Roma · Vatican", zoom: 6, hl: [380], pins: ["Roma · Vatican"] },
      items: [
        {
          kind: "story", tag: "Kitô giáo", label: "Yêu thương và hy sinh",
          title: "Tình yêu thương và sự hy sinh",
          points: [
            "Mọi người đều là con của Chúa, không phân biệt sang hèn, màu da",
            "Đề cao lòng bác ái, tình yêu thương giữa người với người",
            "Chúa Giê-su: biểu tượng hy sinh để cứu chuộc con người khổ đau"
          ],
          quote: {
            text: "Gần 20 thế kỷ trước, một vị thánh nhân đã ra đời. Cả đời Người chỉ lo cứu thế độ dân, hy sinh cho tự do, bình đẳng.",
            src: "Hồ Chí Minh, thư nhân lễ Giáng sinh, 24/12/1946"
          },
          bg: "images/bg-sermon-mount.jpg",
          bgCap: "Bài giảng trên núi, Carl Bloch (1877)",
          at: "Roma · Vatican", zoom: 8
        },
        {
          /* QĐ tạm 1: giữ câu "lòng nhân ái cao cả", ghi nguồn theo Trần Dân Tiên 1949 */
          kind: "story", tag: "Trích dẫn", label: "Một học thuyết",
          title: "Một học thuyết, một ưu điểm",
          quote: {
            text: "Học thuyết của Khổng Tử có ưu điểm của nó là sự tu dưỡng đạo đức cá nhân. Tôn giáo Giêsu có ưu điểm của nó là lòng nhân ái cao cả.",
            src: "Theo Trần Dân Tiên (bản tiếng Trung, 1949)"
          },
          qfirst: true,
          points: [
            "Khổng Tử: tu dưỡng đạo đức",
            "Giê-su: lòng nhân ái",
            "Mác: phương pháp làm việc biện chứng"
          ],
          at: "Roma · Vatican", zoom: 8
        },
        {
          /* QĐ tạm 2: tên phương án 1; chứng cứ phê phán lấy từ Bản án chế độ thực dân Pháp */
          kind: "story", tag: "Góc nhìn biện chứng", label: "Kẻ mượn danh Chúa",
          title: "Phân định Chúa và kẻ mượn danh Chúa",
          points: [
            "Đề cao lòng nhân ái của Chúa Giê-su; đoàn kết lương giáo, tôn trọng tự do tín ngưỡng",
            "Vạch trần kẻ mượn danh Chúa làm tay sai xâm lược, chiếm ruộng đất",
            "Thước đo: việc làm có hợp lòng bác ái và lợi ích dân tộc hay không"
          ],
          quote: {
            text: "Đấy là những hành động phúc âm mà các “Cha nhà ta” nỗ lực làm hằng ngày và bao giờ cũng là nhân danh Chúa cả.",
            src: "Nguyễn Ái Quốc, Bản án chế độ thực dân Pháp"
          },
          bg: "images/bg-tourane-1858.jpg", bgDim: true,
          bgCap: "Tàu chiến Pháp tấn công Đà Nẵng, 1858",
          at: "Hà Nội", zoom: 4.5
        }
      ]
    },

    /* ================= KẾT LUẬN (~1 phút) ================= */
    {
      id: "ket-luan",
      kind: "end",
      rail: "Kết luận",
      kicker: "Kết luận",
      place: "Hà Nội",
      title: "Chọn lọc, không sao chép",
      lead: "Phương Tây là một nguồn, không phải điểm đến.",
      bg: "images/bg-tours-1920.jpg",
      bgCap: "Nguyễn Ái Quốc phát biểu tại Đại hội Tours, 12/1920",
      portrait: "images/HCM_4.png",
      map: { at: "Hà Nội", zoom: 1.2, hl: [704], pins: ["Hà Nội"] },
      items: [
        {
          kind: "summary", tag: "Tổng kết", label: "Lấy cái hay",
          title: "Lấy cái hay, đặt vào lợi ích dân tộc",
          grid: [
            { b: "Khai sáng & tuyên ngôn", t: "Ngôn ngữ của quyền con người, nâng lên thành quyền dân tộc." },
            { b: "Văn học nhân đạo", t: "Thương người bị áp bức; lối viết giản dị." },
            { b: "Thiên Chúa giáo", t: "Tấm gương bác ái; phân biệt đạo với kẻ lợi dụng đạo." },
            { b: "Cách làm chung", t: "So sánh, phê phán, chọn lọc; thước đo là độc lập dân tộc, hạnh phúc nhân dân." }
          ]
        },
        {
          kind: "quote", tag: "Lời kết", label: "Cảm ơn",
          text: "Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi, đấy là tất cả những điều tôi muốn, đấy là tất cả những điều tôi hiểu.",
          src: "Nguyễn Ái Quốc, 1920",
          coda: "Cảm ơn thầy cô và các bạn đã lắng nghe."
        }
      ]
    }
  ]
};
