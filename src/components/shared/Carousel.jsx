import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: 100%;
    width: 100%;
`;

const MotionStyled = styled(motion.div)`
    display: flex;

    & > div + div {
        margin-left: var(--spacing_x4);
    }
`;

export const Carousel = ({ children }) => {
  const targetRef = useRef(null);
  const { scrollXProgress } = useScroll({
    target: targetRef,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const x = useTransform(scrollXProgress, [0, 1], [0, 0]);

  return (
    <Wrapper>
        <MotionStyled style={{ x }}>
            {children}
        </MotionStyled>
    </Wrapper>
  )
}