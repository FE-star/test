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
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      const result: DataResult = JSON.parse(xhr.responseText);
      if (result.success === true) {
        act(() => {
          setList(result.dataList);
        });
      }
    });
    xhr.addEventListener('error', (err) => {
      console.log('XHR 获取数据失败，错误信息', err);
    });
    xhr.open('GET', 'https://example.com/requestData');
    xhr.send();
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
