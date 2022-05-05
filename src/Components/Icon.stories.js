const context = require.context("../assets/svg", false, /\.svg$/);
const fileNames = context.keys().map((path) => path.match(/([^/]*)\.svg$/)[1]);

import Icon from "./Icon";
import { action } from "@storybook/addon-actions";

export default {
  title: "main/Icon",
  component: Icon,
};

export const icon = () => {
  return (
    <div
      css={`
        div + div {
          margin-left: 10px;
        }
      `}
    >
      <Icon />
      <Icon name="xxx" />
      <Icon name="love-ui-heart-svgrepo-com" />
    </div>
  );
};

export const icon_list = () => {
  return fileNames.map((filename) => (
    <Icon
      name={filename}
      css={`
        margin: 10px;
        cursor: pointer;

        &:hover {
          opacity: 0.5;
        }
      `}
      onClick={() => {
        navigator.clipboard.writeText(filename);
        action("copied")(filename);
      }}
    />
  ));
};
