import { ACCESS_TOKEN, TOKEN } from '../utils/constants';

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, '', { 'max-age': -1, path: '/' });
}

export const getClientAccessState = () => (getCookie(ACCESS_TOKEN) ? true : false);

export const getClientTokenState = () => (getCookie(TOKEN) ? true : false);

export const setTimeFormat = (number) => {
  if (number >= 0 && number < 10) {
    return '0' + number;
  }

  return String(number);
};

export const WS_ENDPOINT_ALL = '/all';
export const WS_ENDPOINT_PROFILE = `?token=${getCookie(ACCESS_TOKEN)}`;
