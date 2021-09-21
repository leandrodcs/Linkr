import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";

export default function Button() {
    const [isFollowed, setIsFollowed] = useState(true);

    return (
        <Wrapper 
            isFollowed={isFollowed}
        >
            {isFollowed ? "Unfollow" : "Follow"}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 112px;
    min-width: 112px;
    height: 32px;
    margin: 16px 0px;
    border-radius: 5px;
    background-color: ${props => props.isFollowed ? "#FFF" : "#1877F2"};
    position: absolute;
    top: 0;
    left: 825px;
    font-family: Lato;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.isFollowed ? "#1877F2" : "#FFF"};

    @media(max-width: 937px) {
        position: initial;
    }
`;