import styled from "styled-components";

export default function PageTitle({text, type}) {
    return (
        <Wrapper type = {type}>
            {text}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    margin: 53px 0px 43px;
    position: relative;
    display: flex;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    
    & span {
        max-width: ${({type}) => type === "UserPosts" ? "calc(100% - 150px)" : "100%"};
        display: block;
        color: #FFFFFF;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media(max-width: 937px) {
        margin: ${({type}) => type === "UserPosts" ? "19px 0px 0px 0px" : "19px 0px 30px 0px"};
        & span {
            max-width: ${({type}) => type === "UserPosts" ? "calc(100% - 280px)" : "100%"};
        }
    }
    
    @media(max-width: 637px) {
        padding: 0px 10px 0px;
        & span {
            max-width: ${({type}) => type === "UserPosts" ? "calc(100% - 110px)" : "100%"};
            font-size: 33px;
            line-height: 48px;
        }
    }
`