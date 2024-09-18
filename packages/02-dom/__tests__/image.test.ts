import { renderImage } from '../src/image';

// 模拟Image DOM 事件触发逻辑
document.createElement = (function (create) {
  return function () {
    const elem: HTMLElement = create.apply(this, arguments);
    if (elem.tagName === 'IMG') {
      setTimeout(() => {
        elem?.dispatchEvent(new Event('error'));
      }, 10);
      setTimeout(() => {
        elem?.dispatchEvent(new Event('load'));
      }, 20);
    }
    return elem;
  };
})(document.createElement);

function delay(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

describe('Image', () => {
  beforeAll(() => {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
  });

  test('load and error', async () => {
    const fakeConsoleLog = jest.fn();
    const nativeConsoleLog = console.log;
    console.log = fakeConsoleLog;

    renderImage();
    await delay(100);
    expect(fakeConsoleLog.mock.calls[0][0]).toBe(`error: 加载图片失败`);
    expect(fakeConsoleLog.mock.calls[1][0]).toBe(`load: 加载图片成功`);

    console.log = nativeConsoleLog;
  });
});
