type DataItem = {
  id: number;
  name: string;
};

function renderList() {
  const dataList: DataItem[] = [
    { id: 0, name: 'test name 0' },
    { id: 1, name: 'test name 1' },
    { id: 2, name: 'test name 2' },
    { id: 3, name: 'test name 3' },
    { id: 4, name: 'test name 4' }
  ];

  const list = document.querySelector('#list') as HTMLDivElement;

  const html = ` 
    <div class="app-data-list">
      ${dataList
        .map((item) => {
          return `<div class="app-data-item">${item.name}</div>`;
        })
        .join('')}
    </div> 
  `;
  list.innerHTML = html;
}

function bindEvent() {
  const btn = document.querySelector('#btn-get-data');
  btn?.addEventListener('click', () => {
    renderList();
  });
}

export function renderAndBindEvent() {
  const root = document.querySelector('#root') as HTMLDivElement;
  root.innerHTML = `
  <div>
    <button id="btn-get-data">获取数据</button>
    <div id="list"></div>
  </div>
  `;
  bindEvent();
}
