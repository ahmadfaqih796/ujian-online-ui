import { THEME_COLOR, NAVBAR_BG, SIDEBAR_BG, DIRECTION, DARK_THEME } from '../constants';

const INIT_STATE = {
  activeDir: 'ltr',
  activeNavbarBg: '#0b70fb', // This can be any color,
  activeSidebarBg: '#ffffff', // This can be any color
  activeMode: 'light', // This can be light or dark
  activeTheme: 'ORANGE_THEME', // BLUE_THEME, GREEN_THEME, RED_THEME, BLACK_THEME, PURPLE_THEME, INDIGO_THEME
  SidebarWidth: 240,
};

const CustomizerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case NAVBAR_BG:
      return {
        ...state,
        activeNavbarBg: action.payload,
      };
    case DARK_THEME:
      return {
        ...state,
        activeMode: action.payload,
      };
    case SIDEBAR_BG:
      return {
        ...state,
        activeSidebarBg: action.payload,
      };
    case THEME_COLOR:
      return {
        ...state,
        activeTheme: action.payload,
      };
    case DIRECTION:
      return {
        ...state,
        activeDir: action.payload,
      };

    default:
      return state;
  }
};

export default CustomizerReducer;
