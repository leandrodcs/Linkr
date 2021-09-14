import { useState } from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import Trending from "../../components/Trending";
import Loading from "../../components/Loading";

export default function Timeline() {
    const [posts] = useState([]);

    if(!posts) {
        return (
            <Container>
                <Loading />
            </Container>
        );
    }

    return (
        <Container>
            <Wrapper>

            </Wrapper>
            <Trending />
        </Container>
    );
}

const Wrapper = styled.section`
    width: 100%;


`