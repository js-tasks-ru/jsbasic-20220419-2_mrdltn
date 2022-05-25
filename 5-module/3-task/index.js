function initCarousel() {
  let btnLeft = document.querySelector('.carousel__arrow_left');
  let btnRight = document.querySelector('.carousel__arrow_right');
  let slide = document.querySelector('.carousel__inner');
  let transWidth = 0;
  let quantitySlides = document.querySelectorAll('.carousel__slide').length;
  btnLeft.style.display = 'none';

  function scrollRight(){
    transWidth += slide.offsetWidth; 
    slide.style.transform = `translateX(-${transWidth}px)`;
    if (transWidth == ((quantitySlides - 1) * slide.offsetWidth)){btnRight.style.display = 'none';}
    if (btnLeft.style.display == 'none') {btnLeft.style.display = '';}
  }
  
  function scrollLeft(){
    transWidth -= slide.offsetWidth; 
    slide.style.transform = `translateX(-${transWidth}px)`;
    
    if (transWidth == 0 ) {btnLeft.style.display = 'none';}
    if (btnRight.style.display == 'none') {btnRight.style.display = '';}
  }

  btnRight.addEventListener('click',scrollRight);
  btnLeft.addEventListener('click',scrollLeft);
}
