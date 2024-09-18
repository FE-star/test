type DataItem = {
  id: string;
  name: string;
};

type DataResult = {
  dataList: DataItem[];
  success: boolean;
};

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
