import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"div"> {
  orientation: string;
  shipLength: number;
  index: number;
}

const Ship = (props: Props) => {
  const gridSize = "4.6vmin";

  return (
    <motion.div
      {...props}
      drag
      whileDrag={{ scale: 1.1, opacity: 0.4 }}
      dragMomentum={false}
      dragSnapToOrigin={true}
      id={`type-${props.shipLength}--${props.orientation}`}
      style={
        props.orientation === "vertical"
          ? { height: `calc( ${gridSize} * ${props.shipLength})` }
          : { width: `calc( ${gridSize} * ${props.shipLength})` }
      }
    ></motion.div>
  );
};

export default Ship;
