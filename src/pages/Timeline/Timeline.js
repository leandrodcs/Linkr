import { useState } from "react";
import Container from "../../components/Container";
import Loading from "../../components/Loading";

export default function Timeline() {
    const [posts, setPosts] = useState("");

    if(!posts) {
        return (
            <Container>
                <Loading />
            </Container>
        );
    }

    return (
        <Container>
            
        </Container>
    );
}