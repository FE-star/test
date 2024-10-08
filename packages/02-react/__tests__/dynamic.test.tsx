import { screen, waitFor } from '@testing-library/react';
import { createDialog } from '../src/dynamic';

describe('dynamic', () => {
  test('createDialog', async () => {
    createDialog({
      title: '对话框-1',
      content: '对话框内容-1'
    });

    // 需要延时等待动态渲染结束
    await waitFor(
      () => expect(document.querySelector('.dialog'))
        .toBeTruthy()
    );

    const dialogTitleList = screen.queryAllByText('对话框-1');
    expect(dialogTitleList.length).toBe(1);

    const title = dialogTitleList[0];
    expect(title.classList.contains('dialog-title')).toBeTruthy();
  });
});
