# Prototype 1 — Hải trình · v2

**Đề tài:** Tư tưởng và văn hóa phương Tây góp phần hình thành tư tưởng Hồ Chí Minh

## Ý tưởng

Cả bài thuyết trình là một màn hình liền mạch trên nền giấy sáng, chia thành ba vùng cố định:

- **Bên trái: bản đồ.** Bản đồ thế giới (d3 + Natural Earth) mờ dần về phía phải. Camera bay tới địa danh của từng bước. Chữ nội dung nằm trên bản đồ, có lớp giấy mờ phía sau để dễ đọc. Chỉ ghim đang đến mới hiện tên, các ghim còn lại chỉ là chấm nhỏ để không đè lên chữ.
- **Bên phải: ảnh nền chìm.** Ảnh bối cảnh (tranh, bưu ảnh, tranh khắc) mờ dần về phía trái và phía dưới, đủ rõ để minh họa. Khi có nhân vật, ảnh nền mờ bớt và chân dung (khung vòm) hiện rõ ở phía trước.
- **Dưới đáy: dòng bố cục.** Trục chính gồm các phần, không ghi năm và không ghi "Ý N". Đến phần nào thì nhánh của phần ấy rẽ xuống: nét được khắc dần, nét tới đâu nút hiện tới đó, rồi cong lên hợp lại ở phần kế. Rời phần đó thì nhánh rút nét rồi khép lại. Mỗi nút nhánh là một bước trình chiếu: một nhân vật, một câu chuyện, một câu nói hoặc một ý nghĩa. Cách bố trí và chuyển động theo bản `tl-nhanh-2-trong-dong-v3`, chuyển sang nền giấy sáng.

**Hiệu ứng hải trình:** mỗi khi đổi địa danh, một sợi dây đỏ nét đứt chạy từ A tới B cùng nhịp với camera, đầu dây là con tàu. Tới nơi thì đuôi dây rút dần về B như thu một sợi dây rồi biến mất, không để lại vết trên bản đồ. Chặng Sài Gòn → Marseille đi theo đường biển qua Singapore, Colombo, Aden, kênh Suez. Chặng càng xa thì tàu chạy càng lâu.

**Bìa:** ba chân dung Hồ Chí Minh (HCM_1 → HCM_3 → HCM_4) từ trái sang phải, cao dần nhưng chỉ chênh nhẹ, không chú thích. Bản đồ phía sau rất mờ để tiêu đề nổi lên.

**Chữ:** tiêu đề dùng *Cormorant Garamond* (có chân), nội dung dùng *Be Vietnam Pro* (không chân). Bảng màu: giấy ngà, biển xám xanh, mực nâu đen, đỏ son.

## Điều khiển (hợp với bút trình chiếu)

| Phím | Tác dụng |
|---|---|
| `→` `↓` `Space` `PageDown` `Enter`, bấm chuột ¾ màn hình bên phải | bước tiếp |
| `←` `↑` `PageUp`, bấm chuột ¼ màn hình bên trái | lùi lại |
| bấm vào một nút trên dòng bố cục | nhảy tới bước đó |
| `0`–`8` | nhảy tới phần tương ứng |
| `Home` / `End` | về đầu / tới cuối |
| `F` | bật/tắt toàn màn hình |
| lăn chuột (mỗi cú lăn = 1 bước), vuốt ngang | bước tiếp / lùi |

URL tự ghi số bước (`index.html#8`), nên tải lại trang vẫn ở đúng chỗ. Thêm `?still` để tắt hiệu ứng (dùng khi chụp ảnh kiểm tra).

Tổng cộng 42 bước: 9 phần, mỗi phần một bước chính, cộng thêm các nút nhánh.

## Cấu trúc thư mục

```
index.html   khung trang
style.css    giao diện
app.js       camera bản đồ, hải trình, dòng bố cục rẽ nhánh, điều khiển
data.js      TOÀN BỘ nội dung chữ, địa danh, mức zoom, ảnh của từng phần và từng nút nhánh
vendor/      d3 7.9.0, topojson-client 3.1.0, world-50m.js (Natural Earth 1:50m), chạy offline
images/      ảnh dùng riêng cho prototype này (nguồn: images/_credits.md)
```

Mở thẳng `index.html` bằng trình duyệt là chạy, không cần server. Font tải từ Google Fonts; khi mất mạng trình duyệt sẽ dùng font dự phòng (Georgia / Segoe UI).

### Sửa nội dung

Mọi nội dung nằm trong `data.js`. Mỗi phần có `items`, mỗi item là một nút nhánh:

- `kind`: `person` (một nhân vật), `people` (nhiều nhân vật), `story` (câu chuyện), `quote` (câu nói), `idea` (ý nghĩa, chữ nghiêng đỏ), `take` (kết luận; các nút `take` liền nhau hiện thành lưới mở dần).
- `tag` / `label`: chữ nhỏ và nhãn hiện dưới nút trên dòng bố cục.
- `at` / `zoom`: địa danh camera đáp xuống. Nếu khác địa danh của bước trước thì có hải trình.
- `bg` / `bgCap`: đổi ảnh nền chìm riêng cho nút đó.

Thêm, bớt hay đổi thứ tự nút chỉ cần sửa mảng `items`. Dòng bố cục tự tính lại.

## Thay đổi so với v1

Theo các điểm góp ý trong JOB1:

1. **Bìa:** bản đồ nền mờ hơn hẳn; kicker chỉ còn "Tư tưởng Hồ Chí Minh"; bỏ đoạn lead; ba chân dung chỉ chênh nhẹ (46 / 52 / 58% chiều cao màn hình) và bỏ chú thích dưới ảnh; bỏ dòng gợi ý phím.
2. **Dòng bố cục:** không ghi năm, không ghi "Ý N". Trục có nhánh rẽ xuống, mỗi nút nhánh là một bước trình chiếu. Các ý trong v1 (gạch đầu dòng, trích dẫn, nhân vật) được tách thành từng nút. Năm lớn chìm ở góc phải và năm trên ghim bản đồ cũng được bỏ.
3. **Bản đồ và hình nền:** tách hẳn hai bên, bản đồ bên trái, ảnh nền bên phải. Bỏ đường hành trình 1911–1945 vẽ mờ thường trực.
4. **Cách mạng Mỹ:** bản đồ chỉ ghim Philadelphia. Nội dung rút gọn còn Jefferson và hai câu trích Tuyên ngôn; bỏ chi tiết New York, Boston, Washington D.C.
5. **Kết luận:** giữ chân dung HCM bên phải suốt phần kết luận. Bản đồ đặt Hà Nội ở giữa, châu Âu ở bên trái.
6. **Hải trình:** chỉ vẽ một chặng A → B; tới nơi thì dây khép dần lại rồi biến mất, không tích lũy trên bản đồ.

Thêm mới: mỗi nhân vật ở Khai sáng và Văn học có camera riêng (Voltaire → Paris, Rousseau → Genève, Montesquieu → Bordeaux, Shakespeare → London, Tolstoy → Yasnaya Polyana). Nút "Yêu sách 1919" đưa camera về Versailles.

## Nội dung (trích từ data.js)

### Mở đầu
**Tư tưởng Hồ Chí Minh** — *Tư tưởng và văn hóa phương Tây* — góp phần hình thành tư tưởng Hồ Chí Minh
Chân dung: `HCM_1.png`, `HCM_3.png`, `HCM_4.png`

### Bối cảnh — Ra đi tìm đường cứu nước
*Kicker: Bối cảnh & luận đề · Sài Gòn → Marseille · ảnh nền: bg-saigon.jpg*

Ngày 5/6/1911, người thanh niên Nguyễn Tất Thành, lấy tên Văn Ba, làm phụ bếp trên tàu Amiral Latouche-Tréville, rời bến Nhà Rồng sang Pháp.

1. **Tiền bối — Khủng hoảng đường lối cứu nước** (Sài Gòn; ảnh Phan Bội Châu 1867–1940 · Đông Du, Phan Châu Trinh 1872–1926 · Duy Tân): Đất nước mất độc lập. Các phong trào yêu nước theo hệ tư tưởng phong kiến và dân chủ tư sản lần lượt thất bại: Đông Du hướng sang Nhật Bản, Duy Tân trông vào cải cách ôn hòa.
2. **Lựa chọn — Sang phương Tây** (hải trình Sài Gòn → Marseille): Khác các bậc tiền bối hướng sang phương Đông, Người chọn sang phương Tây, vào chính "sào huyệt" của chủ nghĩa thực dân. Ba mươi năm bôn ba (1911–1941), vừa lao động vừa học tập, đọc sách và hoạt động.
3. **Trích dẫn:** "Tôi muốn đi ra nước ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta." — Trần Dân Tiên, *Những mẩu chuyện về đời hoạt động của Hồ Chủ tịch*
4. **Luận đề:** Tinh hoa văn hóa phương Tây là một trong những nguồn gốc lý luận góp phần hình thành tư tưởng Hồ Chí Minh, được Người tiếp thu có chọn lọc trên nền chủ nghĩa yêu nước Việt Nam.

### Triết học Khai sáng Pháp — Ánh sáng của lý trí
*Paris · Genève · Bordeaux · ảnh nền: bg-geoffrin.jpg (salon bà Geoffrin), bg-encyclopedie.jpg*

Thế kỷ XVIII, các nhà Khai sáng Pháp phê phán chế độ chuyên chế và đặc quyền, đề cao lý trí, tự do và quyền con người, dọn đường tư tưởng cho Cách mạng Pháp.

1. **Voltaire** (1694–1778, Paris): Đề cao tự do tư tưởng, khoan dung tôn giáo. Ngòi bút châm biếm sắc bén chống chuyên chế và giáo quyền.
2. **Jean-Jacques Rousseau** (1712–1778, Genève): Khế ước xã hội (1762): chủ quyền thuộc về nhân dân; nhà nước ra đời từ sự ưng thuận của người dân.
3. **Montesquieu** (1689–1755, Bordeaux): Tinh thần pháp luật (1748): tam quyền phân lập, dùng pháp luật để giới hạn quyền lực.
4. **Dấu ấn — Bản Yêu sách của nhân dân An Nam** (Versailles): Năm 1919, bản yêu sách gửi Hội nghị Versailles đòi "thay chế độ ra các sắc lệnh bằng chế độ ra các đạo luật". Tinh thần thượng tôn pháp luật của Khai sáng đã thành yêu cầu chính trị.
5. **Trích dẫn:** "Bảy xin hiến pháp ban hành, / Trăm điều phải có thần linh pháp quyền." — Nguyễn Ái Quốc, *Việt Nam yêu cầu ca* (diễn ca Bản yêu sách 8 điểm)

### Văn học phương Tây — Những trang văn nhân đạo
*London · Paris · Yasnaya Polyana · ảnh nền: bg-cosette.jpg*

Người tự học tiếng Pháp, tiếng Anh và đọc các nhà văn lớn của phương Tây. Văn học vừa là công cụ học ngôn ngữ, vừa nuôi dưỡng lòng thương người lao khổ.

1. **William Shakespeare** (1564–1616, London): Những vở kịch về thân phận, khát vọng và phẩm giá con người: đỉnh cao của chủ nghĩa nhân văn Phục hưng.
2. **Victor Hugo** (1802–1885, Paris): *Những người khốn khổ* (1862): lòng thương người nghèo, tiếng nói bênh vực kẻ bị áp bức.
3. **Émile Zola** (1840–1902, Paris): Văn học hiện thực về đời sống người lao động; bức thư "Tôi tố cáo" (1898) đứng về phía lẽ phải.
4. **Anatole France** (1844–1924, Paris): Nhà văn tiến bộ, giải Nobel Văn chương 1921, có cảm tình với phong trào công nhân.
5. **Lev Tolstoy** (1828–1910, Yasnaya Polyana): Chủ nghĩa nhân đạo sâu sắc, đứng về phía người nông dân Nga.
6. **Dấu ấn — Ngòi bút Nguyễn Ái Quốc** (Paris): Chủ nghĩa nhân đạo và tinh thần phê phán hiện thực cộng hưởng với lòng thương dân của Người. Người viết báo, viết truyện bằng tiếng Pháp: kịch *Con rồng tre* (1922), các bài trên báo *Người cùng khổ* (Le Paria). Văn phong ngắn gọn, giàu hình ảnh, châm biếm sắc sảo.

### Ba giá trị — Tự do · Bình đẳng · Bác ái
*Liberté · Égalité · Fraternité · ảnh nền: bg-liberte.jpg (Delacroix)*

Khẩu hiệu của Cách mạng Pháp là điều đầu tiên kéo người thanh niên xứ Nghệ đến với phương Tây.

1. **Trích dẫn:** "Vào trạc tuổi mười ba, lần đầu tiên tôi được nghe những từ Pháp: Tự do, Bình đẳng, Bác ái… Tôi rất muốn làm quen với nền văn minh Pháp, muốn tìm xem những gì ẩn giấu đằng sau những từ ấy." — Trả lời nhà báo O. Mandelstam, tạp chí *Ogoniok* (1923)
2. **Sự đối lập — Chính quốc và thuộc địa:** Sang Pháp, Người thấy rõ sự đối lập: ở "chính quốc" có khẩu hiệu tự do, bình đẳng, bác ái; còn ở thuộc địa là áp bức, bất công.
3. **Kế thừa — Kế thừa và nâng lên:** Tự do cho cả dân tộc, bình đẳng giữa các dân tộc, bác ái thành tình thương với con người lao khổ. Tinh thần ấy đi vào tiêu ngữ Độc lập – Tự do – Hạnh phúc.

### Cách mạng Pháp — Tuyên ngôn Nhân quyền và Dân quyền
*Paris · ảnh nền: bg-ddhc.jpg (Le Barbier), bg-bastille.jpg*

Ngày 26/8/1789, Quốc hội lập hiến Pháp thông qua bản Tuyên ngôn Nhân quyền và Dân quyền, sau này được đặt ở đầu Hiến pháp 1791.

1. **La Fayette** (1757–1834): Trình bản dự thảo đầu tiên của Tuyên ngôn (7/1789); trước đó từng chiến đấu trong Cách mạng Mỹ.
2. **Nội dung — Điều 1:** "Người ta sinh ra tự do và bình đẳng về quyền lợi." Quyền tự nhiên, bất khả xâm phạm: tự do, sở hữu, an toàn và chống áp bức.
3. **Trích dẫn:** "Bản Tuyên ngôn Nhân quyền và Dân quyền của Cách mạng Pháp năm 1791 cũng nói: Người ta sinh ra tự do và bình đẳng về quyền lợi; và phải luôn luôn được tự do và bình đẳng về quyền lợi. Đó là những lẽ phải không ai chối cãi được." — Hồ Chí Minh, *Tuyên ngôn độc lập* (2/9/1945)
4. **Phê phán:** "Cách mệnh Pháp cũng như cách mệnh Mỹ, nghĩa là cách mệnh tư bản, cách mệnh không đến nơi, tiếng là cộng hòa và dân chủ, kỳ thực trong thì nó tước lục công nông, ngoài thì nó áp bức thuộc địa." — Nguyễn Ái Quốc, *Đường cách mệnh* (1927)

### Cách mạng Mỹ — Tuyên ngôn độc lập Hoa Kỳ
*Philadelphia · ảnh nền: bg-us-declaration.jpg (Trumbull)*

Ngày 4/7/1776, tại Philadelphia, mười ba thuộc địa Bắc Mỹ tuyên bố độc lập khỏi nước Anh.

1. **Thomas Jefferson** (1743–1826): Người chấp bút chính bản Tuyên ngôn 1776.
2. **Trích dẫn:** "Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc." — Tuyên ngôn độc lập Mỹ 1776, trích ở đầu Tuyên ngôn độc lập Việt Nam
3. **Suy rộng ra:** "Suy rộng ra, câu ấy có ý nghĩa là: tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do." — Hồ Chí Minh, *Tuyên ngôn độc lập* (2/9/1945)

### Thiên Chúa giáo — Lòng nhân ái cao cả
*Roma · Vatican · ảnh nền: bg-vatican.jpg (Piranesi)*

Thiên Chúa giáo là một nền tảng của văn hóa phương Tây. Hồ Chí Minh trân trọng giá trị nhân văn của nó: lòng thương người, tinh thần hy sinh vì con người.

1. **Trích dẫn:** "Học thuyết của Khổng Tử có ưu điểm là sự tu dưỡng đạo đức cá nhân. Tôn giáo Giêsu có ưu điểm là lòng nhân ái cao cả. Chủ nghĩa Mác có ưu điểm là phương pháp làm việc biện chứng… Tôi cố gắng làm người học trò nhỏ của các vị ấy." — Hồ Chí Minh, trích theo giáo trình Tư tưởng Hồ Chí Minh
2. **Đoàn kết — Đoàn kết lương — giáo:** Tôn trọng tự do tín ngưỡng, đoàn kết đồng bào lương và giáo. Người gửi thư chúc mừng Giáng sinh tới đồng bào Công giáo, khuyến khích tinh thần "Kính Chúa — yêu nước".
3. **Chọn lọc — Tiếp thu có chọn lọc:** Người tiếp thu giá trị đạo đức, nhân văn, chứ không tiếp thu thế giới quan duy tâm của tôn giáo.

### Kết luận — Tiếp thu có chọn lọc, để làm giàu cho dân tộc
*Hà Nội · chân dung HCM_4.png · ảnh nền: bg-tours-1920.jpg (Đại hội Tours, 12/1920)*

Văn hóa phương Tây, được Người tiếp thu có chọn lọc và có phê phán trên nền chủ nghĩa yêu nước, đã góp phần quan trọng hình thành tư tưởng Hồ Chí Minh. Chủ nghĩa Mác – Lênin là cơ sở thế giới quan và phương pháp luận.

1. **Dân chủ & pháp quyền:** Từ Khai sáng: chủ quyền nhân dân, nhà nước hợp hiến, thượng tôn pháp luật.
2. **Nhân quyền → dân tộc quyền:** Từ hai bản Tuyên ngôn 1776 và 1789: quyền con người "suy rộng ra" thành quyền độc lập của các dân tộc.
3. **Chủ nghĩa nhân văn:** Từ văn học và Thiên Chúa giáo: lòng thương người, phẩm giá con người.
4. **Phương pháp & phong cách:** Tinh thần phê phán; lối viết ngắn gọn, sắc sảo, gần gũi.
5. **Trích dẫn:** "Tây phương hay Đông phương có cái gì tốt, ta học lấy để tạo ra một nền văn hóa Việt Nam." — Hồ Chí Minh

## Ghi chú về ảnh

- `HCM_1.png`, `HCM_3.png` chép từ `images/` ở gốc. `HCM_4.png` đã được tách nền lại (file gốc có nền ca-rô vẽ thẳng vào ảnh).
- `p-*.jpg` là chân dung cắt khung đầu – vai; `bg-*.jpg` là ảnh bối cảnh. Nguồn và giấy phép: `images/_credits.md` (Wikimedia Commons, phạm vi công cộng; riêng `bg-geoffrin.jpg` theo CC BY 3.0).
- Để thay ảnh: bỏ file vào `images/` rồi sửa `bg`, `img` hoặc `portrait` trong `data.js`.

## Nguồn tham khảo nội dung

- Bộ Giáo dục và Đào tạo, *Giáo trình Tư tưởng Hồ Chí Minh* (dành cho bậc đại học hệ không chuyên lý luận chính trị), NXB Chính trị quốc gia Sự thật, 2021. Chương 2, mục "Tinh hoa văn hóa nhân loại / văn hóa phương Tây".
- Hồ Chí Minh, *Tuyên ngôn độc lập* (2/9/1945); *Đường cách mệnh* (1927); *Bản án chế độ thực dân Pháp* (1925).
- Trần Dân Tiên, *Những mẩu chuyện về đời hoạt động của Hồ Chủ tịch*.
- O. Mandelstam, "Thăm một chiến sĩ Quốc tế Cộng sản – Nguyễn Ái Quốc", tạp chí *Ogoniok*, 1923 (in trong *Hồ Chí Minh Toàn tập*, t.1).

## Cần đối chiếu lại trước khi thuyết trình

1. **Danh sách nhà văn** (Shakespeare, Hugo, Zola, Anatole France, Tolstoy) lấy theo đề cương của bạn. Các nguồn web chỉ xác nhận chung là Người đọc văn học phương Tây; lời giới thiệu ở mỗi nhân vật là kiến thức chung về nhà văn đó, không khẳng định Người đọc tác phẩm cụ thể nào.
2. **Câu "Học thuyết của Khổng Tử… người học trò nhỏ của các vị ấy"**: hoàn cảnh và năm nói (thường ghi là trả lời nhà báo, khoảng 1949) cần ghi theo đúng giáo trình.
3. **Câu "Tây phương hay Đông phương có cái gì tốt…"**: cần bổ sung nguồn cụ thể.
4. **Việt Nam yêu cầu ca**: năm ra đời cần ghi theo giáo trình.
5. **Bản Yêu sách 1919** ký tên Nguyễn Ái Quốc thay mặt Hội những người An Nam yêu nước. Nếu cần nêu rõ người soạn thảo, ghi theo giáo trình.
6. Tuyên ngôn độc lập 1945 ghi "năm 1791" vì bản Tuyên ngôn 1789 được đặt ở đầu Hiến pháp 1791. Khi trích, giữ nguyên chữ "1791" như văn bản gốc.
