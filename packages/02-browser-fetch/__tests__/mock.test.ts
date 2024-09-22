describe.skip('mock', () => {
  test('use jest.fn()', () => {
    const myFn = jest.fn((x, y) => x + y)
    
    // 被调用几次
    console.log('call times ===', myFn.mock.calls.length)

    myFn(1, 2)
    console.log('call times ===', myFn.mock.calls.length)
    // 每次调用参数
    console.log('calls ===', myFn.mock.calls)
    
    const obj = {
      name: 'Hello',
      myFn: myFn
    }

    obj.myFn(3, 4)
    console.log('call this ===', myFn.mock.instances[1])

    myFn.mockReturnValueOnce('hello').mockReturnValueOnce('world')
    console.log(myFn(undefined, undefined), myFn(undefined, undefined))
  })

  test('use jest.fn() for promise', async () => {
    const myFn = jest.fn()

    myFn.mockResolvedValueOnce('hello')
      .mockRejectedValueOnce('async error')

    expect(await myFn()).toBe('hello')
    await expect(myFn()).rejects.toMatch('async error')
  })

  test('use jest.spyOn()', () => {
    const utils = {
      add: (x, y) => x + y
    }

    const spyInstanceAdd = jest.spyOn(utils, 'add')

    utils.add(1, 2)
    expect(utils.add).toHaveBeenCalledTimes(1)
    console.log(spyInstanceAdd.mock)
  })

  test('use jest.spyOn() for getter & setter', () => {
    const location = {
      _title: 'xxx',
      get title() {
        return this._title;
      },
      set title(val) {
        this._title = val
      }
    }
    jest.spyOn(location, 'title', 'get').mockImplementation(() => 'pizza')
    jest.spyOn(location, 'title', 'set').mockImplementation(() => {})
    
    expect(location.title).toBe('pizza')
    location.title = 'haha'
    expect(location.title).toBe('pizza')
  })

  jest.useFakeTimers()
  test('use timer mock', () => {
    const callback = jest.fn()
    const actual = setTimeout(callback, 5000)

    jest.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(1)
  })
})