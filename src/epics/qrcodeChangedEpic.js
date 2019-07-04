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

import { Alert } from 'react-native';
import { of, empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavigationActions } from 'react-navigation';
import { ofType } from 'redux-observable';

import actionTypes from '../actions';
import { serviceTypes }  from '../utils/types';

const showAlert = (t) => {
  setTimeout(() => 
    Alert.alert(
      'Input error',
      `Make sure the QRCode includes ${t})`,
    500
  ));
};

const qrcodeChangedEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.qrcode.changed),
    switchMap((action) => {
      const { claim, serviceType } = action.payload;
      const { holder } = claim || {};
      if (!holder) {
        showAlert("holder's address");
        return empty();        
      }

      if (serviceType === serviceTypes.verification) {
        const requesting = { status: true };
        return of({
          type: actionTypes.verification.toggled,
          payload: { holder, requesting }
        });
      }

      if (serviceType === serviceTypes.issuer) {
        return of(NavigationActions.navigate({ routeName: 'AddClaim' }));
      }

      return empty();
    })
  );

export default qrcodeChangedEpic;
