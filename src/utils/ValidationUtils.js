function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function isEmailValid(string) {
    const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return isEmailValid.test(String(string).toLowerCase())
}

function isInputValid(inputType,inputValue) {
    const inputsValidationConditions = [
        {type: "email", errortext: "Por favor, digite um email válido",condition: isEmailValid(inputValue)},
        {type: "link", errortext: "Por favor, digite um link válido", condition: isValidHttpUrl(inputValue) },
        {type: "senha", errortext: "Sua senha precisa ter pelo menos 6 caracteres!", condition: inputValue.length > 5},
    ]

    const isValid = inputsValidationConditions.find( ({ type }) => type === inputType ).condition;
    const errorMessage = inputsValidationConditions.find( ({ type }) => type === inputType ).errortext;
    if(!isValid) {
        alert(errorMessage);
    }
    return isValid;
}

export {
    isInputValid,
}