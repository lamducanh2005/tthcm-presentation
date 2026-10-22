/* Nội dung thuyết trình — prototype 1 · v4 (theo khung .job/TOC.v1.md; Mục 3, Mục 4 theo .job/TOC.draft.md).
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
     noTag:  true (ở phần) → ẩn tag cạnh kicker cho mọi nút của phần (nhãn ở dòng bố cục vẫn giữ)
     noFlowTag: true (ở phần) → ẩn luôn chữ tag nhỏ trên nhãn nút ở dòng bố cục
     noKicker: true → ẩn cả dòng kicker + tag ở bảng nội dung (nhãn ở dòng bố cục vẫn giữ)
     at:     địa danh camera bản đồ đáp xuống (xem places); khác nơi trước thì có hải trình
     from:   địa danh xuất phát của hải trình (mặc định là địa danh của bước trước)
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
          /* Node 1 (TOC.draft): gộp nút "Bến Nhà Rồng" cũ; hải trình Bến Nhà Rồng (Sài Gòn) → cảng Marseille */
          kind: "story", noKicker: true, tag: "Ra đi", label: "Tìm đường cứu nước",
          title: "Ra đi tìm đường cứu nước",
          points: [
            "Các phong trào yêu nước trong nước (Cần Vương, Đông Du, Duy Tân) lần lượt thất bại; đất nước khủng hoảng đường lối",
            "Ngày 5/6/1911, Nguyễn Tất Thành lấy tên Văn Ba, làm phụ bếp trên tàu Amiral Latouche-Tréville, rời Bến cảng Nhà Rồng sang Pháp"
          ],
          quote: {
            text: "Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.",
            src: "Nguyễn Tất Thành khi nói về mục đích ra đi"
          },
          from: "Sài Gòn", at: "Marseille", center: [99, 24], zoom: 1.5
        },
        {
          /* Node 2 (TOC.draft, mới). QĐ tạm 10: gộp node "Luận đề" cũ thành dòng nhấn cuối nút này.
             Không hải trình; camera phóng vào châu Âu */
          kind: "idea", noKicker: true, tag: "Bôn ba", label: "Những năm bôn ba",
          title: "Những năm bôn ba",
          points: [
            "1911–1917: làm thuê trên tàu biển và trên đất khách; đi qua châu Phi, sang Mỹ, sang Anh, cuối 1917 trở lại Pháp",
            "Đi tới đâu cũng vừa làm vừa tự học, tiếp xúc trực tiếp một nền văn hóa, tư tưởng phương Tây hoàn toàn mới",
            "Chính những tinh hoa văn hóa, tư tưởng phương Tây ấy đã góp phần hình thành nên tư tưởng của Người"
          ],
          bg: "images/bg-le-havre-1910.jpg",
          bgCap: "Tàu viễn dương rời cảng Le Havre, 1910 (Agence Rol, ảnh minh họa bối cảnh)",
          center: [6, 48], zoom: 4
        }
      ]
    },

    /* ================= MỤC 1 · TRIẾT HỌC KHAI SÁNG PHÁP (~2.5 phút) ================= */
    {
      id: "khai-sang",
      rail: "Triết học Khai sáng Pháp",
      kicker: "Triết học Khai sáng Pháp",
      noTag: true,
      title: "Triết học Khai sáng Pháp",
      lead: "Hồ Chí Minh tìm hiểu và tiếp xúc với những tư tưởng tiến bộ mới trong thời kỳ Khai sáng của phương Tây.",
      bg: "images/bg-geoffrin.jpg",
      bgCap: "Buổi đọc sách ở salon của bà Geoffrin (tranh của A. C. G. Lemonnier, 1812)",
      map: { at: "Paris", center: [2.6, 46.6], zoom: 5, hl: [250], pins: ["Paris", "Genève", "Bordeaux"] },
      items: [
        {
          /* camera đứng yên ở Pháp (Paris, zoom 6) suốt cả mục */
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
          at: "Paris", zoom: 6
        },
        {
          /* TOC.v1 Node 3 (b): nguyên văn 2 ý của người dùng, không chỉnh sửa (giữ cả "(cần làm rõ)", "sau hơn");
             phương án bám nguồn (Phan Thiết, Đảng Xã hội Pháp) xem TOC.v1 Node 3 (f), người dùng tự quyết */
          kind: "story", tag: "Con đường tiếp cận", label: "Tiếp cận bằng cách nào",
          title: "Tiếp cận tư tưởng Khai sáng",
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
          at: "Paris", zoom: 6
        },
        {
          /* TOC.v1 Node 4 (b) */
          kind: "story", tag: "Sự kế thừa", label: "Dân làm chủ, pháp quyền",
          title: "Sự kế thừa tư tưởng",
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
          at: "Paris", zoom: 6
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
          at: "Paris", zoom: 6
        }
      ]
    },

    /* ================= MỤC 2 · VĂN HỌC (~1.5 phút) ================= */
    {
      id: "van-hoc",
      rail: "Văn học phương Tây",
      kicker: "Văn học phương Tây",
      noTag: true, noFlowTag: true,
      title: "Giá trị nhân văn trong văn học phương Tây",
      lead: "Hồ Chí Minh tiếp xúc với những giá trị nhân văn, nhân đạo thông qua những tác phẩm văn học phương Tây đương thời.",
      bg: "images/bg-cosette.jpg",
      bgCap: "Cô bé Cosette — minh họa Những người khốn khổ, Émile Bayard (1862)",
      map: { at: "Paris", center: [14, 51], zoom: 3.4, hl: [826, 250], pins: ["London", "Paris"] },
      items: [
        {
          /* TOC.v1 Mục 2 Node 1: chỉ tiêu đề (a) + nguyên văn 2 ý (b); (c) không đưa lên slide.
             Ảnh theo (d): Hugo, Shakespeare, Tolstoy. Bản đồ theo (e): Paris, thu xa thấy cả London */
          kind: "people", tag: "Tiếp cận", label: "Con đường tiếp cận",
          title: "Văn học phương Tây với Nguyễn Ái Quốc",
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

    /* ================= MỤC 3 · TƯ TƯỞNG TỰ DO, DÂN CHỦ (~2 phút) — theo TOC.draft ================= */
    {
      id: "nhan-quyen",
      rail: "Tư tưởng tự do, dân chủ",
      kicker: "Tư tưởng tự do, dân chủ",
      noTag: true, noFlowTag: true,
      title: "Tư tưởng tự do, dân chủ",
      lead: "Hồ Chí Minh kế thừa và phát triển tư tưởng tự do, dân chủ từ các cuộc cách mạng của Mỹ và Pháp.",
      /* không ảnh nền; tượng Nữ thần Tự do (png tách nền) nổi bên phải ở bước mở phần */
      hero: "images/NTTD.png",
      bgCap: "Tượng Nữ thần Tự do, món quà nước Pháp tặng nước Mỹ",
      map: { at: "Paris", center: [-32, 42], zoom: 2.2, hl: [840, 250], pins: ["Philadelphia", "Paris", "Versailles", "Hà Nội"] },
      items: [
        {
          /* TOC.draft Mục 3 Node 1: nguyên văn 2 ý (thêm chữ "được") */
          kind: "story", tag: "Tuyên ngôn Mỹ", label: "Tuyên ngôn Độc lập Mỹ",
          title: "Tuyên ngôn Độc lập của Mỹ",
          points: [
            "Tháng 7 năm 1776, mười ba thuộc địa của Anh ở Bắc Mỹ tuyên bố độc lập.",
            "Bản tuyên ngôn độc lập của Mỹ đánh dấu lần đầu tiên quyền cơ bản của con người được đưa làm nền tảng lập quốc."
          ],
          /* tranh minh họa các nhà lập quốc Mỹ (png tách nền, nằm ngang) thay khung chân dung Jefferson; giữ ảnh nền Trumbull */
          hero: "images/USA.png", heroWide: true,
          bg: "images/bg-us-declaration.jpg",
          bgCap: "Tuyên ngôn độc lập, tranh của John Trumbull (1819)",
          at: "Philadelphia", zoom: 6
        },
        {
          /* TOC.draft Mục 3 Node 2: sửa "tháng 8" → "tháng 7" (Bastille bị phá 14/7/1789), "Bastile" → "Bastille" */
          kind: "story", tag: "Tuyên ngôn Pháp", label: "Cách mạng Pháp",
          title: "Tuyên ngôn của Pháp",
          points: [
            "Tháng 7 năm 1789, nhà tù Bastille bị phá, cách mạng Pháp bùng nổ.",
            "Đó là thời điểm mà khẩu hiệu Tự do – Bình đẳng – Bác ái được phổ biến rộng rãi."
          ],
          /* tranh minh họa CMP.png (png tách nền) đặt giữa vùng phải; ảnh nền Bastille dịch lên để lộ cảnh đám đông phía dưới */
          hero: "images/CMP.png", heroWide: true, heroCenter: true,
          bg: "images/bg-bastille.jpg", bgShift: "0, -13vh",
          bgCap: "Phá ngục Bastille, 14/7/1789 (tranh của J.-P. Houël)",
          at: "Paris", zoom: 7
        },
        {
          /* TOC.draft Mục 3 Node 3: 3 ý nguyên văn (người dùng bỏ câu 13 tuổi và ý "đặt chân đến nước Mỹ") */
          kind: "story", tag: "Bản yêu sách", label: "Bản yêu sách",
          title: "Bản yêu sách của nhân dân An Nam",
          points: [
            "Năm 1919, Bản yêu sách của nhân dân An Nam gửi tới Hội nghị Versailles, ký tên Nguyễn Ái Quốc.",
            "Bản yêu sách dùng chính ngôn ngữ dân quyền của phương Tây để đòi tự do ngôn luận, báo chí, hội họp, đi lại cho dân thuộc địa.",
            "Bản yêu sách không được đáp lại. Người nhận ra rằng những lời hứa tự do của các nước lớn không dành cho dân thuộc địa."
          ],
          /* ảnh chính: tờ Bản yêu sách (khung giấy imgDoc, lệch trái); nền: Nguyễn Ái Quốc tại Đại hội Tours,
             dịch sang phải để Người đứng gần lề phải (ảnh 480px → chìm sâu bgDim) */
          img: "images/BYS.jpg", imgName: "Bản yêu sách của nhân dân An Nam", imgDoc: true,
          bg: "images/HCM_Tua.jpg", bgDim: true, bgShift: "28vw, 0",
          bgCap: "Nguyễn Ái Quốc phát biểu tại Đại hội Tours, 12/1920",
          at: "Versailles", zoom: 7
        },
        {
          /* TOC.draft Mục 3 Node 4: câu trích đúng nguyên văn Tuyên ngôn ("những lẽ phải") */
          kind: "story", tag: "Tuyên ngôn Độc lập", label: "Tuyên ngôn Độc lập",
          title: "Tuyên ngôn Độc lập",
          points: [
            "Ngày 2/9/1945, Tuyên ngôn Độc lập của nước Việt Nam Dân chủ Cộng hòa mở đầu bằng lời của chính hai bản tuyên ngôn Mỹ và Pháp."
          ],
          quote: {
            text: "Đó là những lẽ phải không ai chối cãi được.",
            src: "Hồ Chí Minh, Tuyên ngôn Độc lập, 2/9/1945"
          },
          /* ảnh chính: HCM_5 (png tách nền, đọc Tuyên ngôn bên micro) góc phải dưới; nền: Ba Đình nâng lên để lộ lễ đài,
             tờ Tuyên ngôn (bg2) to ở dải trên, hiện đủ dòng tiêu đề */
          hero: "images/HCM_5.png", heroSmall: true,
          bg: "images/bg-ba-dinh-1945.jpg", bgShift: "0, -12vh",
          bg2: "images/TNDLVN.jpg",
          bgCap: "Lễ đọc Tuyên ngôn Độc lập, Quảng trường Ba Đình, 2/9/1945 · Bản Tuyên ngôn Độc lập",
          at: "Hà Nội", zoom: 5
        },
        {
          /* TOC.draft Mục 3 Node 5: 3 ý nguyên văn; câu "Suy rộng ra…" tách thành câu trích */
          kind: "story", tag: "Kế thừa và phát huy", label: "Kế thừa và phát huy",
          title: "Sự kế thừa và phát huy",
          points: [
            "Người tiếp thu những tư tưởng tự do, dân chủ phương Tây, và dùng chính lý lẽ ấy để buộc tội thực dân.",
            "Người cũng chỉ ra giới hạn: đó là “cách mệnh không đến nơi”, tiếng là cộng hòa, dân chủ, nhưng trong thì bóc lột công nông, ngoài thì áp bức thuộc địa.",
            "Từ quyền con người, Người nâng lên thành quyền dân tộc."
          ],
          quote: {
            text: "Suy rộng ra, câu ấy có ý nghĩa là: tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do.",
            src: "Hồ Chí Minh, Tuyên ngôn Độc lập, 2/9/1945"
          },
          bg: "images/bg-ba-dinh-1945.jpg",
          bgCap: "Lễ đọc Tuyên ngôn Độc lập, Quảng trường Ba Đình, 2/9/1945",
          at: "Hà Nội", zoom: 5
        }
      ]
    },

    /* ================= MỤC 4 · THIÊN CHÚA GIÁO (~2 phút) — theo TOC.draft ================= */
    {
      id: "thien-chua",
      rail: "Thiên Chúa giáo",
      kicker: "Thiên Chúa giáo",
      noTag: true, noFlowTag: true,
      title: "Thiên Chúa giáo",
      lead: "Nền tảng văn hóa phương Tây: Kitô giáo với lòng bác ái cao cả và tinh thần hy sinh vì con người.",
      bg: "images/bg-vatican.jpg",
      bgCap: "Quảng trường Thánh Phêrô, tranh khắc của G. B. Piranesi (1772)",
      map: { at: "Roma · Vatican", zoom: 6, hl: [380], pins: ["Roma · Vatican", "Hà Nội"] },
      items: [
        {
          /* TOC.draft Mục 4 Node 1: nguyên văn 3 ý; bản đồ đến Roma · Vatican */
          kind: "story", tag: "Kitô giáo", label: "Kitô giáo",
          title: "Kitô giáo",
          points: [
            "Mọi con người đều là con của Chúa, không phân biệt sang hèn hay màu da.",
            "Đề cao lòng bác ái, tình yêu thương giữa người với người.",
            "Chúa Giê-su: biểu tượng của sự hi sinh để cứu chuộc và giải phóng những con người khổ đau."
          ],
          bg: "images/bg-sermon-mount.jpg",
          bgCap: "Bài giảng trên núi, Carl Bloch (1877)",
          at: "Roma · Vatican", zoom: 8
        },
        {
          /* TOC.draft Mục 4 Node 2: nguyên văn 2 ý */
          kind: "story", tag: "Con đường tiếp cận", label: "Con đường tiếp cận",
          title: "Con đường tiếp cận",
          points: [
            "Thiên Chúa giáo đã có mặt ở Việt Nam từ thế kỷ XVI.",
            "Sang phương Tây, Người sống giữa một xã hội thấm đẫm văn hóa Kitô giáo: nhà thờ, lễ Giáng sinh, Kinh Thánh trong văn chương."
          ],
          bg: "images/bg-vatican.jpg",
          bgCap: "Quảng trường Thánh Phêrô, tranh khắc của G. B. Piranesi (1772)",
          at: "Roma · Vatican", zoom: 8
        },
        {
          /* TOC.draft Mục 4 Node 3: câu Khổng Tử – Giê-su làm câu trích chính (nguồn theo QĐ tạm 1) */
          kind: "story", tag: "Nhận định", label: "Nhận định của Người",
          title: "Nhận định của Hồ Chí Minh",
          quote: {
            text: "Học thuyết Khổng Tử có ưu điểm là sự tu dưỡng đạo đức cá nhân. Tôn giáo Giê-su có ưu điểm là lòng nhân ái cao cả… Tôi cố gắng làm người học trò nhỏ của các vị ấy.",
            src: "Theo Trần Dân Tiên (bản tiếng Trung, 1949)"
          },
          qfirst: true,
          points: [
            "“Chúa Giê-su dạy: Đạo đức là bác ái.”",
            "Người không nhìn tôn giáo bằng lăng kính giáo điều, mà bằng con mắt văn hóa – đạo đức, chắt lọc cái tốt ở mỗi học thuyết."
          ],
          at: "Roma · Vatican", zoom: 8
        },
        {
          /* TOC.draft Mục 4 Node 4: nguyên văn 3 ý; sửa "đóng thành cách mạng" → "thành hành động cách mạng" */
          kind: "story", tag: "Kế thừa và phát huy", label: "Kế thừa và phát huy",
          title: "Kế thừa và phát huy",
          points: [
            "Hồ Chí Minh đã kế thừa lòng nhân ái, đức hi sinh, hết lòng phụng sự cho nước nhà.",
            "Người đã chuyển hóa lòng nhân ái, đức hi sinh thành hành động cách mạng, thực hiện giải phóng con người gắn với giải phóng dân tộc khỏi áp bức, bóc lột.",
            "Người cũng phân định rạch ròi giữa giáo lý tốt đẹp và kẻ thực dân mượn danh tôn giáo, luôn chủ trương “Tín ngưỡng tự do, lương giáo đoàn kết”."
          ],
          bg: "images/HCM_bishop.png", bgDim: true,
          bgCap: "Chủ tịch Hồ Chí Minh với các chức sắc tôn giáo",
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
      noTag: true, noFlowTag: true,
      /* trang đầu kết luận nhắc lại đúng tên đề tài ở bìa */
      title: "Tư tưởng và văn hóa phương Tây",
      lead: "góp phần hình thành tư tưởng Hồ Chí Minh",
      /* không ảnh nền, chỉ chân dung HCM_4 */
      portrait: "images/HCM_4.png",
      map: { at: "Hà Nội", zoom: 1.2, hl: [704], pins: ["Hà Nội"] },
      items: [
        {
          /* TOC.draft Kết luận: 4 ý nguyên văn; sửa "tư do" → "tự do", "những văn" → "những giá trị ấy" */
          kind: "story", tag: "Tổng kết", label: "Tổng kết",
          title: "Tổng kết",
          points: [
            "Trong thời gian bôn ba các nước châu Âu, Bác đã có thời gian tiếp xúc và học hỏi văn hóa và tư tưởng mới mẻ của người phương Tây.",
            "Bác đã tiếp thu có chọn lọc những tinh hoa văn hóa tư tưởng của họ, từ triết học khai sáng, những tư tưởng tự do tiến bộ cho đến văn học và tôn giáo.",
            "Không chỉ học hỏi, Bác còn phát triển những giá trị ấy lên một tầm cao mới, phù hợp cho con đường cách mạng của dân tộc Việt Nam.",
            "Những tư tưởng, văn hóa phương Tây ấy đóng góp một phần không nhỏ trong việc hình thành nên con người vĩ đại của cả dân tộc."
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
