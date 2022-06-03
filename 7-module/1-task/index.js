import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();

    this.rightArrow = this.elem.querySelector('.ribbon__arrow_right');
    this.leftArrow = this.elem.querySelector('.ribbon__arrow_left');

    this.elem.querySelector('.ribbon__arrow_right').addEventListener('click', this.arrowRight);
    this.elem.querySelector('.ribbon__arrow_left').addEventListener('click', this.arrowLeft);
    this.ribbonInner.addEventListener('scroll', this.arrowHidden);
    this.ribbonInner.addEventListener('click', this.itemActive);

  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.elem.innerHTML = `
                <button class="ribbon__arrow ribbon__arrow_left">
                  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                </button>
                <!--Ссылки на категории-->
                <nav class="ribbon__inner"> </nav>
                <!--Кнопка прокрутки вправо-->
                <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
                  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                </button>`;

    this.ribbonInner = this.elem.querySelector('.ribbon__inner');

    this.categories.forEach((categorie, ind) => {
      if (ind == 0) {
        this.ribbonInner.innerHTML += `<a href="#" class="ribbon__item ribbon__item_active" data-id="${categorie.id}">${categorie.name}</a>`;
      } else {
        this.ribbonInner.innerHTML += `<a href="#" class="ribbon__item" data-id="${categorie.id}">${categorie.name}</a>`;
      }
    });
  }

  arrowRight = () => {
    this.ribbonInner.scrollBy(350, 0);
  }

  arrowLeft = () => {
    this.ribbonInner.scrollBy(-350, 0);
  }

  arrowHidden = () => {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth; // число пикселей, например, 100 или 0.
    this.leftArrow.classList.add('ribbon__arrow_visible');
    this.rightArrow.classList.add('ribbon__arrow_visible');

    if (scrollLeft < 1) {
      this.leftArrow.classList.remove('ribbon__arrow_visible');
    }
    if (scrollRight < 1) {
      this.rightArrow.classList.remove('ribbon__arrow_visible');
    }
  }

  itemActive = () => {
    event.preventDefault();

    const achors = this.elem.querySelectorAll('.ribbon__item');
    achors.forEach(achor => achor.classList.remove('ribbon__item_active'));

    event.target.classList.add('ribbon__item_active');
    
    console.log(event.target.closest(".ribbon__item").getAttribute("data-id"));

    this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: event.target.closest(".ribbon__item").getAttribute("data-id"), 
      bubbles: true 
    })
    );
  }

}