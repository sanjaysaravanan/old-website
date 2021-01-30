import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Square from "./Square";

const Enemy = props => {
  useEffect(() => {
    const {
      size,
      playerPosition,
      info: { top, left }
    } = props;

    if (
      playerPosition.left < left + size &&
      playerPosition.top < top + size &&
      playerPosition.left + size > left &&
      playerPosition.top + size > top
    ) {
      props.onCollide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => { };
  });

  const {
    size,
    info: { top, left }
  } = props;
  return <Square size={size} position={{ top, left }} color="firebrick" />;
};

Enemy.propTypes = {
  size: PropTypes.number.isRequired,
  info: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    dir: PropTypes.string.isRequired
  }),
  playerPosition: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }),
  onCollide: PropTypes.func.isRequired
};

export default Enemy;
