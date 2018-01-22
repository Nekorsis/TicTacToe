import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducer from './redux/reducers.js';
import AppContainer from './containers/appContainer/appContainer.jsx';
import ScoreScreen from './containers/scoreScreen/scoreScreen.jsx';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={AppContainer} />
        <Route exact path="/score" component={ScoreScreen} />
      </Switch>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
};


ReactDOM.render(<App />, document.getElementById('react-root'));
