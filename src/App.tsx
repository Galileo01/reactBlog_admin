import React, { Suspense } from 'react';
import './assets/styles/App.less';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { router } from './router';
import Loading from './components/Loading';
import './assets/styles/App.less';
function App() {
    return (
        <HashRouter>
            <div className="App">
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        {router.map((item, index) => {
                            return (
                                <Route
                                    path={item.path}
                                    component={item.component}
                                    key={index}
                                />
                            );
                        })}
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Suspense>
            </div>
        </HashRouter>
    );
}

export default App;
