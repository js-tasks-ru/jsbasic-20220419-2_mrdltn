export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();

    this.elem.addEventListener('click', this.sliderValue);
    this.elem.addEventListener('pointerdown', this.sliderDrop);
    //console.log(this.elem);
  }
  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');

    this.elem.innerHTML = `
                            <div class="slider__thumb" style="left: 50%;">
                              <span class="slider__value">2</span>
                            </div>
                            <!--Заполненная часть слайдера-->
                            <div class="slider__progress" style="width: 50%;"></div>
                            <!--Шаги слайдера-->
                            <div class="slider__steps"></div>`;

    const sliderSteps = this.elem.querySelector('.slider__steps');

    for (let i = 0; i < this.steps; i++) {
      if (i == 0) {
        sliderSteps.innerHTML += `<span class="slider__step-active"></span>`;
      } else {
        sliderSteps.innerHTML += `<span></span>`;
      }
    }
  }

  sliderValue = () => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }
    this.value = Math.round(leftRelative * (this.steps - 1));
    let valuePercents = (this.value / (this.steps - 1)) * 100;

    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;
    this.elem.querySelector('.slider__value').innerHTML = `${this.value}`;

    this.elem.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    })
    );
  }

  sliderDrop = () => {
    event.preventDefault();

    let thumb = this.elem.querySelector('.slider__thumb');
    this.elem.classList.add('slider_dragging');

    let onPointerMove = () => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;
      this.value = Math.round(leftRelative * (this.steps - 1));

      this.elem.querySelector('.slider__thumb').style.left = `${leftPercents}%`;
      this.elem.querySelector('.slider__progress').style.width = `${leftPercents}%`;
      this.elem.querySelector('.slider__value').innerHTML = `${this.value}`;

      let spanList = this.elem.querySelectorAll('.slider__steps span');
      spanList.forEach(span => span.classList.remove('slider__step-active'));
      spanList[this.value].classList.add('slider__step-active');

      event.preventDefault();
    };

    let onPointerUp = () => {
      this.sliderValue();

      this.elem.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })
      );

      this.elem.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);

    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);

    thumb.ondragstart = () => false;
  }
}