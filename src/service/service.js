import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";

function createNewUser(body, history) {
    console.log(body)

    axios.post(`${URL}/sign-up`, body)
        .then(resp => {
            // get resp and save into context
            history.push("/");
        })
        .catch(err => {
            if(err.response.status === 400) alert("E-mail já cadastrado!");
            else alert("Erro desconhecido\nTente novamente...");
        });
}

export {
    createNewUser
};