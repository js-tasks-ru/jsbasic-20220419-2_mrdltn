import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();

    this.elem.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', this.keyClose);    
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('modal');

    this.elem.innerHTML = `
                    <div class="modal__overlay"></div>
                    <div class="modal__inner">
                      <div class="modal__header">
                        <!--Кнопка закрытия модального окна-->
                        <button type="button" class="modal__close">
                          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                        </button>
                        <h3 class="modal__title">
                          Вот сюда нужно добавлять заголовок
                        </h3>
                      </div>
                      <div class="modal__body">
                        A сюда нужно добавлять содержимое тела модального окна
                      </div>
                    </div>`;
  }

  setTitle = (title) => {
    this.elem.querySelector('.modal__title').innerHTML = title;
  }

  setBody = (html) => {
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').appendChild(html);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
  }

  close = (event) => {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    /* document.querySelector('.is-modal-open').querySelector('.modal').remove();
    document.querySelector('.is-modal-open').classList.remove('is-modal-open'); */

    document.removeEventListener('keydown', this.keyClose);
  }

  keyClose =()=> {
    if (event.code == 'Escape') { this.close(); }
    document.removeEventListener('keydown', this.keyClose);

  }
}