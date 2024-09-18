import React, { act } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../src/app.tsx';
// import { delay } from './delay';

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

describe('React Project', () => {
  beforeAll(() => {
    const nativeConsoleError = console.error;
    console.error = function (...args) {
      if (!(typeof args[0] === 'string' && args[0].includes('When testing, code that causes React state updates should be wrapped into act(...):'))) {
        nativeConsoleError(...args);
      }
    };
  });

  test('没输入信息 - 点击登录', async () => {
    const { container } = render(<App />);
    const button = container.querySelector('#btn-login') as HTMLButtonElement;
    expect(button).toBeTruthy();
    act(() => {
      fireEvent.click(button);
    });
  });

  test('输入信息 - 登录出错', async () => {
    const { container } = render(<App />);
    const inputs = container.querySelectorAll('input');
    const inputName = inputs[0] as HTMLInputElement;
    const inputPwd = inputs[1] as HTMLInputElement;

    fireEvent.change(inputName, {
      target: { value: '123' }
    });
    fireEvent.change(inputPwd, {
      target: { value: '123' }
    });

    const button = document.querySelector('#btn-login') as HTMLButtonElement;
    expect(button).toBeTruthy();

    fireEvent.click(button);
  });

  test('输入信息 - 登录成功', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            message: '登录成功'
          })
      })
    ) as jest.Mock;
    const { container } = render(<App />);
    const inputs = container.querySelectorAll('input');
    const inputName = inputs[0] as HTMLInputElement;
    const inputPwd = inputs[1] as HTMLInputElement;

    fireEvent.change(inputName, {
      target: { value: '123' }
    });
    fireEvent.change(inputPwd, {
      target: { value: '123' }
    });

    const button = document.querySelector('#btn-login') as HTMLButtonElement;
    expect(button).toBeTruthy();

    fireEvent.click(button);
  });

  test('输入信息 - 登录失败', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: false,
            message: '登录失败'
          })
      })
    ) as jest.Mock;
    const { container } = render(<App />);
    const inputs = container.querySelectorAll('input');
    const inputName = inputs[0] as HTMLInputElement;
    const inputPwd = inputs[1] as HTMLInputElement;

    fireEvent.change(inputName, {
      target: { value: '123' }
    });
    fireEvent.change(inputPwd, {
      target: { value: '123' }
    });

    const button = document.querySelector('#btn-login') as HTMLButtonElement;
    expect(button).toBeTruthy();

    fireEvent.click(button);
  });
});
