export default function promiseClick(button) {
  let promise = new Promise((resolve) => {
    button.addEventListener('click', (event) => {
      resolve(event);
    }, true);
  });
  return promise;
}
