# Prototype 1 — Hải trình · v4

**Đề tài:** Tư tưởng và văn hóa phương Tây góp phần hình thành tư tưởng Hồ Chí Minh

v4 giữ nguyên cơ chế và nội dung của v3, chỉ thay Mục 3 (Tư tưởng tự do, dân chủ) và Mục 4 (Thiên Chúa giáo) theo `.job/TOC.draft.md`. Các phần khác vẫn theo khung `.job/TOC.v1.md`.

## Ý tưởng

Cả bài là một màn hình liền mạch trên nền giấy sáng, chia ba vùng cố định:

- **Bên trái: bản đồ.** Bản đồ thế giới (d3 + Natural Earth) mờ dần sang phải. Camera bay tới địa danh của từng bước. Chữ nằm trên bản đồ, có lớp giấy mờ phía sau để dễ đọc. Chỉ ghim đang đến mới hiện tên.
- **Bên phải: ảnh nền chìm.** Tranh, bưu ảnh, ảnh tư liệu mờ dần về trái và xuống dưới. Khi có nhân vật, ảnh nền mờ bớt và chân dung khung vòm hiện rõ phía trước. Ảnh độ phân giải thấp (`bgDim`) được chìm sâu hơn.
- **Dưới đáy: dòng bố cục.** Trục chính gồm 6 phần, không ghi năm, không ghi "Ý N" hay "Mục N". Đến phần nào thì nhánh của phần ấy rẽ xuống; mỗi nút nhánh là một Node của TOC, tức một bước trình chiếu.

**Hải trình:** mỗi lần đổi địa danh, một sợi dây đỏ nét đứt chạy từ A tới B cùng nhịp camera. Tới nơi thì đuôi dây rút dần về B rồi biến mất, không để lại vết. Nút "Ra đi tìm đường cứu nước" chạy một chặng duy nhất Sài Gòn → Marseille theo đường biển qua Singapore, Colombo, Aden, Suez (thuộc tính `from` của nút); nút "Những năm bôn ba" không có hải trình, camera chỉ phóng vào châu Âu.

**Bìa:** ba chân dung HCM_1 → HCM_3 → HCM_4, cao dần, chênh nhẹ, không chú thích, không ảnh nền, không dòng gợi ý phím. Kicker chỉ là "Tư tưởng Hồ Chí Minh".

**Chữ:** tiêu đề *Cormorant Garamond* (có chân), nội dung *Be Vietnam Pro* (không chân).

### Mỗi bước hiển thị gì

Một nút nhánh gồm: tiêu đề, (tùy chọn) một câu dẫn, 2–4 gạch đầu dòng ngắn và (tùy chọn) một câu trích có nguồn, đặt dưới gạch đầu dòng, viền đỏ bên trái. Với `qfirst: true` thì câu trích đứng trước. Bước đầu của mỗi phần (nút hình thoi trên trục) chỉ có tên phần và một câu dẫn.

## Điều khiển (hợp với bút trình chiếu)

| Phím | Tác dụng |
|---|---|
| `→` `↓` `Space` `PageDown` `Enter`, bấm chuột ¾ màn hình bên phải | bước tiếp |
| `←` `↑` `PageUp` `Backspace`, bấm chuột ¼ màn hình bên trái | lùi lại |
| bấm vào một nút trên dòng bố cục | nhảy tới bước đó |
| `0`–`5` | nhảy tới phần: 0 Mở đầu, 1 Khai sáng, 2 Văn học, 3 Tự do, dân chủ, 4 Thiên Chúa giáo, 5 Kết luận |
| `Home` / `End` | về đầu / tới cuối |
| `F` | bật/tắt toàn màn hình |
| lăn chuột (mỗi cú lăn = 1 bước), vuốt ngang | bước tiếp / lùi |

URL tự ghi số bước (`index.html#8`), tải lại trang vẫn đúng chỗ. Thêm `?still` để tắt hiệu ứng (dùng khi chụp ảnh kiểm tra), ví dụ `index.html?still#16`.

**Tổng cộng 26 bước.**

| Phần | Bước | Thời lượng dự kiến |
|---|---|---|
| Mở đầu (bìa + 2 node) | 1–3 | ~1 phút |
| Triết học Khai sáng Pháp (mở phần + 5 node) | 4–9 | ~2.5 phút |
| Văn học phương Tây (mở phần + 2 node) | 10–12 | ~1.5 phút |
| Tư tưởng tự do, dân chủ (mở phần + 5 node) | 13–18 | ~2 phút |
| Thiên Chúa giáo (mở phần + 4 node) | 19–23 | ~2 phút |
| Kết luận (mở phần + 2 node) | 24–26 | ~1 phút |

## Cấu trúc thư mục

```
index.html   khung trang
style.css    giao diện
app.js       camera bản đồ, hải trình, dòng bố cục rẽ nhánh, điều khiển
data.js      TOÀN BỘ nội dung chữ, địa danh, zoom, ảnh của từng phần và từng nút
vendor/      d3, topojson-client, world-50m.js (chạy offline)
images/      ảnh riêng của prototype này (nguồn: images/_credits.md)
```

Mở thẳng `index.html` bằng trình duyệt, không cần server. Font tải từ Google Fonts; mất mạng thì dùng font dự phòng.

### Sửa nội dung

Mọi nội dung nằm trong `data.js` (đầu file có chú thích từng trường). Mỗi phần có `items`, mỗi item là một nút nhánh:

- `kind`: `story` (mặc định), `idea` (câu dẫn nghiêng đỏ), `people` (nhiều chân dung), `quote` (chỉ một câu trích lớn), `summary` (lưới tổng kết).
- `title`, `text`, `points` (mảng gạch đầu dòng), `quote: { text, src }`, `qfirst`, `coda`.
- `img` hoặc `people`: chân dung khung vòm bên phải (ảnh `.png` tách nền được đặt trên nền giấy sáng, không cắt).
- Trong `points`, `text`, `coda`: `*chữ*` → in nghiêng (tên tác phẩm), `**chữ**` → in đậm; dấu `*` đơn lẻ giữ nguyên.
- `tag` / `label`: chữ nhỏ và nhãn dưới nút trên dòng bố cục (nên ngắn, ≤ 3–4 chữ).
- `at` / `zoom`: địa danh camera đáp xuống; khác bước trước thì có hải trình.
- `center`: (tùy chọn) tâm camera riêng, khi cần thu xa để thấy trọn một hải trình dài; `at` vẫn là đích của dây.
- `bg` / `bgCap` / `bgDim`: ảnh nền chìm riêng cho nút.

Các chỗ ứng với "Quyết định tạm" được đánh dấu `QĐ tạm N` trong `data.js`.

## Thay đổi so với v3

Mục 3 và Mục 4 dùng nội dung của `.job/TOC.draft.md` (người dùng soạn lại). Chữ giữ nguyên văn bản nháp, chỉ sửa mấy chỗ sau:

- Mục 3 Node 2: "Tháng 8 năm 1789" → "Tháng 7 năm 1789" (ngục Bastille bị phá 14/7/1789; tháng 8 là lúc thông qua Tuyên ngôn Nhân quyền và Dân quyền); "Bastile" → "Bastille".
- Mục 3 Node 1: thêm chữ "được" ("quyền cơ bản của con người **được** đưa làm nền tảng lập quốc").
- Mục 3 Node 4: câu trích sửa đúng nguyên văn Tuyên ngôn Độc lập: "Đó là những lẽ **phải** không ai chối cãi được."
- Mục 3 Node 5: "tư do" → "tự do".
- Mục 4 Node 4: "đức hi sinh đóng thành cách mạng" → "đức hi sinh thành hành động cách mạng" (đoán ý; người dùng kiểm tra lại).

Cách dàn trang:

- Câu trích trong bản nháp được tách thành khung trích (viền đỏ): "Đó là những lẽ phải…" (Mục 3 Node 4), "Suy rộng ra…" (Mục 3 Node 5), câu Khổng Tử – Giê-su (Mục 4 Node 3, đứng trước; nguồn giữ theo QĐ tạm 1). Không thêm câu trích nào ngoài bản nháp (bỏ câu thư Noel 1946 và câu *Bản án chế độ thực dân Pháp* của v3).
- Hải trình Mục 3: Paris → Philadelphia → Paris → Versailles → Hà Nội. Mục 4: Roma · Vatican (Node 1–3) → Hà Nội (Node 4).
- Chân dung: Jefferson (Mục 3 Node 1), HCM_1 (Node 3, Nguyễn Ái Quốc thời ở Pháp), HCM_3 (Node 4); HCM_4 để dành cho Kết luận.
- Ảnh mới `bg-versailles-1919.jpg` cho nút Bản yêu sách (xem `images/_credits.md`).
- Mục 3 Node 3 (Bản yêu sách): theo yêu cầu người dùng, bỏ câu trích "mười ba tuổi" và ý "Người đã đặt chân đến nước Mỹ…"; còn 3 ý.
- Mục 3, Mục 4 ẩn chữ tag nhỏ trên dòng bố cục (`noFlowTag`) vì tag và nhãn gần như trùng nhau.

## Thay đổi so với v2 (đã có từ v3)

- Thay toàn bộ nội dung theo TOC.v1: 6 phần, 17 node (v2: 9 phần, 42 bước).
- Phần Mở đầu = bìa + 2 nút nhánh theo `TOC.draft.md` mới (Ra đi tìm đường cứu nước, Những năm bôn ba); bìa vẫn không ảnh nền, không chú thích.

### Cập nhật Mục 1 Node 2–5 theo TOC.v1 (người dùng chỉnh)

- Node 2–5 dùng đúng nguyên văn mục (b) của TOC.v1; tiêu đề theo (a): Node 3 "Người tiếp cận tư tưởng Khai sáng bằng cách nào", Node 4 "Kế thừa: nhân dân làm chủ, nhà nước pháp quyền". Nhãn dòng bố cục: "Tiếp cận bằng cách nào", "Dân làm chủ, pháp quyền".
- `app.js`: hàm `rich` (chạy sau `esc`) đổi `*…*` thành `<em>`, `**…**` thành `<strong>`; áp dụng cho `points`, `text`, `coda`. `style.css`: `em` giữ font nội dung, chỉ nghiêng.

### Cập nhật Mở đầu theo TOC.draft (người dùng bổ sung 2 node)

- Thay 2 nút cũ (Luận đề, Bến Nhà Rồng) bằng 2 nút của người dùng: **Ra đi tìm đường cứu nước** (gộp nội dung Bến Nhà Rồng; camera đáp Sài Gòn) và **Những năm bôn ba** (mới; hải trình Sài Gòn → … → Paris; nền mới `bg-le-havre-1910.jpg`). Ý "Luận đề" cũ được gộp làm câu dẫn và dòng cuối của nút Bôn ba (QĐ tạm 10).
- `app.js`: thêm đường biển `Sài Gòn>Paris` vào `SEA_VIA`; đầu dây chạy theo độ dài hải trình (tối đa 6 giây), đuôi dây vẫn khép dần như cũ; hỗ trợ `center` riêng cho nút. Thêm địa danh New York.
- Tổng số bước không đổi (23), vì 2 nút mới thay 2 nút cũ.
- Nút nhánh có thể vừa có gạch đầu dòng vừa có câu trích; nút nào có `img` / `people` cũng hiện chân dung (không chỉ nút "nhân vật"); 3 chân dung trong một bước được xếp khung nhỏ, bậc thang.
- Nút `summary` cho lưới tổng kết hiện một lần (một Node = một bước).
- Ảnh nền thiếu sẽ hiện ô "ẢNH THIẾU" kèm đường dẫn, thay vì để trống.
- Giữ nguyên các điểm đã sửa theo 6 góp ý v2 (bìa, dòng bố cục không năm/không "Ý N", bản đồ trái – ảnh phải, Mỹ chỉ Philadelphia và ít chi tiết, kết luận có HCM, hải trình khép dần).

## Nội dung (trích từ data.js)

### Mở đầu
**Bìa** — kicker *Tư tưởng Hồ Chí Minh* — **Tư tưởng và văn hóa phương Tây** — *góp phần hình thành tư tưởng Hồ Chí Minh*. Chân dung HCM_1, HCM_3, HCM_4. Bản đồ toàn thế giới.

**Ra đi — Ra đi tìm đường cứu nước** *(hải trình Sài Gòn → Marseille; nền bg-saigon)*
- Ngày 5/6/1911, Nguyễn Tất Thành, lấy tên Văn Ba, làm phụ bếp trên tàu Amiral Latouche-Tréville, rời Bến cảng Nhà Rồng sang Pháp.
- Cần Vương, Đông Du, Duy Tân lần lượt thất bại: đất nước khủng hoảng đường lối
- Người chọn sang phương Tây để xem tận nơi
- Trích: "Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta." — Nguyễn Tất Thành khi nói về mục đích ra đi

**Bôn ba — Những năm bôn ba** *(không hải trình; camera phóng vào châu Âu; nền bg-le-havre-1910)*
- *Tinh hoa văn hóa, tư tưởng phương Tây đã góp phần hình thành nên tư tưởng của Người.*
- 1911–1917: làm thuê trên tàu biển, đi qua châu Phi, sang Mỹ, sang Anh, cuối 1917 trở lại Pháp
- Vừa làm vừa tự học: tiếp xúc tận nơi một nền văn hóa, tư tưởng hoàn toàn mới
- Ba dòng chảy: Khai sáng và dân chủ · văn học nhân đạo · Thiên Chúa giáo

### Triết học Khai sáng Pháp
**Mở phần:** Lý trí, quyền tự nhiên, chủ quyền nhân dân: những ý niệm Người gặp trên đường tìm hiểu nước Pháp. *(Paris; nền bg-geoffrin)* Từ nút đầu tiên, camera đứng yên ở Pháp (Paris, zoom 6) cho hết mục; các nút trong mục không hiện tag cạnh kicker (`noTag` của phần).

**Thời kỳ Khai sáng — Thế kỷ của lý trí** *(Paris)*
- Phong trào tư tưởng châu Âu, đỉnh cao ở Pháp thế kỷ XVIII: "thế kỷ ánh sáng".
- Đề cao lý trí, lấy lý trí làm thước đo mọi thể chế, mọi niềm tin
- Khẳng định quyền tự nhiên: quyền sống, tự do, mưu cầu hạnh phúc
- Phê phán quân chủ chuyên chế, đặc quyền phong kiến và giáo quyền
- Mở đường cho Cách mạng Pháp 1789

**Nhà tư tưởng — Ba ngọn đèn của Khai sáng Pháp** *(chân dung Voltaire, Montesquieu, Rousseau kèm năm sinh–mất dưới ảnh; nền bg-encyclopedie)* — nguyên văn TOC.v1, tên tác phẩm in nghiêng
- **Voltaire:** Chủ trương chống lại chế độ quân chủ chuyên chế và sự độc đoán của giáo hội, đề cao tự do tư tưởng, tự do ngôn luận và tinh thần khoan dung.
- **Montesquieu:** Tác phẩm *Tinh thần pháp luật* – Đề xuất thuyết Tam quyền phân lập nhằm kiểm soát quyền lực nhà nước.
- **Rousseau:** Tác phẩm *Khế ước xã hội* – Khẳng định chủ quyền thuộc về nhân dân, nhà nước là sản phẩm của khế ước xã hội.

**Con đường tiếp cận — Tiếp cận tư tưởng Khai sáng** *(chân dung HCM_1; nền bg-quoc-hoc-hue)* — 2 ý nguyên văn của người dùng (giữ cả "(cần làm rõ)", "sau hơn")
- Trích: "Khi tôi độ mười ba tuổi, lần đầu tiên tôi được nghe ba chữ Pháp: Tự do, Bình đẳng, Bác ái… Và từ thuở ấy, tôi rất muốn làm quen với nền văn minh Pháp, muốn tìm xem những gì ẩn đằng sau những chữ ấy." — Nguyễn Ái Quốc trả lời báo Ogoniok, 1923
- Ngay từ khi còn học ở Trường Bản Xứ ở Vinh (cần làm rõ) và Trường Quốc học Huế, Nguyễn Tất Thành đã lần đầu tiếp xúc với các tác phẩm của các nhà tư tưởng Khai sáng Pháp ở thế kỷ XVIII.
- Trong thời gian hoạt động tại Pháp, Người có điều kiện nghiên cứu sau hơn các học thuyết này, tham gia các câu lạc bộ chính trị và tranh luận trực tiếp về các giá trị dân chủ.

**Sự kế thừa — Sự kế thừa tư tưởng** *(nền bg-hien-phap-1946)*
- Quyền lực thuộc về nhân dân: nước ta là nước dân chủ, mọi quyền bính của nhân dân (tinh thần "chủ quyền nhân dân" của Rousseau).
- Nhà nước pháp quyền, đề cao Hiến pháp và pháp luật: "Trăm điều phải có thần linh pháp quyền".
- Tự do, bình đẳng là quyền tự nhiên, không ai được xâm phạm.
- Trích: "Bảy xin Hiến pháp ban hành, / Trăm điều phải có thần linh pháp quyền." — Nguyễn Ái Quốc, Việt Nam yêu cầu ca (1922)

**Sự phát huy — Vượt lên giới hạn của cách mạng tư sản** *(nền bg-liberte)* — 2 ý nguyên văn của người dùng
- Các nhà khai sáng Pháp mới chỉ dừng lại ở giải phóng giai cấp tư sản và quyền tự do cá nhân trên danh nghĩa.
- Hồ Chí Minh mở rộng quyền con người thành quyền dân tộc tự quyết, gắn độc lập dân tộc với tự do, hạnh phúc.
- Trích: "Cách mệnh Pháp cũng như cách mệnh Mỹ, nghĩa là cách mệnh tư bản, cách mệnh không đến nơi, tiếng là cộng hoà và dân chủ, kỳ thực trong thì nó tước lục công nông, ngoài thì nó áp bức thuộc địa." — Nguyễn Ái Quốc, Đường Kách mệnh (1927)

### Văn học phương Tây
**Mở phần — Giá trị nhân văn trong văn học phương Tây** *(chỉ tiêu đề, không câu dẫn; nền bg-cosette)* Các nút trong mục không có tag, cả cạnh kicker lẫn ở dòng bố cục (`noTag`, `noFlowTag` của phần).

**Tiếp cận — Văn học phương Tây với Nguyễn Ái Quốc** *(Paris, thu xa thấy London; chân dung Hugo, Shakespeare, Tolstoy; nền bg-sainte-genevieve)* — 2 ý nguyên văn của người dùng (TOC.v1 Mục 2 Node 1 (b)), không câu trích
- Khi còn ở châu Âu, Nguyễn Ái Quốc vừa làm thuê vừa dành thời gian tại các thư viện để đọc kiệt tác văn học phương Tây.
- Người đặc biệt yêu thích Victor Hugo, đọc vở kịch của Shakespeare, và các tác phẩm của đại văn hào Lev Tolstoy.

**Giá trị — Giá trị trong các tác phẩm** *(Paris; chân dung Hugo, Tolstoy; nền bg-cosette)* — 2 ý nguyên văn của người dùng (TOC.v1 Mục 2 Node 2 (b)), không câu trích
- Các tác phẩm đại diện cho những góc nhìn về xã hội lúc bấy giờ, mang giá trị nhân đạo, sự cảm thông với người yếu thế và phê phán sự bất công.
- Những giá trị này được tìm thấy trong tư tưởng của Người ở tinh thần nhân ái, sự quan tâm đến nhân dân lao động và tầng lớp bị áp bức.

Theo TOC.v1, mục (c) của hai nút (chuyện/câu Tolstoy 1960, "Điếc không sợ súng", câu Trần Dân Tiên) **không đưa lên slide**; không bìa Le Paria. Ảnh p-zola, p-anatole-france vẫn để trong images nhưng không dùng.

### Tư tưởng tự do, dân chủ
**Mở phần — Tư tưởng tự do, dân chủ** · *Liberté · Égalité · Fraternité*: Hai bản tuyên ngôn của cách mạng Mỹ và Pháp, và cách Người "suy rộng ra". *(Đại Tây Dương; nền bg-bastille)*

**Tuyên ngôn Độc lập của Mỹ** *(Philadelphia; chân dung Jefferson; nền bg-us-declaration)*
- Tháng 7 năm 1776, mười ba thuộc địa của Anh ở Bắc Mỹ tuyên bố độc lập.
- Bản tuyên ngôn độc lập của Mỹ đánh dấu lần đầu tiên quyền cơ bản của con người được đưa làm nền tảng lập quốc.

**Tuyên ngôn của Pháp** *(Paris; nền bg-bastille)*
- Tháng 7 năm 1789, nhà tù Bastille bị phá, cách mạng Pháp bùng nổ.
- Đó là thời điểm mà khẩu hiệu Tự do – Bình đẳng – Bác ái được phổ biến rộng rãi.

**Bản yêu sách của nhân dân An Nam** *(Versailles; chân dung HCM_1; nền bg-versailles-1919)*
- Năm 1919, Bản yêu sách của nhân dân An Nam gửi tới Hội nghị Versailles, ký tên Nguyễn Ái Quốc.
- Bản yêu sách dùng chính ngôn ngữ dân quyền của phương Tây để đòi tự do ngôn luận, báo chí, hội họp, đi lại cho dân thuộc địa.
- Bản yêu sách không được đáp lại. Người nhận ra rằng những lời hứa tự do của các nước lớn không dành cho dân thuộc địa.

**Tuyên ngôn Độc lập** *(Hà Nội; chân dung HCM_3; nền bg-ba-dinh-1945)*
- Ngày 2/9/1945, Tuyên ngôn Độc lập của nước Việt Nam Dân chủ Cộng hòa mở đầu bằng lời của chính hai bản tuyên ngôn Mỹ và Pháp.
- Trích: "Đó là những lẽ phải không ai chối cãi được." — Hồ Chí Minh, Tuyên ngôn Độc lập, 2/9/1945

**Sự kế thừa và phát huy** *(Hà Nội; nền bg-ba-dinh-1945)*
- Người tiếp thu những tư tưởng tự do, dân chủ phương Tây, và dùng chính lý lẽ ấy để buộc tội thực dân.
- Người cũng chỉ ra giới hạn: đó là "cách mệnh không đến nơi", tiếng là cộng hòa, dân chủ, nhưng trong thì bóc lột công nông, ngoài thì áp bức thuộc địa.
- Từ quyền con người, Người nâng lên thành quyền dân tộc.
- Trích: "Suy rộng ra, câu ấy có ý nghĩa là: tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do." — Hồ Chí Minh, Tuyên ngôn Độc lập, 2/9/1945

### Thiên Chúa giáo
**Mở phần:** Một nền tảng của văn hóa phương Tây: lòng bác ái, tinh thần hy sinh vì con người. *(Roma · Vatican; nền bg-vatican)*

**Kitô giáo** *(Roma · Vatican; nền bg-sermon-mount)*
- Mọi con người đều là con của Chúa, không phân biệt sang hèn hay màu da.
- Đề cao lòng bác ái, tình yêu thương giữa người với người.
- Chúa Giê-su: biểu tượng của sự hi sinh để cứu chuộc và giải phóng những con người khổ đau.

**Con đường tiếp cận** *(Roma · Vatican; nền bg-vatican)*
- Thiên Chúa giáo đã có mặt ở Việt Nam từ thế kỷ XVI.
- Sang phương Tây, Người sống giữa một xã hội thấm đẫm văn hóa Kitô giáo: nhà thờ, lễ Giáng sinh, Kinh Thánh trong văn chương.

**Nhận định của Hồ Chí Minh** *(Roma · Vatican; nền bg-vatican)*
- Trích: "Học thuyết Khổng Tử có ưu điểm là sự tu dưỡng đạo đức cá nhân. Tôn giáo Giê-su có ưu điểm là lòng nhân ái cao cả… Tôi cố gắng làm người học trò nhỏ của các vị ấy." — Theo Trần Dân Tiên (bản tiếng Trung, 1949)
- "Chúa Giê-su dạy: Đạo đức là bác ái."
- Người không nhìn tôn giáo bằng lăng kính giáo điều, mà bằng con mắt văn hóa – đạo đức, chắt lọc cái tốt ở mỗi học thuyết.

**Kế thừa và phát huy** *(Roma → Hà Nội; nền bg-tourane-1858)*
- Hồ Chí Minh đã kế thừa lòng nhân ái, đức hi sinh, hết lòng phụng sự cho nước nhà.
- Người đã chuyển hóa lòng nhân ái, đức hi sinh thành hành động cách mạng, thực hiện giải phóng con người gắn với giải phóng dân tộc khỏi áp bức, bóc lột.
- Người cũng phân định rạch ròi giữa giáo lý tốt đẹp và kẻ thực dân mượn danh tôn giáo, luôn chủ trương "Tín ngưỡng tự do, lương giáo đoàn kết".

### Kết luận
**Mở phần — Tư tưởng và văn hóa phương Tây** · *góp phần hình thành tư tưởng Hồ Chí Minh*: nhắc lại đúng tên đề tài ở bìa, dòng phụ cùng kiểu chữ với bìa (serif nghiêng, đỏ son, gạch ngắn bên dưới). *(Hà Nội, toàn thế giới; nền bg-tours-1920; chân dung lớn HCM_4 suốt phần kết)*

**Tổng kết** — 4 ý nguyên văn TOC.draft (sửa "tư do" → "tự do", "những văn" → "những giá trị ấy")
- Trong thời gian bôn ba các nước châu Âu, Bác đã có thời gian tiếp xúc và học hỏi văn hóa và tư tưởng mới mẻ của người phương Tây.
- Bác đã tiếp thu có chọn lọc những tinh hoa văn hóa tư tưởng của họ, từ triết học khai sáng, những tư tưởng tự do tiến bộ cho đến văn học và tôn giáo.
- Không chỉ học hỏi, Bác còn phát triển những giá trị ấy lên một tầm cao mới, phù hợp cho con đường cách mạng của dân tộc Việt Nam.
- Những tư tưởng, văn hóa phương Tây ấy đóng góp một phần không nhỏ trong việc hình thành nên con người vĩ đại của cả dân tộc.

**Lời kết**
- Trích: "Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi, đấy là tất cả những điều tôi muốn, đấy là tất cả những điều tôi hiểu." — Nguyễn Ái Quốc, 1920
- *Cảm ơn thầy cô và các bạn đã lắng nghe.*

## Quyết định tạm

Các "Câu hỏi cho người dùng" trong TOC.v1 chưa được trả lời. Tạm chọn phương án TOC.v1 khuyến nghị; muốn đổi thì sửa chỗ đánh dấu `QĐ tạm N` trong `data.js`.

| # | Câu hỏi (TOC.v1) | Đã chọn tạm | Cách đổi |
|---|---|---|---|
| 1 | Mục 4: nguồn ghi cho câu "lòng nhân ái cao cả" | Ghi nguồn "Theo Trần Dân Tiên (bản tiếng Trung, 1949)" (v4: nút "Nhận định của Hồ Chí Minh") | Sửa `src` của nút đó; hoặc thay `quote` bằng câu Noel 1953 hoặc "Chúng làm trái hẳn với lòng bác ái của Đức Giêsu" (1946) |
| 2 | Mục 4 Node 3: tên nút; dùng *Bản án chế độ thực dân Pháp* thay cụm "ru ngủ" | Tên phương án 1 "Phân định Chúa và kẻ mượn danh Chúa"; có dùng *Bản án*; bỏ "ru ngủ" | Đổi `title` thành "Hai gương mặt của đạo Chúa" hoặc "Góc nhìn biện chứng" |
| 3 | Mục 1 Node 3: chuyển việc đọc Rousseau/Voltaire/Montesquieu sang Phan Thiết | **Người dùng đã quyết**: dùng nguyên văn 2 ý trong TOC.v1 (b); phương án bám nguồn (Phan Thiết, Đảng Xã hội Pháp, Tours) vẫn ở TOC.v1 Node 3 (f) | Sửa `points` nút "Tiếp cận bằng cách nào" |
| 4 | Mục 2: bỏ "đặc biệt yêu thích Hugo", nhấn Tolstoy; thêm Zola, Anatole France, Dickens? | **Người dùng đã quyết**: dùng nguyên văn 2 ý TOC.v1 (b) của cả hai nút (giữ "đặc biệt yêu thích Victor Hugo"); không thêm Zola, Dickens, Anatole France; không câu trích nào (mục (c) không đưa lên slide); ảnh: Hugo, Shakespeare, Tolstoy | Phương án bám nguồn ở TOC.v1 Mục 2 Node 1 (f); đổi `people` (có sẵn ảnh p-zola, p-anatole-france) |
| 5 | Mục 3 Node 1: có nhắc Nguyễn Tất Thành ở Mỹ? | Chỉ một dòng "từng đặt chân đến nước Mỹ (1912–1913)", không Boston/Brooklyn/Garvey | Xóa dòng đó trong `points` |
| 6 | Mục 3 Node 3: node riêng cho Bản yêu sách 1919? nhắc tranh luận người soạn? | Gộp vào Node 3 (một dòng); không nhắc tranh luận người soạn | Tách thành item mới với `at: "Versailles"` |
| 7 | Hình ảnh | Tự tải ảnh còn thiếu từ Wikimedia Commons (xem `_credits.md`) | Thay file trong `images/` |
| 8 | Thời lượng tổng 10.5 phút | Giữ: Mở đầu ~1, Mục 1 ~2.5, Mục 2 ~1.5, Mục 3 ~2.5, Mục 4 ~2, Kết luận ~1 | Nếu cần 10 phút: gộp hai nút Kế thừa/Phát huy của Mục 1 |
| 9 | Giáo trình dùng bản nào | Chưa đối chiếu giáo trình chính thức; nội dung theo TOC.v1 | — |
| 10 | Mở đầu: gộp "Luận đề" vào Node 2 hay giữ riêng; bỏ dòng "từng đặt chân đến nước Mỹ" ở Mục 3 Node 1 cho khỏi lặp? | Gộp luận đề vào nút "Những năm bôn ba" (câu dẫn + dòng "Ba dòng chảy"); "bôn ba khắp châu Âu" đổi thành châu Phi, Mỹ, Anh, Pháp theo nguồn; không ghi năm sang Anh (nguồn ghi 1913/1914); giữ dòng Mỹ ở Mục 3 | Thêm lại item `idea` "Luận đề" trước nút Ra đi; xóa dòng Mỹ trong `points` Mục 3 |

Ngoài ra (theo đề xuất trong TOC.v1): câu 13 tuổi đặt ở Mục 1 Node 3 (không ở Mở đầu); Montesquieu chỉ được giới thiệu như nhà tư tưởng, phần "kế thừa" không nói Người kế thừa tam quyền phân lập; Node 5 Mục 1 nay dùng nguyên văn 2 ý của người dùng (TOC.v1 (f) lưu ý ý 1 vốn là nhận định của HCM về cách mạng tư sản); Mục 3 Node 2 ghi 26/8/1789 và chú thích văn bản 1945 ghi "1791"; không dùng chi tiết chưa xác minh (cha Nguyễn Sinh Sắc với linh mục, ngày cập Marseille, thư 15/9/1911); riêng "câu lạc bộ chính trị" nằm trong nguyên văn Node 3 Mục 1 do người dùng giữ.

## Ảnh

Ảnh mới tải trong v3 (Wikimedia Commons, xem `images/_credits.md`): `bg-quoc-hoc-hue.jpg`, `bg-hien-phap-1946.jpg`, `bg-sainte-genevieve.jpg`, `bg-sermon-mount.jpg`, `bg-tourane-1858.jpg`, `bg-ba-dinh-1945.jpg`; đợt cập nhật Mở đầu: `bg-le-havre-1910.jpg` (tàu viễn dương rời Le Havre, 1910, Agence Rol, PD).

### Ảnh còn thiếu / nên thay

Không còn ảnh nào bị thiếu file (không bước nào hiện ô "ẢNH THIẾU"). Những ảnh nên thay khi có bản tốt hơn:

- `bg-tourane-1858.jpg` và `bg-hien-phap-1946.jpg`: chỉ tải được bản rộng 500px (mạng chặn máy chủ ảnh gốc `upload.wikimedia.org`), nên đang để chìm sâu (`bgDim`). Có thể tải bản gốc từ Commons để thay.
- Chưa có ảnh Bến Nhà Rồng/tàu Amiral Latouche-Tréville đúng nghĩa (đang dùng bưu ảnh trụ sở Messageries Maritimes, Sài Gòn).
- Chưa có ảnh nhân vật Chúa Giê-su dạng png, ảnh bìa *Le Paria*, ảnh tờ Bản yêu sách 1919 (nút Bản yêu sách đang dùng tranh Hội nghị Versailles).
- Ảnh `bg-liberty-statue.jpg`, `p-zola.jpg`, `p-anatole-france.jpg`, `p-lafayette.jpg`, `p-pbc.jpg`, `p-pct.jpg` còn trong thư mục nhưng v3 không dùng.
