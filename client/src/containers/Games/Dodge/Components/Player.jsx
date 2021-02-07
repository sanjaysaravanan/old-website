import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import Square from './Square';
import { UP, DOWN, LEFT, RIGHT } from '../helpers/constants';

const Player = (props) => {
    // eslint-disable-next-line no-unused-vars
    let player = null;
    useEffect(() => {
        window.onkeydown = handleKeyDown;
    });

    const handleKeyDown = (e) => {
        let newDirection;

        switch (e.keyCode) {
            case 37:
                newDirection = { top: 0, left: -1, dir: LEFT };
                break;
            case 38:
                newDirection = { top: -1, left: 0, dir: UP };
                break;
            case 39:
                newDirection = { top: 0, left: 1, dir: RIGHT };
                break;
            case 40:
                newDirection = { top: 1, left: 0, dir: DOWN };
                break;
            default:
                return;
        }

        props.handlePlayerMovement(newDirection);
    }

    const { size, position: { top, left } } = props;
    return (
        <div ref={n => { player = n }} >
            <Square
                size={size}
                position={{ top, left }}
                color='blue'
            />
        </div>

    );
}

Player.propTypes = {
    size: PropTypes.number.isRequired,
    position: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired
    })
};

export default Player;