function hideSelf() {
  let btn = document.querySelector('.hide-self-button');
  
    btn.addEventListener('click', {
        handleEvent(event) {
            btn.hidden = true;
        }
    })
}
