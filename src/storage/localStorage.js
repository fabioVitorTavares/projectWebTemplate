const getToken = () => {
  const dataStringfy = localStorage.getItem("persist:root");
  const data = JSON.parse(dataStringfy);
  const token = data.token;
  return token;
};

export const getData = (name) => {
  if ((name = "token")) return getToken();
  return localStorage.getItem(name);
};

export const setData = (name, newValue) => {
  return localStorage.setItem(name, newValue);
};
