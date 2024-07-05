import React from 'react';

import RootNavigator from './src/navigation/RootNavigator';

import { Provider } from 'react-redux';

import store from './src/redux';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;