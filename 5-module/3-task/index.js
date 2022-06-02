function initCarousel() {
  let carouselInner = document.querySelector('.carousel__inner');
    
  let btnRight = document.querySelector('.carousel__arrow_right');
  let btnLeft = document.querySelector('.carousel__arrow_left');
   
  let width = carouselInner.offsetWidth;
  let position = 0;

  
  btnRight.addEventListener("click", () => {
    position += width;
    carouselInner.style.transform = 'translateX(' + (-position) + 'px)';
    btns();
  });

  btnLeft.addEventListener("click", () => {
    position -= width;
    carouselInner.style.transform = 'translateX(' + (-position) + 'px)';
    btns();
  });
    
  const btns = () => {
    if (position <= width * 0.5) {
      btnLeft.style.display = 'none';
    } else {
      btnLeft.style.display = '';
    }

    let newPosition = width * 2;
    if (position > newPosition) {
      btnRight.style.display = 'none';
    } else {
      btnRight.style.display = '';
    }
  };
  btns();
}