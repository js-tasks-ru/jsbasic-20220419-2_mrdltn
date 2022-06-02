export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
    this.labelButtons();

    this.elem.addEventListener('row-delete', (event) => { 
      let btn = event.detail;
      btn.closest('tr').remove();
    });

  }

  render() {
    this.elem = document.createElement('table');
    let tbody = document.createElement('tbody');
    this.elem.append(tbody);

    this.rows.forEach(row => {
      this.elem.firstElementChild.innerHTML += `<tr>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.salary}</td>
            <td>${row.city}</td>
            <td><button>X</button></td>
          </tr>`;
    });
  }

  labelButtons() {
    let btnList = this.elem.querySelectorAll('button');
    for (let btn of btnList) {
      btn.addEventListener('click', this.onClick);
    }
  }

  onClick = (event) => {
    let customEvent = new CustomEvent('row-delete', { bubbles: true, detail: event.target });
    this.elem.dispatchEvent(customEvent);
  }

}