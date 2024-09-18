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
    .app-container { background: #F0F0F0;  }
    .app-data-list { background: #A0A0A0;  }
    .app-data-item { background: #C0C0C0; color: #222222;  }
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
