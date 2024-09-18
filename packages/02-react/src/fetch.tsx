import React, { useEffect, useState, act } from 'react';

type DataItem = {
  id: string;
  name: string;
};

type DataResult = {
  dataList: DataItem[];
  success: boolean;
};

export function App() {
  const [list, setList] = useState<DataItem[]>([]);

  useEffect(() => {
    window
      .fetch('https://example.com/getData')
      .then((res) => {
        return res.json();
      })
      .then((result: DataResult) => {
        if (result.success === true) {
          act(() => {
            setList(result.dataList);
          });
        }
      })
      .catch((err) => {
        console.log('window.fetch 获取数据失败，错误信息', err);
      });
  }, []);

  return (
    <div className="app">
      <div className="data-list">
        {list.map((item) => {
          return (
            <div className="data-item" key={item.id}>
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
