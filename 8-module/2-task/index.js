import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#getProductGrid();
    let productsGridInner = this.elem.querySelector('.products-grid__inner');
    for (let product of products) {
      let productCard = new ProductCard(product);
      productsGridInner.append(productCard.elem);
    }
  }
  #getProductGrid() {
    return createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);
  }
  updateFilter(filtersDiff) {
    Object.assign(this.filters, filtersDiff);
    let filtered = this.products.filter(product => !this.filters.noNuts || !product.nuts)
      .filter(product => !this.filters.vegeterianOnly || product.vegeterian)
      .filter(product => this.filters.maxSpiciness === undefined || product.spiciness <= this.filters.maxSpiciness)
      .filter(product => !this.filters.category || this.filters.category === product.category);
    let productsGridInner = this.elem.querySelector('.products-grid__inner');
    productsGridInner.innerHTML = "";
    for (let product of filtered) {
      let productCard = new ProductCard(product);
      productsGridInner.append(productCard.elem);
    }
  }
}