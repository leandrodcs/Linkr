import { followUser } from "../../../service/service";
import UserContext from "../../../contexts/UserContext";
import DataEvaluationContext from "../../../contexts/DataEvaluationContext";

import { useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

export default function Button() {
    const params = useParams();
    const { login, followingList } = useContext(UserContext);
    const { isDataBeingEvaluated, setIsDataBeingEvaluated } = useContext(DataEvaluationContext);
    const isFollowing = followingList.find(({id}) => id === Number(params.id));

    return (
        <Wrapper 
            isFollowing={isFollowing}
            isButtonEnabled={!isDataBeingEvaluated}
            onClick={() => !isDataBeingEvaluated ? 
                followUser( login.token, params.id, isFollowing, setIsDataBeingEvaluated )
                : ""
            }
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 112px;
    min-width: 112px;
    height: 32px;
    margin: 16px 0px;
    border-radius: 5px;
    background-color: ${props => props.isFollowing ? "#FFF" : "#1877F2"};
    opacity: ${props => props.isButtonEnabled ? 1 : 0.5};
    position: absolute;
    top: 0;
    left: 825px;
    font-family: Lato;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.isFollowing ? "#1877F2" : "#FFF"};
    cursor: ${props => props.isButtonEnabled ? "pointer" : "progress"};

    @media(max-width: 937px) {
        left: unset;
        right: 0px;
    }

    @media(max-width: 637px) {
        position: initial;
        margin: 16px 16px 0px
    }
`;