import {
  THEME_COLOR,
  NAVBAR_BG,
  SIDEBAR_BG,
  DIRECTION,
  DARK_THEME,
} from "./constants";

export const setTheme = (payload) => ({
  type: THEME_COLOR,
  payload,
});
export const setDarkMode = (payload) => ({
  type: DARK_THEME,
  payload,
});
export const setNavbarBg = (payload) => ({
  type: NAVBAR_BG,
  payload,
});

export const setSidebarBg = (payload) => ({
  type: SIDEBAR_BG,
  payload,
});

export const setDir = (payload) => ({
  type: DIRECTION,
  payload,
});
