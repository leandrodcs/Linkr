import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Timeline from "./pages/Timeline/Timeline";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/" exact>
          Base project created and deployed
        </Route>
        <Route path = "/timeline" exact>
          <Timeline />
        </Route>
      </Switch>
    </Router>
  );
}