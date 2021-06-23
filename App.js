import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './store'
import Main from './Main'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function App() {
  return (
      <Provider store={store}>
          <Main />
      </Provider>
  );
}