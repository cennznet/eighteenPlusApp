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
 
import AsyncStorage from '@react-native-community/async-storage';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { issuer } from '../../utils/cennnznet';
import actionTypes from '../../actions';

const storeClaimsEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.storeClaims.requested),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const { claims } = state.issuer;
      return AsyncStorage
        .setItem(issuer.address, JSON.stringify(claims))
        .then(() => ({ type: actionTypes.storeClaims.completed }))
        .catch(e => ({ type: actionTypes.storeClaims.failed }));
    })
  );

export default storeClaimsEpic;
