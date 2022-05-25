function toggleText() {

  let hdntxt = document.querySelector('.toggle-text-button');
  let txt = document.getElementById('text');

    function handler() {
        txt.hidden = !txt.hidden;
    }

  hdntxt.addEventListener('click', handler);

}
