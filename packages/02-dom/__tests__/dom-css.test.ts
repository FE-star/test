import { render } from '../src/dom-css';

describe('CSS', () => {
  beforeAll(() => {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

    render();
  });

  test('DOM css', () => {
    const root = document.querySelector('#root') as HTMLDivElement;
    const app = root.querySelector('.app-container') as HTMLDivElement;
    const appComputedStyle = window.getComputedStyle(app);
    expect(appComputedStyle.backgroundColor).toBe('rgb(240, 240, 240)'); // #F0F0F0

    const list = app.querySelector('.app-data-list') as HTMLDivElement;
    const listComputedStyle = window.getComputedStyle(list);
    expect(listComputedStyle.backgroundColor).toBe('rgb(160, 160, 160)'); // #A0A0A0

    const items = app.querySelectorAll('.app-data-item');
    const itemComputedStyle = window.getComputedStyle(items[0]);
    expect(itemComputedStyle.backgroundColor).toBe('rgb(192, 192, 192)'); // #C0C0C0
    expect(itemComputedStyle.color).toBe('rgb(34, 34, 34)'); // #222222
  });
});
