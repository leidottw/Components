import Icon from "./Icon";
import PropTypes from "prop-types";
import styled from "styled-components";

export const PureButton = styled.button`
  ${({ theme }) => {
    const { button: buttonStyle } = theme;

    return `
      font-size: inherit;
      color: inherit;
      background: transparent;
      padding: 0;
      border: 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      &:hover {
        color: ${buttonStyle[":hover"].color};
      }

      &:active {
        color: ${buttonStyle[":active"].color};
      }
    `;
  }}
`;

export const IconButton = ({ icon, ...rest }) => (
  <PureButton {...rest}>
    <Icon name={icon} />
  </PureButton>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
};

export const TextButton = styled(({ children, ...rest }) => {
  return (
    <PureButton {...rest}>
      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {children}
      </span>
    </PureButton>
  );
})`
  ${({ theme }) => {
    const { button: buttonStyle } = theme;

    return `
      background: ${buttonStyle.background};
      border-width: 1px;
      border-style: solid;
      border-color: ${buttonStyle.borderColor};
      border-radius: 5px;
      height: 34px;
      padding: 0 20px;

      &:hover {
        border-color: ${buttonStyle[":hover"].borderColor};
      }

      &:active {
        border-color: ${buttonStyle[":active"].borderColor};
      }
    `;
  }}
`;

export const IconTextButton = ({ icon, iconProps, children, ...rest }) => (
  <TextButton {...rest}>
    <Icon name={icon} {...iconProps} />
    <span style={{ marginLeft: 8 }}>{children}</span>
  </TextButton>
);

IconTextButton.propTypes = {
  icon: PropTypes.string.isRequired,
  iconProps: PropTypes.object,
};
