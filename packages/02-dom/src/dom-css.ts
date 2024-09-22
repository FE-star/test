type DataItem = {
  id: number;
  name: string;
};

export function render() {
  const dataList: DataItem[] = [
    { id: 0, name: 'test name 0' },
    { id: 1, name: 'test name 1' },
    { id: 2, name: 'test name 2' },
    { id: 3, name: 'test name 3' },
    { id: 4, name: 'test name 4' }
  ];

  const root = document.querySelector('#root') as HTMLDivElement;

  const html = `
    <style>
    .app-container { background: rgb(240, 240, 240);  }
    .app-data-list { background: rgb(160, 160, 160);  }
    .app-data-item { background: rgb(192, 192, 192); color: rgb(34, 34, 34);  }
    </style>
    
    <div class="app-container">
      <div class="app-data-list">
        ${dataList
          .map((item) => {
            return `<div class="app-data-item">${item.name}</div>`;
          })
          .join('')}
      </div>
    </div>
  `;

  root.innerHTML = html;
}
