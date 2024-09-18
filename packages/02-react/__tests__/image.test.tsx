import React from 'react';
import { render } from '@testing-library/react';
import { App } from '../src/image';

document.createElement = (function (create) {
  return function () {
    const elem: HTMLElement = create.apply(this, arguments);
    if (elem.tagName === 'IMG') {
      setTimeout(() => {
        const src = elem.getAttribute('src');
        if (src?.endsWith('error.png')) {
          elem?.dispatchEvent(new Event('error'));
        } else {
          elem?.dispatchEvent(new Event('load'));
        }
      }, 100);
    }
    return elem;
  };
})(document.createElement);

describe('Image Request', () => {
  test('render', () => {
    const { container } = render(<App src={'https://example.com/test.png'} />);
    const imgs = container.querySelectorAll('.app img');
    expect(imgs.length).toBe(1);
    const img = imgs[0];
    expect(img.getAttribute('src')).toBe('https://example.com/test.png');
  });

  test('onLoad', (done) => {
    const { container } = render(
      <App
        src={'https://example.com/load.png'}
        onLoad={() => {
          done();
        }}
      />
    );
    const imgs = container.querySelectorAll('.app img');
    expect(imgs.length).toBe(1);
  });

  test('onError', (done) => {
    const { container } = render(
      <App
        src={'https://example.com/error.png'}
        onError={() => {
          done();
        }}
      />
    );
    const imgs = container.querySelectorAll('.app img');
    expect(imgs.length).toBe(1);
  });
});
