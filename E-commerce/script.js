const cart = document.querySelector("nav .cart");
const cartSideBar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");
const burger = document.querySelector(".burger");
const menuSidebar = document.querySelector(".menu-sidebar");
const closeMenu = document.querySelector(".close-menu");
const cartItemsTotal = document.querySelector(".noi"); // Ensure selector is correct
const cartPriceTotal = document.querySelector(".total-amount");
const cartUi = document.querySelector(".cart-sidebar .cart");
const totalDiv = document.querySelector(".total-sum");
const clearBtn = document.querySelector(".clear-cart-btn");
const cartContent = document.querySelector(".cart-content");

let Cart = [];
let buttonDOM = [];

// Open cart sidebar
cart.addEventListener("click", function() {
    cartSideBar.style.transform = "translate(0%)"; // Show cart sidebar
    const bodyOverlay = document.createElement("div");
    bodyOverlay.classList.add("overlay");
    setTimeout(function() {
        document.querySelector("body").append(bodyOverlay);
    }, 300);
});

// Close cart sidebar
closeCart.addEventListener("click", function() {
    cartSideBar.style.transform = "translate(100%)"; // Hide cart sidebar
    const bodyOverlay = document.querySelector(".overlay");
    if (bodyOverlay) {
        document.querySelector("body").removeChild(bodyOverlay);
    }
});

// Open menu sidebar
burger.addEventListener("click", function() {
    menuSidebar.style.transform = "translate(0%)"; // Show menu sidebar
});

// Close menu sidebar
closeMenu.addEventListener("click", function() {
    menuSidebar.style.transform = "translate(-100%)"; // Hide menu sidebar
});

class Product {
    async getProduct() {
        const response = await fetch("products.json");
        const data = await response.json();
        let products = data.items;
        products = products.map(item => {
            const { title, price } = item.fields;
            const { id } = item.sys;
            const image = item.fields.image.fields.file.url;
            return { title, price, id, image };
        });
        return products;
    }
}

class UI {
    displayProducts(products) {
        let result = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="product">
                    <span class="add-to-cart" data-id="${product.id}">
                        <i class="fa fa-cart-plus fa-1x" style="margin-right:0.1em; font-size: 1em;"></i>
                        Add to cart
                    </span>
                    <div class="product-name">${product.title}</div>
                    <div class="product-pricing">${product.price}</div>
                </div>`;
            const p = document.querySelector(".product");
            p.append(productDiv);
        });
    }

    getButtons() {
        const btns = document.querySelectorAll(".add-to-cart");
        buttonDOM = Array.from(btns);
        btns.forEach(btn => {
            let id = btn.dataset.id;
            let inCart = Cart.find(item => item.id === id);
            if (inCart) {
                btn.innerHTML = "In Cart";
                btn.disabled = true;
            }
            btn.addEventListener("click", (e) => {
                e.currentTarget.innerHTML = "In Cart";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.pointerEvents = "none";
                let cartItem = { ...Storage.getStorageProducts(id), amount: 1 };
                Cart.push(cartItem);
                Storage.saveCart(Cart);
                this.setCartValues(Cart);
                this.addCartItem(cartItem);
            });
        });
    }

    setCartValues(cart) {
        let tempTotal = 0;
        let itemTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemTotal += item.amount;
        });
        cartItemsTotal.innerHTML = itemTotal;
        cartPriceTotal.innerHTML = parseFloat(tempTotal.toFixed(2));
    }

    addCartItem(cartItem) {
        let cartItemUi = document.createElement("div");
        cartItemUi.innerHTML = `
            <div class="cart-product">
                <div class="product-image">
                    <img src="${cartItem.image}" alt="product">
                </div>
                <div class="cart-product-content">
                    <div class="cart-product-name"><h3>${cartItem.title}</h3></div>
                    <div class="cart-product-price"><h3>$${cartItem.price}</h3></div>
                    <div class="cart-product-remove" data-id="${cartItem.id}" href="#" style="color:red;">remove</div>
                </div>
                <div class="plus-minus">
                    <i class="fa fa-angle-left reduce-amount" data-id="${cartItem.id}"></i>
                    <span class="no-of-items">${cartItem.amount}</span>
                    <i class="fa fa-angle-right add-amount" data-id="${cartItem.id}"></i>
                </div>
            </div>`;
        cartContent.append(cartItemUi);
    }

    setupApp() {
        Cart = Storage.getCart();
        this.setCartValues(Cart);
        Cart.forEach(item => {
            this.addCartItem(item);
        });
    }

    cartLogic() {
        clearBtn.addEventListener("click", () => {
            this.clearCart();
        });

        cartContent.addEventListener("click", (event) => {
            if (event.target.classList.contains("cart-product-remove")) {
                let id = event.target.dataset.id;
                this.removeItem(id);
                event.target.parentElement.parentElement.remove();
            } else if (event.target.classList.contains("add-amount")) {
                let id = event.target.dataset.id;
                let item = Cart.find(item => item.id === id);
                item.amount++;
                Storage.saveCart(Cart);
                this.setCartValues(Cart);
                event.target.nextElementSibling.innerHTML = item.amount;
            } else if (event.target.classList.contains("reduce-amount")) {
                let id = event.target.dataset.id;
                let item = Cart.find(item => item.id === id);
                if (item.amount > 1) {
                    item.amount--;
                    Storage.saveCart(Cart);
                    this.setCartValues(Cart);
                    event.target.previousElementSibling.innerHTML = item.amount;
                } else {
                    this.removeItem(id);
                    event.target.parentElement.parentElement.remove();
                }
            }
        });
    }

    clearCart() {
        Cart.forEach(item => this.removeItem(item.id));
        const cartProducts = document.querySelectorAll(".cart-product");
        cartProducts.forEach(item => {
            item.remove();
        });
    }

    removeItem(id) {
        Cart = Cart.filter(item => item.id !== id);
        this.setCartValues(Cart);
        Storage.saveCart(Cart);
        let button = this.getSingleButton(id);
        button.style.pointerEvents = "auto";
        button.innerHTML = `<i class="fa fa-cart-plus"></i>Add to Cart`;
    }

    getSingleButton(id) {
        return buttonDOM.find(button => button.dataset.id === id);
    }
}

class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getStorageProducts(id) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        return products.find((item) => item.id === id);
    }

    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    static getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Product();

    ui.setupApp();

    products.getProduct().then((products) => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getButtons();
        ui.cartLogic();
    });
});
