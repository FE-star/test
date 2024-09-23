import React from 'react';
import { createRoot } from 'react-dom/client';

export function createDialog(props: { title: string; content: string }) {
  const { title, content } = props;
  const div = document.createElement('div');
  document.body.appendChild(div);

  const root = createRoot(div);

  setTimeout(() => {
    root.render(
      <div className="dialog">
        <div className="dialog-title">{title}</div>
        <div className="dialog-content">{content}</div>
      </div>
    );
  }, 200)
}
