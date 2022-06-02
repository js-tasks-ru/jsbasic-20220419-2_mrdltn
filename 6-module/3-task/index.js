import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(this.#template());
    this.#makeButton();
    this.#buttonClickEvent();
  }

  #template () { 
    return `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
      ${this.#templateSlides()}
      </div>
    </div> 
    `;
  }

  #templateSlides() {
    return this.slides.map(item =>
      `<div class="carousel__slide" data-id="${item.id}">
  <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${item.price.toFixed(2)}</span>
    <div class="carousel__title">${item.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
  </div>
  `).join("\n");
  }
 
  #makeButton() {
    let carouselInner = this.elem.querySelector('.carousel__inner');
    let btnRight = this.elem.querySelector('.carousel__arrow_right');
    let btnLeft = this.elem.querySelector('.carousel__arrow_left');
    this.position = 0;
    
    const btns = () => {
      carouselInner.style.transform = 'translateX(-' + this.position * carouselInner.offsetWidth + `px)`;

      if (this.position == 0) {
        btnLeft.style.display = 'none';
      } else {
        btnLeft.style.display = '';
      }
      
      if (this.position == this.slides.length - 1) {
        btnRight.style.display = 'none';
      } else {
        btnRight.style.display = '';
      }
    };

    btns();

    btnRight.addEventListener("click", () => {
      this.position += 1;
      btns();
    });

    btnLeft.addEventListener("click", () => {
      this.position -= 1;
      btns();
    });
  }

  #buttonClickEvent() {
    let buttons = this.elem.querySelectorAll('.carousel__button');
    buttons.forEach(button => addEventListener('click', (event) => {
      let slide = event.target.closest('.carousel__slide');
      if (!slide) {return;}

      const customEvent = new CustomEvent('product-add', {
        bubbles: true,
        detail: slide.dataset.id
      });
      button.dispatchEvent(customEvent);
    }));
  }
}