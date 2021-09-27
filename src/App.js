import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Timeline from "./pages/Timeline/Timeline";
import UserPage from "./pages/UserPage/UserPage";
import HashtagPage from "./pages/HashTagPage.js/HashtagPage";
import MyPosts from "./pages/MyPosts/MyPosts";
import MyLikes from "./pages/MyLikes/MyLikes";
import { TransitionsStyles, TransitioningRoutes } from "./utils/helpers/Transitions";

import UserContext from "./contexts/UserContext";
import DataEvaluationContext from "./contexts/DataEvaluationContext";
import { getFromLocalStorage } from "./utils/localStorageUtils";
import { getFollowingList } from "./service/service";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";

export default function App() {

  const [login, setLogin] = useState(() => getFromLocalStorage());
  const [followingList, setFollowingList] = useState([]);
  const [ isDataBeingEvaluated, setIsDataBeingEvaluated ] = useState(false);

  useEffect((() => {
    if(!!login.token) {
        getFollowingList(login.token, setFollowingList)
    }
  }), [login, isDataBeingEvaluated]);
  
  return (
    <Router>
      <UserContext.Provider value={{login, setLogin, followingList, setFollowingList}}>
        <DataEvaluationContext.Provider value = {{isDataBeingEvaluated, setIsDataBeingEvaluated }} >
          <GlobalReset />
          <TransitionsStyles />
          <Route render = { ({ location }) => (
            <TransitioningRoutes location = {location}>
              <Switch location = {location}>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/timeline" component={Timeline} />
                <Route exact path="/my-posts" component={MyPosts} />
                <Route exact path="/my-likes" component={MyLikes} />
                <Route exact path="/user/:id" component={UserPage} />
                <Route exact path="/hashtag/:hashtag" component={HashtagPage} />
              </Switch>
            </TransitioningRoutes>
          )} />
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
  body {
    background-color: #333333;
  }
`;