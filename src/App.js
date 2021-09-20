import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Timeline from "./pages/Timeline/Timeline";
import UserPage from "./pages/UserPage/UserPage";
import HashtagPage from "./pages/HashTagPage.js/HashtagPage";
import MyPosts from "./pages/MyPosts/MyPosts";
import MyLikes from "./pages/MyLikes/MyLikes";
import Header from "./components/Header/Header";

import UserContext from "./contexts/UserContext";
import DataEvaluationContext from "./contexts/DataEvaluationContext";
import { getFromLocalStorage } from "./utils/localStorageUtils";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { createGlobalStyle } from "styled-components";

export default function App() {

  const [login, setLogin] = useState(() => getFromLocalStorage());
  const [ isDataBeingEvaluated, setIsDataBeingEvaluated ] = useState(false);
  
  return (
    <Router>
      <UserContext.Provider value={{login, setLogin}}>
        <DataEvaluationContext.Provider value = {{isDataBeingEvaluated, setIsDataBeingEvaluated }} >
          <GlobalReset />
          <Switch>
            <Route exact path="/">
              <SignIn skipThisPage={!!login.token} />
            </Route>
            <Route exact path="/sign-up" render={() => <SignUp />} />
            <>
              <Header />
              <Route exact path="/timeline" render={() => <Timeline />} />
              <Route exact path="/my-posts" render={() => <MyPosts />} />
              <Route exact path="/my-likes" render={() => <MyLikes />} />
              <Route exact path="/user/:id" render={() => <UserPage />} />
              <Route exact path="/hashtag/:hashtag" render={() => <HashtagPage />} />
            </>
          </Switch>
        </DataEvaluationContext.Provider>
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
  a:link,
  a:visited,
  a:hover,
  a:active {
  color: inherit;
  text-decoration: none;
  }
`;