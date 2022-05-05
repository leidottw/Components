import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const Icon = React.memo(({ name, style, ...rest }) => {
  const [SVGComponent, setSVGComponent] = useState(null);

  useEffect(() => {
    import(`../assets/svg/${name}.svg`)
      .then(({ ReactComponent }) =>
        setSVGComponent(
          <ReactComponent width="100%" height="100%" fill="currentColor" />
        )
      )
      .catch(() => {
        const msg = name
          ? `Icon(${name}) not found.`
          : "The icon name is not defined.";

        import(`../assets/svg/close-svgrepo-com.svg`).then(
          ({ ReactComponent }) => {
            setSVGComponent(
              <span title={msg}>
                <ReactComponent
                  width="100%"
                  height="100%"
                  style={{
                    fill: "#00ff00",
                    background:
                      "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
                  }}
                />
              </span>
            );
          }
        );
      });
  }, [name]);

  return (
    <div
      style={{
        display: "inline-block",
        width: 30,
        ...style,
      }}
      {...rest}
    >
      {SVGComponent}
    </div>
  );
});

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
