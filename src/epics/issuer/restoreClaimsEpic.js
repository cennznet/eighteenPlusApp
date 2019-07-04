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
import { of } from 'rxjs';

import { issuer } from '../../utils/cennnznet';
import actionTypes from '../../actions';

const restoreClaimsEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.restoreClaims.requested),
    withLatestFrom(state$),
    switchMap(() => (
      AsyncStorage
        .getItem(issuer.address)
        .then((claims) => ({
          type: actionTypes.restoreClaims.completed,
          payload: { claims: claims ? JSON.parse(claims) : [] }
        }))
        .catch(e => of({ type: actionTypes.restoreClaims.failed }))
    ))
  );

export default restoreClaimsEpic;
