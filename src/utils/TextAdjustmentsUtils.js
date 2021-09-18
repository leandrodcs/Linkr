import { Link } from "react-router-dom"

function arrayOfPiecesWithAndWithoutHashtags(text) {
    const characters = Array.from(text);
    const brokenText = [];
    let nextChar;
    let activeText = "";
    let hashtagIndicator = false;
    characters.forEach((char,index) => {
        if (char === "#") {
            hashtagIndicator = true;
        } 
        activeText += char
        if (index < characters.length - 1) {
            nextChar = characters[index+1]
        } else {
            nextChar = false
        }
        if (!nextChar || nextChar === "#" || (nextChar === " " && hashtagIndicator === true)) {
            brokenText.push(activeText);
            hashtagIndicator = false;
            activeText = "";
        }
    });
    return brokenText;
}

function TextWithHighlightedHashtags({text, MainStyledComponent, HashtagStyledComponent}) {
    const brokenText = arrayOfPiecesWithAndWithoutHashtags(text);
    const TextWithStyledHashtags = brokenText.map((fragment, index) => {
        if (fragment[0] === "#" && fragment.length !== 1) {
            return (
                <Link key = { index } to= { `/hashtag/${fragment.slice(1).toLowerCase()}` }>
                    <HashtagStyledComponent>
                        {fragment.toLowerCase()}
                    </HashtagStyledComponent>
                </Link>
                );
        } else {
            return (
                fragment
            );
        }
    });
    if (MainStyledComponent) {
        return (
            <MainStyledComponent>
                {TextWithStyledHashtags}
            </MainStyledComponent>
        );
    }
    return (
        <>
            {TextWithStyledHashtags}
        </>
    );
}

function textWithLowercaseHashtags(text) {
    const brokenText = arrayOfPiecesWithAndWithoutHashtags(text);
    let textWithLowercaseHashtags = "";
    brokenText.forEach( (pieceOfText) => {
        if (pieceOfText[0] === "#") {
            textWithLowercaseHashtags += pieceOfText.toLowerCase();
        } else {
            textWithLowercaseHashtags += pieceOfText
        }
    })
    return textWithLowercaseHashtags;
}

function CheckTextLengthAndReduceItIfNeeded(text, MaxCharactersLength) {
    if (!!text && text.length > MaxCharactersLength) {
        return text.slice(0,MaxCharactersLength) + "..."
    }
    return text
}

export {
    TextWithHighlightedHashtags,
    textWithLowercaseHashtags,
    CheckTextLengthAndReduceItIfNeeded
}