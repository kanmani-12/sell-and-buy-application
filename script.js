const defaults = [
  {
    id: 1,
    title: "Canon EOS 1500D",
    price: 24500,
    category: "Electronics",
    location: "Chennai",
    condition: "Good",
    emoji: "📷",
    tint: "#dfe8e8",
    description: "Camera body with two batteries and a 18–55mm lens.",
    seller: "Ananya",
  },
  {
    id: 2,
    title: "Solid wood desk",
    price: 4200,
    category: "Furniture",
    location: "Bengaluru",
    condition: "Good",
    emoji: "🪑",
    tint: "#eee2d5",
    description: "Sturdy desk with two drawers. Pickup only.",
    seller: "Rahul",
  },
  {
    id: 3,
    title: "Royal Enfield helmet",
    price: 1800,
    category: "Vehicles",
    location: "Chennai",
    condition: "Like new",
    emoji: "🪖",
    tint: "#e5e2dc",
    description: "Worn just a few times. Size M.",
    seller: "Vikram",
  },
  {
    id: 4,
    title: "Kindle Paperwhite",
    price: 6800,
    category: "Electronics",
    location: "Mumbai",
    condition: "Good",
    emoji: "📖",
    tint: "#e3e7dc",
    description: "10th generation, 8GB, includes charging cable.",
    seller: "Meera",
  },
  {
    id: 5,
    title: "Leather backpack",
    price: 1200,
    category: "Fashion",
    location: "Bengaluru",
    condition: "Fair",
    emoji: "🎒",
    tint: "#e8ded5",
    description: "Comfortable daily backpack with plenty of life left.",
    seller: "Sana",
  },
  {
    id: 6,
    title: "Atomic Habits",
    price: 250,
    category: "Books",
    location: "Chennai",
    condition: "Good",
    emoji: "📚",
    tint: "#e8e1ca",
    description: "Clean copy with no markings.",
    seller: "Arun",
  },
  {
    id: 7,
    title: "Floor lamp",
    price: 1500,
    category: "Furniture",
    location: "Mumbai",
    condition: "Like new",
    emoji: "💡",
    tint: "#dfdfd8",
    description: "Warm white lamp, perfect for reading corners.",
    seller: "Ishaan",
  },
  {
    id: 8,
    title: "Vintage denim jacket",
    price: 900,
    category: "Fashion",
    location: "Chennai",
    condition: "Good",
    emoji: "🧥",
    tint: "#dce6ed",
    description: "Classic medium-wash denim. Size L.",
    seller: "Nila",
  },
  {
    id: 9,
    title: "Yamaha acoustic guitar",
    price: 5500,
    category: "Other",
    location: "Bengaluru",
    condition: "Good",
    emoji: "🎸",
    tint: "#ebe0d0",
    description: "Comes with a soft case and spare strings.",
    seller: "Dev",
    status: "sold",
    soldAt: Date.now() - 36e5 * 3,
    buyer: "Karthik",
  },
  {
    id: 10,
    title: "Nike running shoes",
    price: 2200,
    category: "Fashion",
    location: "Mumbai",
    condition: "Like new",
    emoji: "👟",
    tint: "#e2e6ea",
    description: "UK 9, worn twice.",
    seller: "Pooja",
    status: "sold",
    soldAt: Date.now() - 36e5 * 9,
    buyer: "Farhan",
  },
  {
    id: 11,
    title: "Mountain bike",
    price: 11000,
    category: "Vehicles",
    location: "Chennai",
    condition: "Good",
    emoji: "🚲",
    tint: "#dde7df",
    description: "21-speed, recently serviced.",
    seller: "Surya",
    status: "sold",
    soldAt: Date.now() - 36e5 * 27,
    buyer: "Lakshmi",
  },
  {
    id: 12,
    title: "Bluetooth speaker",
    price: 1900,
    category: "Electronics",
    location: "Bengaluru",
    condition: "Good",
    emoji: "🔊",
    tint: "#e6e1e8",
    description: "Loud and clear, 10 hour battery.",
    seller: "Tanvi",
    status: "sold",
    soldAt: Date.now() - 36e5 * 50,
    buyer: "Imran",
  },
];
const $ = (s) => document.querySelector(s),
  page = document.body.dataset.page,
  money = (n) => "₹" + Number(n).toLocaleString("en-IN"),
  esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
let items =
    JSON.parse(localStorage.getItem("secondhand-items") || "null") || defaults,
  saved = new Set(JSON.parse(localStorage.getItem("secondhand-saved") || "[]")),
  threads = JSON.parse(localStorage.getItem("secondhand-threads") || "{}");
const isSold = (x) => x.status === "sold",
  available = () => items.filter((x) => !isSold(x));
function ago(t) {
  if (!t) return "recently";
  let m = Math.max(1, Math.round((Date.now() - t) / 6e4));
  if (m < 60) return m + " min ago";
  let h = Math.round(m / 60);
  if (h < 24) return h + " hr ago";
  let d = Math.round(h / 24);
  return d + (d === 1 ? " day ago" : " days ago");
}
function persist() {
  localStorage.setItem("secondhand-items", JSON.stringify(items));
  localStorage.setItem("secondhand-saved", JSON.stringify([...saved]));
  localStorage.setItem("secondhand-threads", JSON.stringify(threads));
}
function counts() {
  document
    .querySelectorAll("[data-saved-count]")
    .forEach((x) => (x.textContent = saved.size));
  document
    .querySelectorAll("[data-item-count]")
    .forEach((x) => (x.textContent = available().length));
}
function card(x, o = {}) {
  let sold = isSold(x);
  return `<article class="card ${sold ? "is-sold" : ""}"><a href="product.html?id=${x.id}"><div class="art" style="--tint:${x.tint}">${x.emoji}</div>${sold ? '<span class="badge-sold">Sold</span>' : ""}</a>${o.sold ? "" : `<button class="heart ${saved.has(x.id) ? "saved" : ""}" data-save="${x.id}">${saved.has(x.id) ? "♥" : "♡"}</button>`}<div class="card-info"><a href="product.html?id=${x.id}" class="card-link"><div class="price">${money(x.price)}</div><div class="title">${esc(x.title)}</div><div class="meta">${o.sold || (o.mine && sold) ? `${o.verb || "Sold"} ${ago(x.soldAt)} · ${esc(x.location)}` : `${esc(x.location)} · ${esc(x.condition)}`}</div></a>${o.mine ? `<div class="owner-actions"><button class="toggle-sold ${sold ? "is-on" : ""}" data-toggle="${x.id}">${sold ? "↺ Mark as not sold" : "✓ Mark as sold"}</button><button class="delete" data-delete="${x.id}">Remove listing</button></div>` : ""}</div></article>`;
}
function toggleSold(id) {
  let x = items.find((i) => i.id === id);
  if (!x || x.seller !== "You") return;
  if (isSold(x)) {
    delete x.status;
    delete x.soldAt;
    delete x.buyer;
    delete x.order;
  } else {
    x.status = "sold";
    x.soldAt = Date.now();
  }
  persist();
}
function bindCards(container) {
  container.onclick = (e) => {
    let id = Number(
      e.target.dataset.save ||
        e.target.dataset.delete ||
        e.target.dataset.toggle,
    );
    if (e.target.dataset.toggle) {
      toggleSold(id);
      init();
    }
    if (e.target.dataset.save) {
      saved.has(id) ? saved.delete(id) : saved.add(id);
      persist();
      init();
    }
    if (e.target.dataset.delete) {
      items = items.filter((x) => x.id !== id);
      saved.delete(id);
      persist();
      init();
    }
  };
}
function recentlySold() {
  let list = items
    .filter(isSold)
    .sort((a, b) => (b.soldAt || 0) - (a.soldAt || 0))
    .slice(0, 4);
  $("#soldProducts").innerHTML = list
    .map((x) => card(x, { sold: true }))
    .join("");
  $("#soldEmpty").hidden = !!list.length;
}
function home() {
  let category = "All",
    renderCategories = () => {
      let cats = ["All", ...new Set(available().map((x) => x.category))];
      $("#categories").innerHTML = cats
        .map(
          (x) =>
            `<button class="${x === category ? "active" : ""}" data-category="${x}">${x}</button>`,
        )
        .join("");
    },
    render = () => {
      let q = $("#search").value.toLowerCase(),
        loc = $("#location").value,
        sort = $("#sort").value,
        list = available().filter(
          (x) =>
            (category === "All" || x.category === category) &&
            (loc === "All locations" || x.location === loc) &&
            `${x.title} ${x.description}`.toLowerCase().includes(q),
        );
      list.sort((a, b) =>
        sort === "low"
          ? a.price - b.price
          : sort === "high"
            ? b.price - a.price
            : b.id - a.id,
      );
      $("#products").innerHTML = list.map((x) => card(x)).join("");
      $("#resultText").textContent =
        `${list.length} listing${list.length === 1 ? "" : "s"} available`;
      $("#empty").hidden = !!list.length;
      bindCards($("#products"));
    };
  renderCategories();
  render();
  recentlySold();
  $("#search").oninput = render;
  $("#location").onchange = render;
  $("#sort").onchange = render;
  $("#categories").onclick = (e) => {
    if (e.target.dataset.category) {
      category = e.target.dataset.category;
      renderCategories();
      render();
    }
  };
}
function product() {
  let id = Number(new URLSearchParams(location.search).get("id")),
    x = items.find((i) => i.id === id);
  if (!x) {
    $("#productDetail").innerHTML =
      '<p class="empty">This listing has wandered off.</p>';
    return;
  }
  let sold = isSold(x),
    mine = x.seller === "You",
    bought = x.buyer === "You",
    action = mine
      ? `<button class="sell" id="toggleSold">${sold ? "↺ Mark as not sold" : "✓ Mark as sold"}</button>`
      : sold
        ? '<button class="sell" disabled>Sold</button>'
        : '<button class="sell" id="buyNow">Buy now</button>',
    note =
      mine && sold
        ? `<p class="notice">✓ You marked this as sold ${ago(x.soldAt)}. It now appears under Recently sold.</p>`
        : bought
          ? `<p class="notice">✓ You bought this ${ago(x.soldAt)}. Payment: ${esc(x.order?.payment || "on pickup")}. Message the seller to arrange pickup.</p>`
          : sold
            ? `<p class="notice quiet">This item was sold ${ago(x.soldAt)}.</p>`
            : "";
  $("#productDetail").innerHTML =
    `<section class="detail"><div class="detail-art" style="--tint:${x.tint}">${x.emoji}</div><div class="detail-info"><div class="meta">${esc(x.location)} · ${esc(x.category)}</div><h1>${esc(x.title)}</h1><div class="detail-price">${money(x.price)}</div><span class="condition">${esc(x.condition)}</span>${sold ? '<span class="condition sold-tag">Sold</span>' : ""}<p>${esc(x.description)}</p><p class="meta">Listed by ${esc(x.seller || "You")}</p>${note}<div class="detail-actions">${action}<a class="secondary" href="messages.html?item=${x.id}">Message seller</a><button class="secondary" id="saveItem">${saved.has(id) ? "♥ Saved" : "♡ Save item"}</button></div><div id="checkout"></div></div></section>`;
  $("#saveItem").onclick = () => {
    saved.has(id) ? saved.delete(id) : saved.add(id);
    persist();
    counts();
    product();
  };
  if ($("#toggleSold"))
    $("#toggleSold").onclick = () => {
      toggleSold(id);
      counts();
      product();
    };
  if ($("#buyNow")) $("#buyNow").onclick = () => checkout(x);
}
function checkout(x) {
  let box = $("#checkout");
  box.innerHTML = `<form id="buyForm" class="form checkout"><h3>Confirm your purchase</h3><div class="summary"><span>${esc(x.title)}</span><strong>${money(x.price)}</strong></div><label>Full name<input name="name" required maxlength="40"></label><label>Phone number<input name="phone" required type="tel" pattern="[0-9+ ]{10,14}" title="Enter a valid phone number" placeholder="98765 43210"></label><label>Payment<select name="payment"><option>Cash on pickup</option><option>UPI on pickup</option></select></label><label>Pickup or delivery note<textarea name="note" maxlength="120" placeholder="Address or a meeting spot (optional)"></textarea></label><div class="detail-actions"><button class="sell">Confirm purchase · ${money(x.price)}</button><button type="button" class="secondary" id="cancelBuy">Cancel</button></div></form>`;
  let f = $("#buyForm");
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  $("#cancelBuy").onclick = () => {
    box.innerHTML = "";
  };
  f.onsubmit = (e) => {
    e.preventDefault();
    items =
      JSON.parse(localStorage.getItem("secondhand-items") || "null") || items;
    let cur = items.find((i) => i.id === x.id);
    if (!cur || isSold(cur)) {
      alert("Sorry, this item has just been sold.");
      product();
      return;
    }
    Object.assign(cur, {
      status: "sold",
      soldAt: Date.now(),
      buyer: "You",
      order: Object.fromEntries(new FormData(f)),
    });
    persist();
    counts();
    product();
  };
}
function sell() {
  let f = $("#sellForm");
  f.onsubmit = (e) => {
    e.preventDefault();
    let d = Object.fromEntries(new FormData(f));
    items.unshift({
      id: Date.now(),
      ...d,
      price: +d.price,
      emoji: "📦",
      tint: "#e7e5dc",
      seller: "You",
    });
    persist();
    location.href = "profile.html";
  };
}
function savedPage() {
  let list = items.filter((x) => saved.has(x.id));
  $("#products").innerHTML = list.map((x) => card(x)).join("");
  $("#resultText").textContent =
    `${list.length} saved item${list.length === 1 ? "" : "s"}`;
  $("#empty").hidden = !!list.length;
  bindCards($("#products"));
}
function profile() {
  let list = items.filter((x) => x.seller === "You"),
    bought = items
      .filter((x) => x.buyer === "You")
      .sort((a, b) => (b.soldAt || 0) - (a.soldAt || 0));
  $("#myProducts").innerHTML = list
    .map((x) => card(x, { mine: true }))
    .join("");
  $("#empty").hidden = !!list.length;
  $("#myPurchases").innerHTML = bought
    .map((x) => card(x, { sold: true, verb: "Bought" }))
    .join("");
  $("#purchaseEmpty").hidden = !!bought.length;
  bindCards($("#myProducts"));
}
function messages() {
  let pre = Number(new URLSearchParams(location.search).get("item")),
    active = pre || Number(Object.keys(threads)[0]);
  if (pre && !threads[pre]) {
    let x = items.find((i) => i.id === pre);
    if (x)
      threads[pre] = [
        { from: "seller", text: `Hi! Yes, the ${x.title} is available.` },
      ];
  }
  function draw() {
    let keys = Object.keys(threads);
    $("#threadList").innerHTML = keys.length
      ? keys
          .map((id) => {
            let x = items.find((i) => i.id === Number(id));
            return `<button class="thread ${Number(id) === active ? "active" : ""}" data-thread="${id}">${esc(x?.title || "Listing")}</button>`;
          })
          .join("")
      : '<p class="muted">No conversations yet.</p>';
    let x = items.find((i) => i.id === active);
    if (!x) {
      $("#messages").innerHTML = "";
      $("#messageForm").hidden = true;
      return;
    }
    $("#conversationHead").innerHTML =
      `<h2>${esc(x.seller || "Seller")}</h2><p class="muted">About ${esc(x.title)}</p>`;
    $("#messages").innerHTML = threads[active]
      .map(
        (m) =>
          `<div class="bubble ${m.from === "me" ? "me" : ""}">${esc(m.text)}</div>`,
      )
      .join("");
    $("#messageForm").hidden = false;
    $("#messages").scrollTop = 9999;
  }
  $("#threadList").onclick = (e) => {
    if (e.target.dataset.thread) {
      active = Number(e.target.dataset.thread);
      draw();
    }
  };
  $("#messageForm").onsubmit = (e) => {
    e.preventDefault();
    let input = $("#messageInput");
    if (!input.value.trim()) return;
    threads[active].push({ from: "me", text: input.value });
    input.value = "";
    persist();
    draw();
  };
  persist();
  draw();
}
function init() {
  counts();
  if (page === "home") home();
  if (page === "product") product();
  if (page === "sell") sell();
  if (page === "saved") savedPage();
  if (page === "profile") profile();
  if (page === "messages") messages();
}
init();
