export const setWithExpiry = (key: string, value: string, lifetime: number) => {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + lifetime,
  };
  localStorage.setItem(key, JSON.stringify(item));
};
