import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
export const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Route path='/comics'>
                        <ComicsPage/>
                    </Route>
                    <Route path='/'>
                        <MainPage/>
                    </Route>
                </main>
            </div>
        </Router>
    )
}