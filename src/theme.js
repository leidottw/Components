const baseFontSize = 16;

const darkColor = "#ccc";
const darkBackground = "rgba(46, 46, 46, 0.95)";
const darkHoverColor = "#fff";
const darkActivColor = "#d59542";

const lightColor = "#3a3a3a";
const lightBackground = "#fbfbfb";
const lightHoverColor = "#606060";
const lightActivColor = "#43ccff";

const theme = {
  dark: {
    isDarkMode: true,
    global: {
      color: darkColor,
      fontSize: baseFontSize,
    },
    button: {
      color: darkColor,
      background: darkBackground,
      borderColor: darkColor,
      ":hover": {
        color: darkHoverColor,
        borderColor: darkHoverColor,
      },
      ":active": {
        color: darkActivColor,
        borderColor: darkActivColor,
      },
    },
    popup: {
      background: darkBackground,
    },
  },
  light: {
    isDarkMode: false,
    global: {
      color: lightColor,
      fontSize: baseFontSize,
    },
    button: {
      color: lightColor,
      background: lightBackground,
      borderColor: lightColor,
      ":hover": {
        color: lightHoverColor,
        borderColor: lightHoverColor,
      },
      ":active": {
        color: lightActivColor,
        borderColor: lightActivColor,
      },
    },
    popup: {
      background: lightBackground,
    },
  },
};

export default theme;
