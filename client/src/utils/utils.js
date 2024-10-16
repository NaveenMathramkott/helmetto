export const getOffer = (price, offer) => {
  const data = (offer * price) / 100;
  return data + price;
};

export const textShorter = (text, shorter = 31) => {
  const data = text.slice(0, shorter);
  if (data.length > shorter) {
    return `${data}...`;
  } else {
    return `${data}.`;
  }
};

export const debounce = (callback, delay = 100) => {
  var time;
  return (...args) => {
    clearTimeout(time);
    time = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
