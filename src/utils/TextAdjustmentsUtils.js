import { Link } from "react-router-dom"

function TextWithHighlightedHashtags({text, MainStyledComponent, HashtagStyledComponent}) {
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
    const TextWithStyledHashtags = brokenText.map(fragment => {
        if (fragment[0] === "#") {
            return (
                <Link to= { `/hashtag/${fragment.slice(1)}` }>
                    <HashtagStyledComponent>
                        {fragment}
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

function CheckTextSizeAndReduceItIfNeeded(text, MaxCharactersLength) {
    if (text && text.length > MaxCharactersLength) {
        return text.slice(0,MaxCharactersLength) + "..."
    }
    return text
}

export {
    TextWithHighlightedHashtags,
    CheckTextSizeAndReduceItIfNeeded
}