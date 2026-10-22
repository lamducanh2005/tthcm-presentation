/* HẢI TRÌNH v3 (cơ chế giữ nguyên từ v2; v3 thêm points/quote/qfirst/coda/summary, ảnh nhân vật cho mọi kind, ô ẢNH THIẾU)
   - Bản đồ ở bên trái (mờ dần về phải), ảnh nền chìm ở bên phải (mờ dần về trái).
   - Hải trình: mỗi lần đổi địa danh, một sợi dây đỏ chạy từ A tới B cùng nhịp camera;
     tới nơi thì đuôi dây rút dần về B rồi biến mất, không để lại vết trên bản đồ.
   - Dòng bố cục ở đáy: trục chính gồm các phần. Đến phần nào, nhánh của phần ấy rẽ xuống,
     nét khắc tới đâu nút hiện tới đó, rồi cong lên hợp lại ở phần kế. Rời đi thì nhánh thu lại.
     (cách tính bố cục và lò xo theo bản tl-nhanh-2-trong-dong-v3) */
(() => {
  const D = window.DECK;
  const $ = (id) => document.getElementById(id);
  const body = document.body;
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  // markdown tối giản sau khi escape: **đậm** → <strong>, *nghiêng* → <em>; dấu * đơn lẻ giữ nguyên
  const rich = (s) => esc(s)
    .replace(/\*\*([^\s*](?:[^*\n]*?[^\s*])?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^\s*](?:[^*\n]*?[^\s*])?)\*/g, "<em>$1</em>");
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const f1 = (v) => Math.round(v * 10) / 10;
  const f2 = (v) => Math.round(v * 100) / 100;
  const STILL = /still/.test(location.search); // tắt hiệu ứng (để chụp ảnh kiểm tra)
  const TAG = { person: "Nhân vật", people: "Nhân vật", story: "Nội dung", quote: "Trích dẫn", idea: "Ý nghĩa", take: "Rút ra", summary: "Tổng kết" };

  /* ---------- bước trình chiếu: mỗi phần + từng nút nhánh của nó ---------- */
  const steps = [];
  D.sections.forEach((s, si) => {
    steps.push({ si, ii: -1 });
    (s.items || []).forEach((_, ii) => steps.push({ si, ii }));
  });
  const stepIndex = (si, ii) => steps.findIndex((x) => x.si === si && x.ii === ii);
  const itemOf = (st) => (st.ii >= 0 ? D.sections[st.si].items[st.ii] : null);

  /* ================= BẢN ĐỒ ================= */
  const world = d3.select("#world");
  const topo = window.WORLD_TOPO;
  const land = topojson.feature(topo, topo.objects.land);
  const countries = topojson.feature(topo, topo.objects.countries).features;
  const borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b);
  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const places = D.places;

  // đường biển Sài Gòn → Marseille đi qua Singapore, Colombo, Aden, kênh Suez
  const SG_MRS = [[103.8, 1.26], [79.85, 6.93], [45.0, 12.8], [32.55, 29.95], [32.3, 31.26], [15.6, 37.5]];
  const SEA_VIA = {
    "Sài Gòn>Marseille": SG_MRS
  };
  function via(a, b) {
    if (SEA_VIA[a + ">" + b]) return SEA_VIA[a + ">" + b];
    if (SEA_VIA[b + ">" + a]) return SEA_VIA[b + ">" + a].slice().reverse();
    return [];
  }
  // nội suy theo cung tròn lớn, trả về toạ độ đã chiếu (các điểm cách đều nhau)
  function legPoints(a, b) {
    const legs = [places[a], ...via(a, b), places[b]];
    const pts = [projection(legs[0])];
    for (let j = 1; j < legs.length; j++) {
      const it = d3.geoInterpolate(legs[j - 1], legs[j]);
      const n = Math.max(4, Math.round(d3.geoDistance(legs[j - 1], legs[j]) * 160));
      for (let s = 1; s <= n; s++) pts.push(projection(it(s / n)));
    }
    return pts;
  }

  // đường bờ biển nhiều mức chi tiết: bỏ các điểm gần nhau hơn tol (px ở mức zoom 1).
  // Ở zoom k, sai số trên màn hình là tol·k; chọn mức sao cho sai số < 1px → mắt không thấy khác,
  // nhưng lúc camera bay xa trình duyệt vẽ ít điểm hơn hẳn.
  function thinPath(tol) {
    const t2 = tol * tol;
    return d3.geoPath({
      stream: (out) => {
        let n = 0, px = 0, py = 0, lx = 0, ly = 0, held = false;
        return projection.stream({
          point(x, y) {
            if (!n || (x - px) ** 2 + (y - py) ** 2 >= t2) { out.point(x, y); px = x; py = y; n++; held = false; }
            else { lx = x; ly = y; held = true; }
          },
          lineStart() { n = 0; held = false; out.lineStart(); },
          lineEnd() { if (held) out.point(lx, ly); out.lineEnd(); },
          polygonStart() { out.polygonStart(); },
          polygonEnd() { out.polygonEnd(); },
          sphere() { out.sphere(); }
        });
      }
    });
  }
  const LOD = [{ k: 1.8, tol: .5 }, { k: 4.5, tol: .2 }, { k: Infinity, tol: 0 }];
  let landD = [], lod = -1;
  function setLod(k) {
    const i = LOD.findIndex((l) => k < l.k);
    if (i !== lod) { lod = i; $("land").setAttribute("d", landD[i]); }
  }

  let W = 0, H = 0;
  function layoutMap() {
    W = innerWidth; H = innerHeight;
    projection.fitExtent([[0, 0], [W, H * 1.08]], { type: "Sphere" });
    projection.translate([W / 2, H / 2 + H * .04]);
    landD = LOD.map((l) => (l.tol ? thinPath(l.tol)(land) : path(land)));
    lod = -1;
    setLod(cam.k);
    $("borders").setAttribute("d", path(borders));
    $("grat").setAttribute("d", path(d3.geoGraticule10()));
    d3.select("#hl").selectAll("path").attr("d", (d) => path(d));
    if (voy) voy.pts = legPoints(voy.a, voy.b);
  }

  const hlIds = new Set(D.sections.flatMap((s) => (s.map && s.map.hl) || []).map(String));
  d3.select("#hl").selectAll("path")
    .data(countries.filter((f) => hlIds.has(String(+f.id))))
    .join("path").attr("data-id", (d) => +d.id);

  // camera của từng bước: nút nhánh có "at" thì đáp xuống địa danh đó
  function mapOf(st) {
    const s = D.sections[st.si], m = s.map || {}, it = itemOf(st);
    const at = (it && it.at) || m.at || null;
    // it.center: tâm camera riêng (vd. thu xa để thấy trọn một hải trình dài), địa danh "at" vẫn là đích của dây
    const center = it && it.center ? it.center : it && it.at ? places[it.at] : m.center || places[at];
    const pins = (m.pins || []).slice();
    if (at && !pins.includes(at)) pins.push(at);
    return { at, from: it && it.from, center, zoom: (it && it.zoom) || m.zoom || 1, fx: m.fx, fy: m.fy, hl: m.hl || [], pins };
  }

  /* camera: view = [x, y, w, fx, fy] — điểm (x, y) của thế giới, bề rộng w, đặt tại tiêu điểm (fx, fy) của màn hình */
  let view = null, cam = { k: 1, tx: 0, ty: 0 };
  const focus = (m) => (body.classList.contains("is-cover") ? [.5, .46] : innerWidth < 900 ? [.5, .3] : [m.fx || .47, m.fy || .42]);
  const viewFor = (m) => { const p = projection(m.center); return [p[0], p[1], W / m.zoom, ...focus(m)]; };
  function applyView(v) {
    view = v;
    const k = W / v[2];
    cam = { k, tx: v[3] * W - k * v[0], ty: v[4] * H - k * v[1] };
    world.attr("transform", `translate(${cam.tx},${cam.ty}) scale(${k})`);
    setLod(k);
    drawOverlay();
  }

  // mỗi loại chuyển động có "node" riêng để không cắt ngang nhau
  const camNode = d3.select(document.createElement("i"));
  const voyNode = d3.select(document.createElement("i"));

  function flyTo(m, instant, minDur) {
    const target = viewFor(m);
    if (!view || instant) { camNode.interrupt(); applyView(target); return 0; }
    const iz = d3.interpolateZoom(view.slice(0, 3), target.slice(0, 3));
    const ifx = d3.interpolate(view[3], target[3]), ify = d3.interpolate(view[4], target[4]);
    const dur = Math.min(3400, Math.max(minDur || 1300, iz.duration * .9));
    body.classList.add("flying");
    camNode.interrupt().transition().duration(dur).ease(d3.easeCubicInOut)
      .tween("cam", () => (s) => applyView([...iz(s), ifx(s), ify(s)]))
      .on("end interrupt", () => body.classList.remove("flying"));
    return dur;
  }

  /* ---------- hải trình: đầu dây chạy A → B, rồi đuôi dây rút về B ---------- */
  let voy = null; // { a, b, pts, head, tail }
  function startVoyage(a, b, dur) {
    voyNode.interrupt();
    voy = { a, b, pts: legPoints(a, b), head: 0, tail: 0 };
    // hải trình nhiều chặng (dài hơn hẳn đường bay của camera) thì đầu dây chạy lâu hơn, tối đa 6 giây
    dur = clamp(voy.pts.length * 7, dur, 6000);
    voyNode.transition().duration(dur).ease(d3.easeCubicInOut)
      .tween("head", () => (s) => { if (voy) { voy.head = s; drawOverlay(); } })
      .transition().delay(260).duration(1300).ease(d3.easeCubicInOut)
      .tween("tail", () => (s) => { if (voy) { voy.tail = s; drawOverlay(); } })
      .on("end", () => { voy = null; drawOverlay(); });
  }
  function stopVoyage() { voyNode.interrupt(); voy = null; drawOverlay(); }

  function pointAt(pts, t) {
    const f = clamp(t, 0, 1) * (pts.length - 1), i = Math.floor(f), r = f - i;
    const a = pts[i], b = pts[Math.min(i + 1, pts.length - 1)];
    return [a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r];
  }
  function slice(pts, t0, t1) {
    if (t1 - t0 < 1e-4) return [];
    const n = pts.length - 1, out = [pointAt(pts, t0)];
    for (let i = Math.floor(t0 * n) + 1; i < t1 * n; i++) out.push(pts[i]);
    out.push(pointAt(pts, t1));
    return out;
  }

  /* ---------- lớp phủ bản đồ (toạ độ màn hình) ---------- */
  const line = d3.line();
  const toScr = (p) => [p[0] * cam.k + cam.tx, p[1] * cam.k + cam.ty];
  function drawOverlay() {
    const vEl = $("voyage"), ship = $("ship");
    if (voy && voy.head > 0) {
      const pts = slice(voy.pts, voy.tail, voy.head).map(toScr);
      vEl.setAttribute("d", pts.length > 1 ? line(pts) : "");
      vEl.style.strokeWidth = f2(2.4 * (1 - .6 * voy.tail));
      const tip = toScr(pointAt(voy.pts, voy.head));
      ship.setAttribute("transform", `translate(${f1(tip[0])},${f1(tip[1])})`);
      ship.style.display = "";
      ship.style.opacity = f2(1 - voy.tail);
    } else {
      vEl.setAttribute("d", "");
      ship.style.display = "none";
    }
    d3.select("#pins").selectAll("g.pin").each(function (d) {
      const [x, y] = toScr(projection(places[d]));
      this.setAttribute("transform", `translate(${f1(x)},${f1(y)})`);
    });
  }

  function setPins(names, now) {
    const rows = d3.select("#pins").selectAll("g.pin").data(names, (d) => d);
    rows.exit().remove();
    const g = rows.enter().append("g").attr("class", "pin");
    g.append("circle").attr("class", "halo").attr("r", 15);
    g.append("line").attr("class", "tick").attr("x1", 5).attr("x2", 20).attr("y1", -5).attr("y2", -20);
    g.append("circle").attr("class", "ring").attr("r", 7);
    g.append("circle").attr("class", "dot").attr("r", 3);
    g.append("text").attr("x", 24).attr("y", -22).text((d) => d);
    g.each(function (d, i) { setTimeout(() => this.classList.add("on"), STILL ? 0 : 500 + i * 180); });
    d3.select("#pins").selectAll("g.pin").classed("now", (d) => d === now);
    drawOverlay();
  }

  /* ================= ẢNH NỀN CHÌM (2 lớp để chuyển mượt) ================= */
  // Mỗi ảnh nền là một lớp riêng. Ảnh của các bước lân cận được bật "ready" (độ mờ gần 0, CSS .ghost-img.ready)
  // nên được giải mã và vẽ trước, trong lúc người nói còn đang ở bước hiện tại. Tới lúc chuyển chỉ còn đổi
  // độ trong suốt → không khựng. (Nếu chỉ đặt src lúc cần, trình duyệt giải mã + vẽ ảnh đúng lúc nó hiện:
  // 30–60ms, rớt khung.) Chỉ giữ vài ảnh lân cận chứ không phải tất cả, vì mỗi lớp có mask đều phải ghép lại mỗi khung.
  const ghostEl = $("ghost"), ghostOf = {};
  const decoded = (img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve());
  // v4: "bgShift" (vd "0, -13vh" hay "22vw, 0") dịch cả khung ảnh nền: lên để lộ phần đáy tranh,
  // sang phải để đưa nhân vật chính về gần lề phải (lớp mờ mép trái đi theo ảnh)
  const bgShift = {};
  D.sections.forEach((s) => [s, ...(s.items || [])].forEach((o) => { if (o.bg && o.bgShift) bgShift[o.bg] = o.bgShift; }));
  new Set(D.sections.flatMap((s) => [s.bg, ...(s.items || []).map((it) => it.bg)]).filter(Boolean)).forEach((src) => {
    const im = document.createElement("img");
    im.className = "ghost-img"; im.alt = ""; im.decoding = "async";
    if (bgShift[src]) {
      const [dx, dy = "0"] = bgShift[src].split(",").map((v) => v.trim());
      // dịch sang trái: không dời khung (mép phải sẽ hở) mà nới khung về bên trái gấp đôi khoảng dịch,
      // tâm ảnh lùi đúng một khoảng dx, mép phải vẫn chạm lề màn hình
      if (dx.startsWith("-")) {
        im.style.width = `calc(60vw + 2 * ${dx.slice(1)})`;
        im.style.transform = `translateY(${dy})`;
      } else im.style.transform = `translate(${dx}, ${dy})`;
    }
    // ảnh chưa có (chưa tải về): thay bằng ô "ẢNH THIẾU" dễ nhận biết, giữ nguyên các lớp on/ready
    im.onerror = () => {
      const ph = document.createElement("div");
      ph.className = "ghost-missing " + im.className.replace("ghost-img", "").trim();
      ph.innerHTML = `<span>ẢNH THIẾU<br><b>${esc(src)}</b></span>`;
      im.replaceWith(ph);
      ghostOf[src] = ph;
    };
    im.src = src;
    ghostEl.appendChild(im);
    ghostOf[src] = im;
  });
  let curBg = null;
  function setGhost(src) {
    if (src === curBg) return;
    if (curBg) ghostOf[curBg].classList.remove("on");
    curBg = src;
    if (src) ghostOf[src].classList.add("on");
  }
  const bgOf = (st) => { const it = itemOf(st); return (it && it.bg) || D.sections[st.si].bg || null; };
  function prepAround(i) {
    const near = steps.slice(Math.max(0, i - 1), i + 3);
    const need = new Set(near.map(bgOf));
    for (const src in ghostOf) ghostOf[src].classList.toggle("ready", need.has(src));
    // chân dung kết: gắn ảnh khi phần kết luận đã ở gần (trước đó không có src → không vẽ)
    const endNear = near.find((st) => D.sections[st.si].portrait);
    const ep = $("endPortrait");
    if (endNear && !ep.getAttribute("src")) ep.src = D.sections[endNear.si].portrait;
  }
  // nạp sẵn và giải mã trước mọi ảnh, giữ tham chiếu để trình duyệt không bỏ khỏi bộ nhớ đệm
  const warm = [];
  function prewarm() {
    const urls = new Set();
    D.sections.forEach((s) => {
      [s.portrait, s.hero, ...(s.portraits || [])].forEach((u) => u && urls.add(u));
      (s.items || []).forEach((it) => {
        [it.img, it.hero, it.bg2, ...((it.people || []).map((p) => p.img))].forEach((u) => u && urls.add(u));
      });
    });
    let chain = Promise.resolve();
    urls.forEach((u) => {
      chain = chain.then(() => { const im = new Image(); im.decoding = "async"; im.src = u; warm.push(im); return decoded(im); });
    });
  }

  /* ================= CHÂN DUNG NHÂN VẬT (bên phải) ================= */
  const fig = $("figure");
  let figKey = null, figTimer = 0;
  // nút nào có people hoặc img (bất kể kind) thì hiện chân dung khung vòm bên phải
  const figList = (it) => !it ? null
    : it.people && it.people.length ? it.people
    : it.img ? [{ img: it.img, name: it.imgName || it.title || "" }] : null;
  function setFigure(it, instant) {
    const list = figList(it);
    const key = list ? list.map((p) => p.img).join("|") : null;
    if (key === figKey) return;
    const had = !!figKey;
    figKey = key;
    fig.classList.remove("on");
    clearTimeout(figTimer);
    figTimer = setTimeout(() => {
      if (!list) { fig.innerHTML = ""; return; }
      fig.className = "figure" + (list.length > 1 ? " duo" : "") + (list.length > 2 ? " n3" : "") + (it && it.imgDoc ? " doc" : "");
      fig.innerHTML = list.map((p) =>
        `<div class="person${/\.png$/i.test(p.img) ? " png" : ""}"><div class="frame"><img src="${p.img}" alt="${esc(p.name)}"></div>` +
        (list.length > 1 ? `<b>${esc(p.name)}</b><small>${esc(p.years || "")}</small><p>${esc(p.note || "")}</p>` : "") +
        `</div>`).join("");
      if (instant) { fig.classList.add("on"); return; }
      Promise.all([...fig.querySelectorAll("img")].map(decoded))
        .then(() => { if (figKey === key) fig.classList.add("on"); });
    }, instant || !had ? 0 : 420);
  }

  /* ================= NỘI DUNG (bên trái) ================= */
  const panel = $("panel");
  function fillPanel(st) {
    const s = D.sections[st.si], it = itemOf(st), kind = it ? it.kind : "section";
    panel.className = "panel k-" + kind + (it && it.qfirst ? " q-first" : "") + (it && it.noKicker ? " no-kicker" : "");
    $("pKicker").textContent = (it && it.kicker) || s.kicker || "";
    $("pTag").textContent = it && !s.noTag ? it.tag || TAG[kind] : "";
    $("pMotto").innerHTML = !it && s.motto ? s.motto.map((m) => `<span>${esc(m)}</span>`).join("") : "";

    let title = "", meta = "", lead = "";
    if (!it) { title = s.title; lead = s.lead || ""; }
    else if (kind === "take") title = s.title;
    else if (kind !== "quote") { title = it.title || ""; meta = it.years || ""; lead = it.text || ""; }
    $("pTitle").textContent = title;
    $("pMeta").textContent = meta;
    $("pLead").innerHTML = rich(lead);
    $("pPoints").innerHTML = it && it.points ? it.points.map((p) => `<li>${rich(p)}</li>`).join("") : "";
    $("pCoda").innerHTML = rich((it && it.coda) || "");

    const q = !it ? null : kind === "quote" ? { text: it.text, src: it.src } : it.quote || null;
    $("qText").textContent = q ? q.text : "";
    $("qSrc").textContent = q ? q.src || "" : "";
    // câu trích đi kèm gạch đầu dòng thì nhỏ hơn câu trích đứng một mình
    $("pQuote").classList.toggle("long", !!q && (q.text.length > 190 || (kind !== "quote" && q.text.length > 90)));
    $("pQuote").classList.toggle("side", !!q && kind !== "quote");

    if (kind === "summary") {
      const tk = $("pTake");
      tk.dataset.si = "";
      tk.innerHTML = it.grid.map((x) => `<div class="on now"><b>${esc(x.b)}</b><span>${esc(x.t)}</span></div>`).join("");
      return;
    }

    // các nút "take" liền nhau hiện thành một lưới, mở dần từng ô
    const tk = $("pTake");
    if (kind === "take") {
      if (tk.dataset.si !== String(st.si)) {
        tk.dataset.si = st.si;
        tk.innerHTML = s.items.filter((x) => x.kind === "take")
          .map((x) => `<div><b>${esc(x.title)}</b><span>${esc(x.text)}</span></div>`).join("");
      }
      const k = s.items.slice(0, st.ii + 1).filter((x) => x.kind === "take").length - 1;
      [...tk.children].forEach((el, j) => { el.classList.toggle("on", j <= k); el.classList.toggle("now", j === k); });
    } else { tk.innerHTML = ""; tk.dataset.si = ""; }
  }

  /* ================= DÒNG BỐ CỤC ================= */
  const NS = "http://www.w3.org/2000/svg";
  const sv = (tag, attrs, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  const railEl = $("rail"), gAxis = $("rAxis"), gBr = $("rBr"), gNd = $("rNodes"), capsEl = $("railCaps");
  // đơn vị ngang của "thế giới" dòng bố cục (nhân với M.s ra px)
  const SPC1 = 150, OFF = 116, SPC2 = 140, MRG = 108;
  const POP_T = 1.1;
  const popSpring = (t) => { if (t >= POP_T) return 1; const w = 8, z = .6, wd = w * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t)); };
  const sine = (t) => -(Math.cos(Math.PI * clamp(t, 0, 1)) - 1) / 2;
  // lò xo tắt dần tới hạn: không vượt đích, vận tốc liên tục kể cả khi đổi đích giữa chừng
  function spring(o, k, kv, target, w, dt) {
    const d = o[k] - target, v = o[kv], e = Math.exp(-w * dt);
    o[k] = target + (d + (v + w * d) * dt) * e;
    o[kv] = (v - w * (v + w * d) * dt) * e;
  }
  // lò xo hơi dưới tắt dần cho độ mở nhánh (vượt nhẹ rồi lắng)
  function wSpring(b, target, w, z, dt) {
    const h = dt / 4;
    for (let i = 0; i < 4; i++) { b.Wv += (-2 * z * w * b.Wv - w * w * (b.W - target)) * h; b.W += b.Wv * h; }
    if (b.W < 0) { b.W = 0; b.Wv = 0; } // khép thì không nhún quá: tránh trục bị kéo lệch rồi bật lại
    if (Math.abs(b.W - target) < .0005 && Math.abs(b.Wv) < .003) { b.W = target; b.Wv = 0; }
  }

  const L1 = D.sections.map((s, si) => ({ lvl: 1, si, ii: -1, s, x: 0, y: 0, a: 1, ap: POP_T }));
  L1.forEach((A) => {
    A.kids = (A.s.items || []).map((it, ii) => ({ lvl: 2, si: A.si, ii, it, parent: A, x: 0, y: 0, a: 0, ap: 0 }));
    if (A.kids.length) A.br = { open: false, pl: 0, p: 0, W: 0, Wv: 0, hold: 0, full: 0 };
  });
  const NODES = L1.flatMap((A) => [A, ...A.kids]);
  NODES.forEach((n) => (n.step = stepIndex(n.si, n.ii)));
  const END = { x: 0, y: 0 };
  // camera: x = an.x + off, với an là nút neo (xem anchorNode)
  const R = { cur: L1[0], an: L1[0], x: 0, off: 0, v: 0, instant: true };
  const M = {};

  L1.forEach((A) => (A.ax = sv("path", { class: "ax" }, gAxis)));
  NODES.forEach((n) => {
    const g = sv("g", { class: "rn l" + n.lvl + (n.it ? " k-" + n.it.kind : ""), "data-step": n.step }, gNd);
    sv("circle", { class: "hit", r: 18 }, g);
    if (n.lvl === 1) {
      sv("rect", { class: "halo", x: -10, y: -10, width: 20, height: 20, transform: "rotate(45)" }, g);
      sv("rect", { class: "face", x: -6, y: -6, width: 12, height: 12, transform: "rotate(45)" }, g);
    } else {
      sv("circle", { class: "halo", r: 11 }, g);
      sv("circle", { class: "face", r: 5.5 }, g);
    }
    n.g = g;
    const c = document.createElement("div");
    c.className = "rc l" + n.lvl;
    c.dataset.step = n.step;
    c.innerHTML = n.lvl === 1
      ? `<div class="in" data-step="${n.step}"><span>${esc(n.s.rail)}</span></div>`
      : `<div class="in" data-step="${n.step}">${n.parent.s.noFlowTag ? "" : `<b>${esc(n.it.tag || TAG[n.it.kind])}</b>`}<span>${esc(n.it.label || n.it.title || "")}</span></div>`;
    capsEl.appendChild(c);
    n.cap = c;
  });
  const pool = {};
  function seg(key) {
    let p = pool[key];
    if (!p) p = pool[key] = sv("path", { class: "br" }, gBr);
    p._seen = true;
    return p;
  }

  function railMetrics() {
    const w = innerWidth;
    M.pad = clamp(w * .052, 18, 96);
    M.lane = clamp(innerHeight * .075, 46, 76);
    M.top = 36;
    M.H = Math.round(M.top + M.lane + 64);
    document.documentElement.style.setProperty("--rail-h", M.H + "px");
    document.documentElement.style.setProperty("--pad", M.pad + "px");
    M.W = w; M.Wr = w - 2 * M.pad;
    M.s = clamp(M.Wr / (SPC1 * (L1.length - 1)), .62, 1.3);
    capsEl.style.setProperty("--cw1", Math.round(SPC1 * M.s - 12) + "px");
    capsEl.style.setProperty("--cw2", Math.round(SPC2 * M.s - 14) + "px");
  }

  // bố cục: độ mở W của nhánh do lò xo đẩy; khoảng cách nội suy liên tục giữa lúc khép và lúc mở
  function railLayout() {
    let x = 0;
    L1.forEach((A, i) => {
      A.x = x; A.y = 0;
      const last = i === L1.length - 1;
      let adv = last ? 0 : SPC1;
      if (A.br) {
        const b = A.br, e = b.W, n = A.kids.length;
        let rel = OFF;
        A.kids.forEach((c, j) => { c.x = A.x + rel * e; c.y = M.lane * e; if (j < n - 1) rel += SPC2; });
        b.full = rel + MRG;
        adv = last ? b.full * e : SPC1 + Math.max(0, b.full - SPC1) * e;
      }
      x += adv;
    });
    END.x = x;
  }

  function tweenBranches(dt) {
    // nhánh trước còn mở trên 92% thì nhánh mới đợi (đợi lâu hơn thì có một khoảng "chết" dễ bị cảm nhận là lag)
    const closing = L1.some((A) => A.br && !A.br.open && A.br.W > .92);
    L1.forEach((A) => {
      const b = A.br;
      if (!b) return;
      const m = A.kids.length + 1;
      if (R.instant) { b.W = b.pl = b.open ? 1 : 0; b.Wv = 0; }
      else if (b.open) {
        if (closing) return;
        wSpring(b, 1, 6.5, .7, dt);
        b.hold += dt;
        if (b.hold > .06) b.pl = Math.min(1, b.pl + dt / (.3 + .2 * m));
      } else {
        // khép hai nhịp: rút nét trước; rút được gần một phần ba thì các nút mới khép lại
        b.pl = Math.max(0, b.pl - dt / .5);
        if (b.pl < .7) wSpring(b, 0, 5.2, .72, dt); else wSpring(b, 1, 6.5, .7, dt);
      }
      b.p = sine(b.pl);
    });
  }

  // Neo camera: phần nằm bên trái nhất trong các nhánh đang mở/đang khép (và phần hiện tại).
  // Mọi nhánh đang co giãn đều nằm từ nút neo trở sang phải, nên vị trí nút neo không đổi
  // → camera đi thẳng một mạch tới đích, phần sau trượt vào khi nhánh cũ khép.
  function anchorNode() {
    let i = R.cur.si;
    L1.forEach((A) => { if (A.br && (A.br.open || A.br.W > .001) && A.si < i) i = A.si; });
    return L1[i];
  }
  // đích của camera tính theo bố cục CUỐI (nhánh đang mở = 1, còn lại = 0), trả về độ lệch so với nút neo.
  // Nếu tính theo bố cục đang co giãn dở, nhánh cũ khép làm trục ngắn lại rồi nhánh mới mở làm trục dài ra,
  // camera bị giới hạn ở mép cuối kéo qua kéo lại → giật.
  function camOffset(an) {
    const saved = L1.map((A) => A.br && A.br.W);
    L1.forEach((A) => { if (A.br) A.br.W = A.br.open ? 1 : 0; });
    railLayout();
    const off = camTarget() - an.x;
    L1.forEach((A, i) => { if (A.br) A.br.W = saved[i]; });
    railLayout();
    return off;
  }
  function camTarget() {
    const span = M.Wr / M.s, total = END.x;
    if (total <= span) return (total - span) / 2;
    const n = R.cur, A = n.lvl === 1 ? n : n.parent, frac = n.lvl === 1 ? .2 : .46;
    let t = n.x - frac * span;
    // nhánh đang mở vừa khung thì giữ trọn cả nhánh trong khung
    if (A.br) {
      const lo = A.x + A.br.full * A.br.W + 80 - span, hi = A.x - 80;
      if (lo <= hi) t = clamp(t, lo, hi);
    }
    return clamp(t, 0, total - span);
  }

  // đường cong chữ S giữa hai nút; part() cắt đường cong tại t để nét được "khắc" dần
  function cub(a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    if (Math.abs(dy) < .5) return [a.x, a.y, a.x + dx / 3, a.y, b.x - dx / 3, b.y, b.x, b.y];
    const k = Math.abs(dx) * .6;
    return [a.x, a.y, a.x + k, a.y, b.x - k, b.y, b.x, b.y];
  }
  function part(c, t) {
    if (t >= 1) return c;
    const L = (p, q) => p + (q - p) * t;
    const ax = L(c[0], c[2]), ay = L(c[1], c[3]), bx = L(c[2], c[4]), by = L(c[3], c[5]), cx = L(c[4], c[6]), cy = L(c[5], c[7]);
    const dx = L(ax, bx), dy = L(ay, by), ex = L(bx, cx), ey = L(by, cy);
    return [c[0], c[1], ax, ay, dx, dy, L(dx, ex), L(dy, ey)];
  }
  const dstr = (c) => `M${f1(c[0])} ${f1(c[1])}C${f1(c[2])} ${f1(c[3])} ${f1(c[4])} ${f1(c[5])} ${f1(c[6])} ${f1(c[7])}`;

  // chỉ ghi thuộc tính khi giá trị thật sự đổi: ghi lại cùng giá trị vẫn khiến trình duyệt vẽ lại
  function put(el, k, v) {
    const c = el._a || (el._a = {});
    if (c[k] !== v) { c[k] = v; el.setAttribute(k, v); }
  }
  function drawRail() {
    const X = (x) => M.pad + (x - R.x) * M.s, Y = (y) => M.top + y;
    const cs = R.cur.si, ci = R.cur.ii, cstep = R.cur.step;

    // trục chính
    L1.forEach((A, i) => {
      const B = L1[i + 1] || END;
      if (B.x - A.x < .5) { put(A.ax, "d", ""); return; }
      put(A.ax, "d", `M${f1(X(A.x))} ${Y(0)}H${f1(X(B.x))}`);
      put(A.ax, "class", "ax" + (i < cs ? " done" : ""));
    });

    // nhánh
    for (const k in pool) pool[k]._seen = false;
    L1.forEach((A) => {
      const b = A.br;
      if (!b) return;
      const n = A.kids.length, m = n + 1;
      // nút bật đúng lúc nét khắc chạm tới
      A.kids.forEach((c, j) => (c.a = clamp((b.p * m - (j + 1) + .06) / .06, 0, 1)));
      if (b.p <= .001) return;
      const pts = [A, ...A.kids, L1[A.si + 1] || END];
      for (let k = 0; k < m; k++) {
        const t = clamp(b.p * m - k, 0, 1);
        if (t <= .001) continue;
        const a = pts[k], z = pts[k + 1];
        const p = seg(A.si + ":" + k);
        put(p, "d", dstr(part(cub({ x: X(a.x), y: Y(a.y) }, { x: X(z.x), y: Y(z.y) }), t)));
        const done = cs > A.si || (cs === A.si && ci >= k);
        put(p, "class", "br" + (done ? " done" : "") + (cs === A.si ? " live" : ""));
      }
    });
    for (const k in pool) if (!pool[k]._seen) put(pool[k], "d", "");

    // nút + nhãn
    NODES.forEach((n) => {
      const sx = X(n.x), sy = Y(n.y);
      const vis = n.a > .01 && sx > -80 && sx < M.W + 80;
      if (!vis) {
        if (n._v !== 0) { n.g.style.display = "none"; n.cap.style.visibility = "hidden"; n._v = 0; }
        return;
      }
      if (n._v !== 1) { n.g.style.display = ""; n.cap.style.visibility = ""; n._v = 1; }
      const now = n === R.cur;
      const pop = n.lvl === 1 ? 1 : .55 + .45 * popSpring(n.ap);
      const fade = n.lvl === 1 ? 1 : n.a * clamp(n.ap / .22, 0, 1);
      put(n.g, "transform", `translate(${f1(sx)} ${f1(sy)}) scale(${f2(pop * (now ? 1.25 : 1))})`);
      const op = f2(fade) + "";
      if (n._op !== op) { n.g.style.opacity = op; n.cap.style.opacity = op; n._op = op; }
      const cls = (now ? " now" : "") + (n.step < cstep ? " past" : "");
      if (n._cls !== cls) {
        n._cls = cls;
        n.g.setAttribute("class", "rn l" + n.lvl + (n.it ? " k-" + n.it.kind : "") + cls);
        n.cap.className = "rc l" + n.lvl + cls;
      }
      const ct = `translate3d(${f1(sx)}px,${f1(sy)}px,0)`;
      if (n._ct !== ct) n.cap.style.transform = n._ct = ct;
    });
  }

  let lastT = performance.now();
  function frame(now) {
    const dt = Math.min(.05, (now - lastT) / 1000);
    lastT = now;
    railStep(dt);
    requestAnimationFrame(frame);
  }
  // đứng yên thì không tính, không vẽ gì: trước đây mỗi khung đều ghi lại toàn bộ SVG của dòng bố cục
  function railBusy() {
    return R.wake || R.instant || Math.abs(R.v) > .01 ||
      L1.some((A) => A.br && (A.br.open ? A.br.pl < 1 || A.br.W !== 1 : A.br.pl > 0 || A.br.W !== 0)) ||
      NODES.some((n) => n.lvl === 2 && n.a > .01 && n.ap < POP_T);
  }
  function railStep(dt) {
    if (!railBusy()) return;
    R.wake = false;
    tweenBranches(dt);
    NODES.forEach((n) => {
      if (n.lvl === 1) return;
      if (n.a > .01) n.ap = R.instant ? POP_T : Math.min(POP_T, n.ap + dt);
      else n.ap = 0;
    });
    railLayout();
    const an = anchorNode();
    if (an !== R.an) { R.off = R.x - an.x; R.an = an; } // đổi neo nhưng giữ nguyên vị trí camera
    const to = camOffset(an);
    if (R.instant) { R.off = to; R.v = 0; } else spring(R, "off", "v", to, 6.5, dt);
    if (Math.abs(R.off - to) < .05 && Math.abs(R.v) < .05) { R.off = to; R.v = 0; } // đã tới đích
    R.x = an.x + R.off;
    drawRail();
    if (R.instant && !STILL) {
      // trạng thái cuối đã vẽ xong: tính lại một lần để các nút vừa bật cũng đủ nhịp hiện
      tweenBranches(0); railLayout(); drawRail();
      NODES.forEach((n) => { if (n.a > .01) n.ap = POP_T; });
      drawRail();
      R.instant = false;
    }
  }
  function railGo(st, instant) {
    R.cur = NODES.find((x) => x.si === st.si && x.ii === st.ii);
    R.wake = true;
    L1.forEach((A) => {
      if (!A.br) return;
      const o = A.si === st.si;
      if (o && !A.br.open) A.br.hold = 0;
      A.br.open = o;
    });
    if (instant) {
      R.instant = true;
      // vẽ ngay trạng thái cuối (liên kết sâu / chụp ảnh kiểm tra)
      for (let i = 0; i < 3; i++) { tweenBranches(0); railLayout(); drawRail(); NODES.forEach((n) => { if (n.a > .01) n.ap = POP_T; }); }
      R.an = anchorNode(); R.off = camOffset(R.an); R.x = R.an.x + R.off; R.v = 0; drawRail();
      if (!STILL) R.instant = false;
    }
  }
  railEl.addEventListener("click", (e) => {
    e.stopPropagation();
    const t = e.target.closest("[data-step]");
    if (t) go(+t.dataset.step);
  });

  /* ================= BÌA ================= */
  const cover = D.sections[0];
  $("cKicker").innerHTML = `<i class="gem"></i>${esc(cover.kicker)}`;
  $("cTitle").textContent = cover.title;
  $("cSub").textContent = cover.sub;
  $("trio").innerHTML = cover.portraits.map((src, i) => `<figure class="t${i + 1}"><img src="${src}" alt=""></figure>`).join("");

  /* ================= HIỂN THỊ ================= */
  const fmt = (v, pos, neg) => {
    const a = Math.abs(v), d = Math.floor(a), m = Math.round((a - d) * 60);
    return `${d}°${String(m).padStart(2, "0")}′${v >= 0 ? pos : neg}`;
  };

  // ảnh "hero": đổi sang ảnh khác khi đang hiện thì mờ đi trước rồi mới thay, tránh giật hình
  let heroTimer = 0;
  function setHero(src, mods, instant) {
    const hc = $("heroCut");
    clearTimeout(heroTimer);
    const show = () => {
      if (src) { if (hc.getAttribute("src") !== src) hc.src = src; hc.className = ("hero-cut " + mods).trim(); }
      body.classList.toggle("has-hero", !!src);
      body.classList.toggle("hero-mid", !!src && /center|small/.test(mods));
    };
    const old = hc.getAttribute("src");
    if (!instant && src && old && old !== src && body.classList.contains("has-hero")) {
      body.classList.remove("has-hero");
      heroTimer = setTimeout(show, 500);
    } else show();
  }

  let cur = -1, prevAt = null, prevKind = null, swapTimer = 0, prepTimer = 0;
  function render(i, instant) {
    instant = instant || STILL;
    const st = steps[i], s = D.sections[st.si], it = itemOf(st), kind = it ? it.kind : "section";
    // bìa chỉ là bước đầu của phần mở đầu; các nút nhánh của phần ấy hiện như nội dung thường
    const isCover = s.kind === "cover" && !it;
    body.classList.toggle("is-cover", isCover);
    body.classList.toggle("is-end", s.kind === "end");
    body.classList.toggle("has-fig", !!figList(it));
    body.classList.toggle("bg-dim", !!(it && it.bg && it.bgDim) || (!(it && it.bg) && !!s.bgDim));
    body.classList.toggle("has-quote", kind === "quote");

    // nội dung bên trái: các ô "take" liền nhau chỉ mở thêm ô, không mờ cả khối
    clearTimeout(swapTimer);
    if (instant || (kind === "take" && prevKind === "take")) { fillPanel(st); panel.classList.remove("swap"); }
    else {
      panel.classList.add("swap");
      swapTimer = setTimeout(() => { fillPanel(st); panel.classList.remove("swap"); }, 360);
    }
    prevKind = kind;

    // bản đồ + hải trình
    const m = mapOf(st);
    const origin = m.from || prevAt;
    const sail = !instant && m.at && origin && m.at !== origin;
    // chặng càng xa, tàu chạy càng lâu (camera bay cùng nhịp)
    const dist = sail ? d3.geoDistance(places[origin], places[m.at]) : 0;
    const dur = flyTo(m, instant, dist > .5 ? 3000 : dist > .05 ? 2000 : 1300);
    if (sail) startVoyage(origin, m.at, dur);
    else if (m.at !== prevAt) stopVoyage();
    prevAt = m.at;
    document.querySelectorAll("#hl path").forEach((p) => p.classList.toggle("on", m.hl.includes(+p.dataset.id)));
    setPins(m.pins, m.at);
    $("coord").textContent = isCover ? "" : `${fmt(m.center[1], "N", "S")}  ·  ${fmt(m.center[0], "E", "W")}`;

    // bên phải: ảnh nền chìm (bìa không có ảnh nền, không chú thích), chân dung
    setGhost(isCover ? null : (it && it.bg) || s.bg || null);
    // v4: "bg2" — lớp nền thứ hai (vd một văn bản) chìm sát mép phải, bên cạnh ảnh nền chính
    const b2 = it && it.bg2, b2el = $("bg2");
    if (b2 && b2el.getAttribute("src") !== b2) b2el.src = b2;
    body.classList.toggle("has-bg2", !!b2);
    // chuẩn bị ảnh cho các bước kế sau khi chuyển cảnh lắng xuống, để việc vẽ trước không chen vào lúc đang bay
    clearTimeout(prepTimer);
    prepTimer = setTimeout(() => prepAround(i), instant ? 0 : 1600);
    $("bgCap").textContent = isCover ? "" : (it && (it.bg || it.hero) ? it.bgCap : s.bgCap) || "";
    setFigure(it, instant);
    // v4: ảnh png tách nền nổi bên phải (trường "hero" của nút, hoặc của phần ở bước mở phần)
    const ho = it || s;
    setHero(ho.hero, (ho.heroWide ? "wide" : "") + (ho.heroCenter ? " center" : "") + (ho.heroSmall ? " small" : ""), instant);

    railGo(st, instant);
    cur = i;
    history.replaceState(null, "", location.search + "#" + (i + 1));
  }

  function go(i) {
    i = clamp(i, 0, steps.length - 1);
    if (i !== cur) render(i);
  }

  /* ================= ĐIỀU KHIỂN ================= */
  addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); go(cur + 1); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); go(cur - 1); }
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(steps.length - 1);
    else if (e.key === "f" || e.key === "F") {
      if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.();
    } else if (/^[0-9]$/.test(e.key)) {
      const s = stepIndex(+e.key, -1);
      if (s >= 0) go(s);
    }
  });
  // lăn chuột: mỗi "cú lăn" chỉ đi một bước (bỏ qua quán tính của touchpad)
  let wheelIdle = 0, wheelArmed = true;
  addEventListener("wheel", (e) => {
    clearTimeout(wheelIdle);
    wheelIdle = setTimeout(() => (wheelArmed = true), 220);
    if (!wheelArmed || Math.abs(e.deltaY) < 8) return;
    wheelArmed = false;
    go(cur + (e.deltaY > 0 ? 1 : -1));
  }, { passive: true });
  let tx0 = null;
  addEventListener("touchstart", (e) => (tx0 = e.touches[0].clientX), { passive: true });
  addEventListener("touchend", (e) => {
    if (tx0 == null) return;
    const dx = e.changedTouches[0].clientX - tx0;
    tx0 = null;
    if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
  });
  $("stage").addEventListener("click", (e) => go(cur + (e.clientX < innerWidth * .25 ? -1 : 1)));

  addEventListener("resize", () => {
    layoutMap();
    applyView(viewFor(mapOf(steps[cur])));
    railMetrics();
    R.instant = true;
  });

  /* ================= KHỞI ĐỘNG ================= */
  if (STILL) body.classList.add("still");
  layoutMap();
  railMetrics();
  const start = clamp((parseInt(location.hash.slice(1), 10) || 1) - 1, 0, steps.length - 1);
  render(start, true);
  requestAnimationFrame((t) => { lastT = t; requestAnimationFrame(frame); });
  requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove("boot")));
  setTimeout(prewarm, 600);
})();
