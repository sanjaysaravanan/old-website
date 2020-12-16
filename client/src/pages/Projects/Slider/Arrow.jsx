/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

const Arrow = ({ direction, handleClick }) => (
  <div
    onClick={handleClick}
    css={css`
      display: flex;
      position: absolute;
      top: 88%;
      ${direction === "right" ? `right: 0px` : `left: 0px`};
      justify-content: center;
      background-color: #fff;
      opacity: 0.4;
      border-radius: 0%;
      cursor: pointer;
      align-items: center;
      transition: transform ease-in 0.1s;
      color: #000;
    `}
  >
    {direction === "right" ? (
      <ChevronRight
        style={{ cursor: "pointer" }}
        onClick={handleClick}
        fontSize="large"
      />
    ) : (
      <ChevronLeft
        style={{ cursor: "pointer" }}
        onClick={handleClick}
        fontSize="large"
      />
    )}
  </div>
);

export default Arrow;
