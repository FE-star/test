import { requestDataList } from '../src/fetch';

describe('App', () => {
  test('fetch success', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            dataList: [
              { id: 0, name: 'test name 0' },
              { id: 1, name: 'test name 1' },
              { id: 2, name: 'test name 2' },
              { id: 3, name: 'test name 3' },
              { id: 4, name: 'test name 4' }
            ]
          })
      })
    ) as jest.Mock;
    const dataList = await requestDataList();
    expect(dataList.length).toBe(5);
  });

  test('fetch fail', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: false,
            dataList: []
          })
      })
    ) as jest.Mock;

    const dataList = await requestDataList();
    expect(dataList.length).toBe(0);
  });

  test('fetch error', async () => {
    const fakeConsoleLog = jest.fn();
    const nativeConsoleLog = console.log;
    console.log = fakeConsoleLog;

    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.reject({
            success: false,
            error: 'fetch错误'
          })
      })
    ) as jest.Mock;

    const dataList = await requestDataList();
    expect(dataList.length).toBe(0);

    expect(dataList.length).toBe(0);
    expect(fakeConsoleLog.mock.calls[0][0]).toBe(`window.fetch 获取数据失败，错误信息`);
    expect(fakeConsoleLog.mock.calls[0][1]).toStrictEqual({ success: false, error: 'fetch错误' });

    console.log = nativeConsoleLog;
  });
});
