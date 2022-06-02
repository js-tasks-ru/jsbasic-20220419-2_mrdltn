export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();

    this.elem.addEventListener('click', this.sliderValue);
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
}