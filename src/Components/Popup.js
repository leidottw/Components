import { useTheme } from "styled-components";
import { IconButton } from "./Button";
import Icon from "./Icon";
import PropTypes from "prop-types";
import { forwardRef } from "react";

export const Popup = forwardRef(({ style, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 10,
        background: theme.popup.background,
        boxShadow: "rgb(0 0 0 / 20%) 0px 2px 8px 0px",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    ></div>
  );
});

export const Header = ({
  icon,
  text,
  closeHandler,
  style,
  children,
  ...rest
}) => {
  return (
    <div
      style={{
        height: 60,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0 20px",
        position: "relative",
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      {children ? (
        children
      ) : (
        <>
          {icon ? <Icon name={icon} style={{ width: 25 }} /> : null}
          {text ? (
            <span style={{ marginLeft: 10, fontSize: "1.2rem" }}>{text}</span>
          ) : null}
          {closeHandler ? (
            <IconButton
              icon="close-svgrepo-com"
              iconProps={{ style: { width: 24 } }}
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={closeHandler}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

Header.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  closeHandler: PropTypes.func,
};

export const Body = ({ style, ...rest }) => {
  return (
    <div
      style={{
        flexGrow: 1,
        overflow: "auto",
        ...style,
      }}
      {...rest}
    ></div>
  );
};

export const Footer = ({ style, ...rest }) => {
  return (
    <div
      style={{
        height: 74,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 20px",
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    ></div>
  );
};
