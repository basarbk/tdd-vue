import SecureLS from "secure-ls";

const secureLS = new SecureLS();

const setItem = (key, value) => {
  secureLS.set(key, value);
};

const getItem = (key) => {
  return secureLS.get(key);
};

const clear = () => {
  localStorage.clear();
};

export default {
  setItem,
  getItem,
  clear,
};
