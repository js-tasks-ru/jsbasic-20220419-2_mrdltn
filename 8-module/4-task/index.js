import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }
    let idx = this.cartItems.findIndex((item) => product.id === item.product.id);
    if (idx === -1) {
      this.cartItems.push({product: product, count: 0});
      idx = this.cartItems.length - 1;
    }
    this.cartItems[idx].count++;
    this.onProductUpdate(this.cartItems[idx]);
  }

  updateProductCount(productId, amount) {
    let idx = this.cartItems.findIndex((item) => productId === item.product.id);
    this.cartItems[idx].count += amount;
    let saved = this.cartItems[idx];
    if (this.cartItems[idx].count === 0) {
      this.cartItems.splice(idx, 1);
    }
    this.onProductUpdate(saved);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modalWindow = new Modal();
    this.modalWindow = modalWindow;
    modalWindow.setTitle('Your order');
    let modalBody = document.createElement('div');
    this.cartItems.forEach(item => modalBody.append(this.renderProduct(item.product, item.count)));
    modalBody.append(this.renderOrderForm());
    modalWindow.setBody(modalBody);
    modalWindow.elem.addEventListener('click', (event) => {
      let button = event.target.closest('.cart-counter__button');
      if (!button) {
        return;
      }
      if (button.classList.contains('cart-counter__button_minus')) {
        let productId = button.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, -1);
      } else if (button.classList.contains('cart-counter__button_plus')) {
        let productId = button.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, 1);
      }
    });
    modalWindow.elem.querySelector('.cart-form').addEventListener('submit', (event) => {
      this.onSubmit(event);
    });
    modalWindow.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (!document.querySelector('body').classList.contains('is-modal-open')) {
      return;
    }
    let productId = cartItem.product.id;
    let modalBody = this.modalWindow.elem.querySelector('.modal__body');
    let cartProduct = modalBody.querySelector(`[data-product-id="${productId}"]`);
    let productCount = cartProduct.querySelector('.cart-counter__count');
    let productPrice = cartProduct.querySelector('.cart-product__price');
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    if (cartItem.count === 0) {
      cartProduct.remove();
    }
    if (this.cartItems.length === 0) {
      this.modalWindow.close();
      delete (this, 'modalWindow');
    }
  }
  renderFormSuccess() {
    return createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
    `);
  }
  onSubmit(event) {
    event.preventDefault();
    document.querySelector(`[type="submit"]`).classList.add('is-loading');
    let cartForm = document.querySelector('.cart-form');
    let formData = new FormData(cartForm);
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    }).then(() => {
      this.modalWindow.setTitle('Success!');
      this.cartItems = [];
      this.modalWindow.setBody(this.renderFormSuccess());
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}