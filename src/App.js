import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/" exact>
          Base project created and deployed
        </Route>
      </Switch>
    </Router>
  );
}