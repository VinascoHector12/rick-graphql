import React from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    z-index: 1000000;
    position: fixed;
    top: 15%;
    left: 30%;
    display: flex;
    padding-top: 25px;
    //align-items: center;
    justify-content: center;
    width: 45vw;
    height: 66.5vh;
    background: rgb(36, 40, 47);
    color: rgb(255, 152, 0);
    flex-wrap: wrap;
    border-radius: 10px;
`;

type Props = {
    modalOpen: boolean;
}

const Modal: React.FC<Props> = ({modalOpen, children}) => {
    if(!modalOpen) return null;

    return createPortal(
        <Wrapper>
            <div>{children}</div>
        </Wrapper>,
        document.body
    );
};

export default Modal;