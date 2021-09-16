function adjustStateObjectData(objectToChange,setObjectToChange, atributesToChange,atributesNewValues) { 
    const entriesArray = Object.entries(objectToChange);

    if (typeof(atributesToChange) === "string") { //There is only one atribute to change 
        entriesArray.forEach( (SingleAtributeArray) => 
            {if(SingleAtributeArray[0] === atributesToChange){SingleAtributeArray[1] = atributesNewValues }}
        )
    } else { //There is one array of atributes to change 
        atributesToChange.forEach( (atributeName, atributeIndex) => 
            entriesArray.forEach( (SingleAtributeArray) => 
                {if(SingleAtributeArray[0] === atributeName){SingleAtributeArray[1] = atributesNewValues[atributeIndex] }}
            )
        )
    }
    setObjectToChange(Object.fromEntries(entriesArray))
}

export {
    adjustStateObjectData
}