import { useDarkMode } from "storybook-dark-mode";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ModalProvider } from "../src/Components/ModalManager";
import theme from "../src/theme";

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => `
    body {
      color: ${theme.global.color};
      font-size: ${theme.global.fontSize}px;
    }
  `}
`;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={useDarkMode() ? theme.dark : theme.light}>
      <GlobalStyle />
      <ModalProvider>
        <Story />
      </ModalProvider>
    </ThemeProvider>
  ),
];
