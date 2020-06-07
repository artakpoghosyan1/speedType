import * as React from 'react';
import {css} from 'emotion'
import 'bootstrap/dist/css/bootstrap.min.css'
import {LoginComponent} from "./LoginComponent";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {PlayComponent} from "./PlayComponent";
import {ProtectedRoute} from "./ProtectedRoute";

const containerClass = css`
    position: relative;
`

const App: React.FunctionComponent = () => {
    return (
        <Container className={containerClass}>
            <Router>
                <Switch>
                    <Route exact path="/speedType">
                        <Redirect to="/play"/>
                    </Route>
                    <Route exact strict path="/login">
                        <LoginComponent/>
                    </Route>
                    <ProtectedRoute exact path="/play">
                        <PlayComponent/>
                    </ProtectedRoute>
                </Switch>
            </Router>
        </Container>
    )
}

export default App
