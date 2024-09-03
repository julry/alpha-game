import {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {SizeRatioContextProvider} from '../contexts/SizeRatioContext';

const TARGET_WIDTH = 375;
const TARGET_HEIGHT = 677;
const MIN_MOCKUP_WIDTH = 450;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    @media (min-width: ${MIN_MOCKUP_WIDTH}px) {
        padding: 20px;
    }
`;

const WrapperInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    --border-radius-lg: ${({$sizeRatio}) => $sizeRatio * 16}px;
    --border-radius-sm: ${({$sizeRatio}) => $sizeRatio * 8}px;
    --border-radius-xs: ${({$sizeRatio}) => $sizeRatio * 4}px;
    --border-radius-icon: ${({$sizeRatio}) => $sizeRatio * 6}px;
    --spacing_x1: ${({$sizeRatio}) => $sizeRatio * 4}px;
    --spacing_x2: ${({$sizeRatio}) => $sizeRatio * 8}px;
    --spacing_x3: ${({$sizeRatio}) => $sizeRatio * 12}px;
    --spacing_x4: ${({$sizeRatio}) => $sizeRatio * 16}px;
    --spacing_x5: ${({$sizeRatio}) => $sizeRatio * 20}px;
    --spacing_x6: ${({$sizeRatio}) => $sizeRatio * 24}px;
    --spacing_x7: ${({$sizeRatio}) => $sizeRatio * 28}px;
    --spacing_x8: ${({$sizeRatio}) => $sizeRatio * 32}px;
    --font_xl:  ${({$sizeRatio}) => $sizeRatio * 30}px;
    --font_lg:  ${({$sizeRatio}) => $sizeRatio * 22}px;
    --font_md:  ${({$sizeRatio}) => $sizeRatio * 16}px;
    --font_sm:  ${({$sizeRatio}) => $sizeRatio * 14}px;
    --font_xs:  ${({$sizeRatio}) => $sizeRatio * 12}px;
    --font_xxs:  ${({$sizeRatio}) => $sizeRatio * 10}px;
    
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transform: translate(0, 0);
    white-space: pre-line;
    background: var(--color-black);
    color: var(--color-black-text);
    font-size: var(--font_md);

    @media (min-width: ${MIN_MOCKUP_WIDTH}px) {
        overflow: hidden;
        max-width: ${({$sizeRatio}) => `calc(${TARGET_WIDTH}px * ${$sizeRatio})`};
        max-height: ${({$sizeRatio}) => `calc(${TARGET_HEIGHT}px * ${$sizeRatio})`};
        border: 2px solid #000000;
        border-radius: 10px;
        box-sizing: content-box;
    }
`;

export function ScreenTemplate(props) {
    const { children } = props;
    const wrapperRef = useRef();
    const wrapperInnerRef = useRef();

    return (
        <SizeRatioContextProvider target={wrapperInnerRef} targetWidth={TARGET_WIDTH} targetHeight={TARGET_HEIGHT}>
            {(sizeRatio) => (
                <Wrapper ref={wrapperRef}>
                    <WrapperInner ref={wrapperInnerRef}>
                        <Content $sizeRatio={sizeRatio} id="content">
                            {children}
                        </Content>
                    </WrapperInner>
                </Wrapper>
            )}
        </SizeRatioContextProvider>
    );
};
