export type DataItem = {
  id: number;
  name: string;
};

export type DataResult = {
  dataList: DataItem[];
  success: boolean;
};

/**
 * 假设这是一个组件初始化数据的请求
 * 为了减少依赖，降低不可控问题，我们需要Mock接口数据
 */
export async function requestDataList(): Promise<DataItem[]> {
  try {
    const res = await window.fetch('https://example.com/getData');
    const result: DataResult = await res.json();
    if (result.success === true) {
      return result.dataList;
    }
  } catch (err) {
    console.log('window.fetch 获取数据失败，错误信息', err);
  }

  return [];
}
