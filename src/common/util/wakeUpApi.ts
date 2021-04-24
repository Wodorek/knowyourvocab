export const wakeUpApi = async () => {
  try {
    await fetch(`${process.env.REACT_APP_BACKEND}/dyno/wakeUp`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {}
};
