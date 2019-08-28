export const MediaQuery = {
  XS: 320,
  SM: 480,
  MD: 768,
  LG: 992,
  XL: 1280,
  XXL: 1800
}

export const ready = function (fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

export const truncate = function (elem, limit, after) {

  if (!elem || !limit) return;

  let content = elem.textContent.trim();
  content = content.split('').slice(0, limit);

  content = content.join('') + (after ? after : '');
  elem.textContent = content;
};
