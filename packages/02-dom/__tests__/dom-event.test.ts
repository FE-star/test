import { renderAndBindEvent } from '../src/dom-event';

describe('DOM Event', () => {
  beforeAll(() => {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
    renderAndBindEvent();
  });

  test('click', () => {
    const root = document.querySelector('#root') as HTMLDivElement;
    const btn = root.querySelector('#btn-get-data') as HTMLButtonElement;
    expect(btn).toBeTruthy();

    const list = root.querySelector('#list') as HTMLDivElement;
    expect(list).toBeTruthy();

    expect(root.querySelectorAll('.app-data-item').length).toBe(0);

    // 触发 按钮 click事件
    btn.dispatchEvent(new Event('click'));

    expect(root.querySelectorAll('.app-data-item').length).toBe(5);
  });
});
