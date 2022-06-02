export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}