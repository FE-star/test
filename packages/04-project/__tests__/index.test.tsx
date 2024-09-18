import { fireEvent } from '@testing-library/react';

const root = document.createElement('div');
root.setAttribute('id', 'app');
document.body.appendChild(root);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

function delay(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

describe('React Project', () => {
  beforeAll(() => {
    const nativeConsoleError = console.error;
    console.error = function (...args) {
      if (!(typeof args[0] === 'string' && args[0].includes('When testing, code that causes React state updates should be wrapped into act(...):'))) {
        nativeConsoleError(...args);
      }
    };
  });

  beforeAll((done) => {
    import('../src/index.tsx')
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test('dom', () => {
    const app = document.querySelector('#app') as HTMLDivElement;
    expect(app).toBeTruthy();
  });
  test('没输入信息 - 点击登录', async () => {
    await delay(1000);
    const button = document.querySelector('#btn-login') as HTMLButtonElement;
    expect(button).toBeTruthy();

    button.click();
    // fireEvent.click(button);
    // button.dispatchEvent(new Event('click', { bubbles: true }));
  });

  test('输入信息 - 点击登录', async () => {
    await delay(1000);

    const inputs = document.querySelectorAll('input');
    const inputName = inputs[0] as HTMLInputElement;
    const inputPwd = inputs[1] as HTMLInputElement;
    // inputName.value = '123';
    // inputPwd.value = '123';
    // inputName.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, target: { value: '123' }, value: '123' }));
    // inputPwd.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, target: { value: '123' }, value: '123' }));

    fireEvent.change(inputName, {
      target: { value: '123' }
    });
    fireEvent.change(inputPwd, {
      target: { value: '123' }
    });

    const button = document.querySelector('#btn-login') as HTMLButtonElement;
    expect(button).toBeTruthy();

    button.click();
    // fireEvent.click(button);
    // button.dispatchEvent(new Event('click', { bubbles: true }));
  });
});
