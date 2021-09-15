import SignUp from "./pages/sign-up/SignUp";
import SignIn from "./pages/sign-in/SignIn";
import Timeline from "./pages/Timeline/Timeline";
import MyPosts from "./pages/MyPosts/MyPosts";


import UserContext from "./contexts/UserContext";
import { getFromLocalStorage } from "./utils/localStorageUtils";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { createGlobalStyle } from "styled-components";

export default function App() {
  const [user, setUser] = useState(() => getFromLocalStorage());
  const {token} = user;
  const skipSignIn = !!token;
  
  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <GlobalReset />
        <Switch>
          <Route exact path="/" render={() => <SignIn skipThisPage={skipSignIn} />} />
          <Route exact path="/sign-up" render={() => <SignUp />} />
          <Route exact path="/timeline" render={() => <Timeline />} />
          <Route exact path="/my-posts" render={() => <MyPosts />} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

const GlobalReset = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym,
  address, big, button, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var,
  b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead,
  tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav,
  output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    background-color: transparent;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;