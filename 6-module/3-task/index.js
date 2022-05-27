import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
      </div>
    </div>
    `);

    this.innerCarousel = this.elem.querySelector('.carousel__inner');

    this.innerCarousel.innerHTML = this.slides.map(item =>{ return `
     <div class="carousel__slide" data-id="${item.id}">
      <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${item.price.toFixed(2)}</span>
        <div class="carousel__title">${item.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `}).join('');

    this.elem.addEventListener('click', (event) => {
      const slide = event.target.closest('.carousel__slide');
            
      if (event.target.closest('.carousel__button')) {
      const productAdd = new CustomEvent("product-add", { 
        detail: slide.dataset.id, 
        bubbles: true 
      });
      this.elem.dispatchEvent(productAdd);
      }
    });

    this.elem.addEventListener('product-add', (event) => {
      return event.detail;
    });
    
    const buttonRight = this.elem.querySelector('.carousel__arrow_right');
    const buttonLeft = this.elem.querySelector('.carousel__arrow_left');
    const carousel = this.elem.querySelector('.carousel__inner');
    let transWidth = 0;
    let quantitySlides = this.elem.querySelectorAll('.carousel__slide').length;
    buttonLeft.style.display = 'none';
  
    function scrollRight(){
      transWidth += carousel.offsetWidth; 
      carousel.style.transform = `translateX(-${transWidth}px)`;
      if (transWidth == ((quantitySlides - 1) * carousel.offsetWidth)){buttonRight.style.display = 'none';}
      if (buttonLeft.style.display == 'none') {buttonLeft.style.display = '';}
    }
    
    function scrollLeft(){
      transWidth -= carousel.offsetWidth; 
      carousel.style.transform = `translateX(-${transWidth}px)`;
      
      if (transWidth == 0 ) {buttonLeft.style.display = 'none';}
      if (buttonRight.style.display == 'none') {buttonRight.style.display = '';}
    }
    buttonRight.addEventListener('click',scrollRight);
    buttonLeft.addEventListener('click',scrollLeft);
    
    
  }
}
