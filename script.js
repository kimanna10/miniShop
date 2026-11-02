// Каталог товаров
const products = [
  {
    id: 1,
    name: "Беспроводные наушники",
    category: "accessories",
    price: 45000,
    image: "https://placehold.co/500x375/e8e4ff/5543d0?text=Headphones",
    description: "Любимая музыка без лишних проводов.",
  },
  {
    id: 2,
    name: "Механическая клавиатура",
    category: "accessories",
    price: 65000,
    image: "https://placehold.co/500x375/e3eaff/315a91?text=Keyboard",
    description: "Комфорт для учёбы и работы.",
  },
  {
    id: 3,
    name: "Мгновенная камера",
    category: "device",
    price: 89000,
    image: "https://placehold.co/500x375/fce8ed/b83b64?text=Camera",
    description: "Сохраняй любимые моменты.",
  },
  {
    id: 4,
    name: "Настольная лампа",
    category: "device",
    price: 32000,
    image: "https://placehold.co/500x375/fff0dc/9a6523?text=Desk+Lamp",
    description: "Уютный свет для рабочего места.",
  },
  {
    id: 5,
    name: "Термостакан",
    category: "accessories",
    price: 18000,
    image: "https://placehold.co/500x375/e3f4ec/267653?text=Tumbler",
    description: "Любимый напиток всегда под рукой.",
  },
  {
    id: 6,
    name: "Игровой контроллер",
    category: "device",
    price: 52000,
    image: "https://placehold.co/500x375/f1e5ff/7950a6?text=Controller",
    description: "Больше удовольствия от игр.",
  },
  {
    id: 7,
    name: "Портативный аккумулятор",
    category: "device",
    price: 27000,
    image: "https://placehold.co/500x375/e3f0ff/315a91?text=Power+Bank",
    description: "Заряд энергии в дороге.",
  },
  {
    id: 8,
    name: "Мини-принтер",
    category: "device",
    price: 79000,
    image: "https://placehold.co/500x375/ffe9e0/b75b40?text=Mini+Printer",
    description: "Печатай фотографии и заметки.",
  },
];

// Состояние магазина
let cart = []; // length = 0

const productQuantities = {};
// { 1: 4,
// 2: 1,
// 3: 10 }

const productsList = document.querySelector("#productsList");
const cartList = document.querySelector("#cartList");

const totalCount = document.querySelector("#totalCount");
const selectedCount = document.querySelector("#selectedCount");
const totalSum = document.querySelector("#totalSum");

const cartCount = document.querySelector("#cartCount");
const cartTotalCount = document.querySelector("#cartTotalCount");

const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");

const clearCartBtn = document.querySelector("#clearCart");
const removeSelectetBtn = document.querySelector("#removeSelectet");
const checkoutBtn = document.querySelector("#checkoutBtn");

const selectAllCheckbox = document.querySelector("#selectAll");

// Функция для форматирования цены
// 10000 -> 10 000 ₸
function formatPrice(price) {
  return price.toLocaleString("ru-RU") + " ₸";
}

// Функция для получение кол-ва товара
function getProductQuantity(productId) {
  return productQuantities[productId] || 1;
}

// Функция для изменения кол-ва товара
function changeProductQuantity(productId, change) {
  const currentQuantity = getProductQuantity(productId); // 4
  const newQuantity = currentQuantity + change;

  if (newQuantity < 1) {
    return;
  }

  productQuantities[productId] = newQuantity;
  renderProducts();
}

// Функция для отображения товаров из каталога
function renderProducts(productItems = products) {
  // Для очистки списка с товаром
  productsList.replaceChildren();

  if (productItems.length === 0) {
    const message = document.createElement("p"); // <p></p>
    message.className = "cart-empty"; // <p class="cart-empty"></p>
    message.textContent = "Ничего не найдено"; // <p class="cart-empty">Ничего не найдено</p>

    productsList.append(message);
    return;
  }
  const fragment = document.createDocumentFragment();

  productItems.forEach((product) => {
    const card = document.createElement("article"); // <article></article>
    card.className = "product__card"; // <article class="product__card"></article>

    const img = document.createElement("img"); // <img>
    img.className = "product__img"; // <img class="product__img">
    img.src = product.image; // <img class="product__img" src="">
    img.alt = product.name; // <img class="product__img" src="" alt="">

    const content = document.createElement("div"); // <div></div>
    content.className = "product__content"; // <div class="product__content"></div>

    const title = document.createElement("h3");
    title.className = "product__title";
    title.textContent = product.name;

    const desc = document.createElement("p");
    desc.className = "product__desc";
    desc.textContent = product.description;

    const category = document.createElement("p");
    category.className = "product__category";
    category.textContent = product.category;

    const price = document.createElement("p");
    price.className = "product__price";
    price.textContent = formatPrice(product.price);

    const actions = document.createElement("div");
    actions.className = "product__actions";

    const counter = document.createElement("div");
    counter.className = "product__counter";

    const minusBtn = document.createElement("button");
    minusBtn.className = "counter__btn";
    minusBtn.type = "button";
    minusBtn.textContent = "-";
    minusBtn.dataset.action = "decrease-card";
    minusBtn.dataset.productId = product.id;

    minusBtn.setAttribute("aria-label", "Умельшить кол-во: " + product.name);

    const quantity = document.createElement("span");
    quantity.className = "counter__value";
    quantity.textContent = getProductQuantity(product.id);

    const plusBtn = document.createElement("button");
    plusBtn.className = "counter__btn";
    plusBtn.type = "button";
    plusBtn.textContent = "+";
    plusBtn.dataset.action = "increase-card";
    plusBtn.dataset.productId = product.id;

    plusBtn.setAttribute("aria-label", "Увеличить кол-во: " + product.name);

    counter.append(minusBtn, quantity, plusBtn);

    const addBtn = document.createElement("button"); // <button></button>
    addBtn.className = "product__btn btn btn--add"; // <button class="product__btn btn btn--add"></button>
    addBtn.type = "button"; // <button class="product__btn btn btn--add" type="button"></button>
    addBtn.textContent = "Добавить в корзину"; // <button class="product__btn btn btn--add" type="button">Добавить в корзину</button>
    addBtn.dataset.action = "add-card";
    addBtn.dataset.productId = product.id; // <button class="product__btn btn btn--add" type="button" data-productId="">Добавить в корзину</button>

    actions.append(counter, addBtn);
    content.append(title, desc, category, price, actions);
    card.append(img, content);

    fragment.append(card);
  });

  productsList.append(fragment);
}

// Функции для карточки товара
productsList.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action]");

  if (!btn || !productsList.contains(btn)) {
    return;
  }

  const productId = Number(btn.dataset.productId);
  const action = btn.dataset.action;
  if (!Number.isInteger(productId)) {
    return;
  }
  if (action === "decrease-card") {
    changeProductQuantity(productId, -1);
  }
  if (action === "increase-card") {
    changeProductQuantity(productId, 1);
  }
  if (action === "add-card") {
  }
});

// Запускаем проект
renderProducts();
