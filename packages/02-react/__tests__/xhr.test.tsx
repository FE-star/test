import React from 'react';
import { render } from '@testing-library/react';
import sinon from 'sinon/pkg/sinon.js';
import { App } from '../src/xhr';

// https://sinonjs.org/releases/v19/fake-xhr-and-server/
describe('App', () => {
  test('xhr success', () => {
    let server = sinon.fakeServer.create();
    server.respondWith('GET', 'https://example.com/requestData', [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        success: true,
        dataList: [
          { id: 0, name: 'test name 0' },
          { id: 1, name: 'test name 1' },
          { id: 2, name: 'test name 2' },
          { id: 3, name: 'test name 3' },
          { id: 4, name: 'test name 4' }
        ]
      })
    ]);

    const { container } = render(<App />);
    server.respond();

    const doms = container.querySelectorAll('.data-item');
    expect(doms.length).toBe(5);
    server.restore();
  });

  test('xhr fail', () => {
    let server = sinon.fakeServer.create();
    server.respondWith('GET', 'https://example.com/requestData', [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        success: false
      })
    ]);

    const { container } = render(<App />);
    server.respond();

    const doms = container.querySelectorAll('.data-item');
    expect(doms.length).toBe(0);
    server.restore();
  });

  test('xhr error', () => {
    const fakeConsoleLog = jest.fn();
    const nativeConsoleLog = console.log;
    console.log = fakeConsoleLog;

    let server = sinon.fakeServer.create();
    server.respondWith('GET', 'https://example.com/requestData', [0, {}, '']);

    const { container } = render(<App />);
    server.respond();
    const doms = container.querySelectorAll('.data-item');
    expect(doms.length).toBe(0);
    server.restore();
    expect(fakeConsoleLog.mock.calls[0][0]).toBe(`XHR 获取数据失败，错误信息`);
    console.log = nativeConsoleLog;
  });
});
