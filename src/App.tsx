import React, { Suspense } from 'react';
import './assets/styles/App.less';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { Button } from 'antd';
import { router } from './router'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<span>Loading</span>}>
          <Switch>
            {
              router.map((item, index) => {
                return (
                  <Route path={item.path} component={item.component} key={index} />
                )
              })
             
            }
             <Redirect from="/" to="/home"/>
          </Switch>
        </Suspense>

      </div>
    </BrowserRouter>

  );
}

export default App;
