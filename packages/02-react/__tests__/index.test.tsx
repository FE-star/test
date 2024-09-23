import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { App } from '../src/index';

describe('App', () => {
  test('snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  test('click', () => {
    const { container } = render(<App />);
    const text = container.querySelector('.counter-text');
    expect(text?.textContent).toBe('count:0');

    const btn = container.querySelector('.counter-btn');
    // 可以替换成 btn.click() 吗？
    // 为什么？
    fireEvent.click(btn as HTMLElement);
    expect(text?.textContent).toBe('count:1');

    fireEvent.click(btn as HTMLElement);
    expect(text?.textContent).toBe('count:2');
  });
});
