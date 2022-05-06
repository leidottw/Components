import Icon from "./Icon";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

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

export const ExtendButton = ({
  icon,
  text,
  isActive,
  iconActiveColor,
  ...rest
}) => {
  const textRef = useRef();
  const [maxContent, setMaxContent] = useState(0);

  useEffect(() => {
    setMaxContent(
      textRef.current.scrollWidth +
        10 /* gap between icon and text */ +
        24 /* icon width */
    );
  }, []);

  return (
    <div
      isActive={isActive}
      maxContent={maxContent}
      css={`
        width: 24px;
        height: 40px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
        padding: 0 10px;

        ${({ isActive, maxContent, theme: { isDarkMode } }) => {
          return `
            &:hover {
              width: ${isActive ? "" : `${maxContent}px !important`};
              background-color: ${
                isActive ? "transparent" : isDarkMode ? "#143bbd" : "#c0ff4b"
              }
            }
          `;
        }}
      `}
      {...rest}
    >
      <Icon
        name={icon}
        style={{
          width: 24,
          flexShrink: 0,
          color: isActive ? iconActiveColor : null,
        }}
      />
      <div ref={textRef} style={{ marginLeft: 10 }}>
        {text}
      </div>
    </div>
  );
};
