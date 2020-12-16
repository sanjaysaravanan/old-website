/** @jsx jsx */
import { useState, useRef, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";

/**
 * @function Slider
 */
const Slider = props => {
  const ref = useRef();
  const [sliderWidth, setSliderWidth] = useState(500);
  useEffect(() => {
    if (ref.current !== null) {
      setSliderWidth(ref.current.offsetWidth);
    }

    const resize = () => {
      if (ref.current !== null) {
        setSliderWidth(ref.current.offsetWidth);
      }
    };

    const onResize = window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  const getWidth = () => sliderWidth;

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  });

  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth()
    });
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (props.slides.length - 1) * getWidth(),
        activeIndex: props.slides.length - 1
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth()
    });
  };

  return (
    <div ref={ref} css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * props.slides.length}
      >
        {props.slides.map((slide, i) => (
          <Slide width={getWidth()} key={slide + i} content={slide} />
        ))}
      </SliderContent>

      {activeIndex !== 0 ? (
        <Arrow direction="left" handleClick={prevSlide} />
      ) : (
        ""
      )}
      {activeIndex !== props.slides.length - 1 ? (
        <Arrow direction="right" handleClick={nextSlide} />
      ) : (
        ""
      )}

      <Dots slides={props.slides} activeSlide={activeIndex} />
    </div>
  );
};

const SliderCSS = css`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`;

export default Slider;
