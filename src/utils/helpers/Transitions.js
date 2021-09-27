import TransitionContext from "../../contexts/TransitionContext";

import { createGlobalStyle } from "styled-components";
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { useState } from "react";

function TransitionsStyles() {
    return (
        <TransitionsStylesComponent />
    );
}

function TransitioningRoutes({location, children}) {
    const [isTransitioning, setIsTransitioning] = useState(false);

    return (
        <TransitionContext.Provider value = {{isTransitioning, setIsTransitioning}} >
            <TransitionGroup>
                <CSSTransition
                key = { location.key }
                timeout = {450}
                classNames = "fade"
                onEnter = { () => setIsTransitioning(true)}
                onExited = { () => setIsTransitioning(false)}
                >
                    {children}
                </CSSTransition>
            </TransitionGroup>
        </TransitionContext.Provider>
    );
}

const TransitionsStylesComponent = createGlobalStyle`

main {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
}

.fade-appear,
.fade-enter {
    opacity: 0;
    z-index: 1;
}
.fade-appear-active,
.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms linear 150ms;
}

.fade-exit {
    opacity: 1;
}

.fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 150ms linear;
}

`


export {
    TransitionsStyles,
    TransitioningRoutes
}