import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const Icon = React.memo(({ name, ...rest }) => {
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
    <span
      {...rest}
      css={`
        display: inline-block;
        width: 1rem;
        line-height: 0;
        vertical-align: bottom;
      `}
    >
      {SVGComponent}
    </span>
  );
});

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
