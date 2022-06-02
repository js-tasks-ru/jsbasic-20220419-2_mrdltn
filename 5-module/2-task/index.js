function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');

  button.onclick = function() {
    text.hidden = !text.hidden;
  }
}