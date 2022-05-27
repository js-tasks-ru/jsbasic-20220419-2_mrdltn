export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.table = document.createElement('table');
    this.table.innerHTML = `<thead> <tr> <th> Имя </th> <th> Возраст </th> <th> Зарплата </th> <th> Город </th> <th> </th> </tr> </thead>`;
    this.tbody = document.createElement('tbody');

    const newRows = this.rows.map(item => {
      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td> <button> X </button> </td>
        </tr>`;
    }).join('');
    
    this.tbody.innerHTML = newRows;
    this.table.append(this.tbody);
    
    this.table.addEventListener('click', event => {
        if (event.target.tagName === 'BUTTON') {
          const delRow = event.target.closest(`tr`);
          delRow.remove();
          
        }
      });
  }

  get elem(){
    return this.table;
  }
}
