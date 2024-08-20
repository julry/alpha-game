import styled from "styled-components";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import arrow from '../../assets/images/icon-arrow.svg';

const Wrapper = styled.div`
    position: relative;
    padding: var(--spacing_x2) var(--spacing_x4);
    padding-right: calc(var(--spacing_x4) + var(--spacing_x4) + var(--spacing_x2));
    font-size: var(--font_sm);
    border-radius: var(--border-radius-sm);
    background: var(--color-white);
    color: var(--color-white-text);
    width: 100%;
    cursor: pointer;
`; 

const PlaceHolder = styled.p`
    color: var(--color-gray);
`;

const Postfix = styled.div`
    position: absolute;
    top: 50%;
    right: var(--spacing_x4);
    width: ${({$ratio}) => $ratio * 18}px;
    height: ${({$ratio}) => $ratio * 18}px;
    background: url(${arrow}) no-repeat center center;
    background-size: cover;
    transition: transform 0.3s;
    transform: translateY(-50%) ${({$isOpen}) => $isOpen ? 'rotate(180deg)' : ''};
`;

const List = styled(motion.div)`
    background: white;
    margin-top: var(--spacing_x1);
    border-radius: var(--border-radius-sm);
    color: var(--color-white-text);
`;

const Option = styled.div`
    padding: var(--spacing_x2) var(--spacing_x4);
    font-size:var(--font_xs);
    cursor: pointer;

    & + & {
        border-top: 1px solid #EBEBEB;
    }
`;

export const Select = (props) => {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const ratio = useSizeRatio();
    const {options} = props;

    const handleChoose = (id, name) => {
        props.onChoose?.(id, name);
        setValue(name);
        setIsOpen(prev => !prev);
    };

    return (
        <>
            <Wrapper onClick={() => setIsOpen(prev => !prev)} $ratio={ratio}>
                {value ? 
                    <span>{value}</span> : <PlaceHolder>Выбрать</PlaceHolder>
                }
                <Postfix $isOpen={isOpen} $ratio={ratio}/>
            </Wrapper>
            <AnimatePresence>
                {
                    isOpen && (
                        <List
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {options.map(({id, name}) => (
                                <Option key={id} onClick={() => handleChoose(id, name)} $ratio={ratio}>{name}</Option>
                            ))}
                        </List>
                    )
                }
            </AnimatePresence>
        </>
    )
}