export const isDevEnv = (): boolean => {
  return (
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
  );
};

export const randomStr = (length: number) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
