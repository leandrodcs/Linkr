import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/" exact render={() => <Header />}>
        </Route>
      </Switch>
    </Router>
  );
}