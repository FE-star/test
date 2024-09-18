import { render } from '../src/dom';

describe('DOM', () => {
  beforeAll(() => {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

    render();
  });

  test('snapshot', () => {
    const root = document.querySelector('#root');
    expect(root).toMatchSnapshot();
  });

  test('dom', () => {
    const root = document.querySelector('#root') as HTMLDivElement;
    const app = root.querySelector('.app-container') as HTMLDivElement;
    expect(app).toBeTruthy();

    const list = app.querySelector('.app-data-list') as HTMLDivElement;
    expect(list).toBeTruthy();

    const items = app.querySelectorAll('.app-data-item');
    expect(items.length).toBe(5);
  });
});
