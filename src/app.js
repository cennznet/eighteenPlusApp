/**
 * Copyright 2019 Centrality Investments Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import haptic from 'react-native-haptic-feedback';

import exceptionsHandlerRegister from './utils/exceptionHandler';
import HomeNavigator from './mobile/navigator';
import { createApi } from './utils/cennnznet';
import store from './store';

exceptionsHandlerRegister();
haptic.trigger();
createApi();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeNavigator />
      </Provider>
    );
  }
}
