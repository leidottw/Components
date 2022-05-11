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
      <h1>Name property not assigned</h1>
      <div style={{ marginLeft: 20 }}>
        <Icon />
      </div>
      <h1>No corresponding SVG found</h1>
      <div style={{ marginLeft: 20 }}>
        <Icon name="xxx" />
      </div>
      <h1>Use correctly</h1>
      <div style={{ marginLeft: 20 }}>
        <Icon name="love-ui-heart-svgrepo-com" />
      </div>
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
      key={filename}
    />
  ));
};
