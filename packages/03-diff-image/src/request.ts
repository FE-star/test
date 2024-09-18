export type LoginInfo = {
  username: string;
  password: string;
};

export type LoginResult = {
  success: boolean;
  message: string;
};

export async function loginAction(info: LoginInfo) {
  const res = await window.fetch('https://example.com/login', {
    method: 'POST',
    body: JSON.stringify(info)
  });
  const result: LoginResult = await res.json();
  return result;
}
