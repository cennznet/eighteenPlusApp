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
 
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { get, isEmpty } from 'lodash';

import attestation from '../../utils/attestation';
import { issuer } from '../../utils/cennnznet';
import { topicTypes } from '../../utils/types';
import actionTypes from '../../actions';

const getClaimsEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.getClaims.requested),
    switchMap((action) => {
      const { holder } = action.payload;
      if (!holder) {
        return of({
          type: actionTypes.getClaims.failed,
          payload: { error: 'Holder can not be null' }
        });
      }

      return attestation.getClaims(
          holder, 
          [issuer.address],
          topicTypes
        )
        .then(({ claims: _claims }) => {
          const { eighteenPlus } = _claims || {};
          const claim = get(eighteenPlus, `${issuer.address}`);
          const claims = !isEmpty(claim.toU8a()) ? [claim] : [];
          return ({
            type: actionTypes.getClaims.completed,
            payload: { claims }
          })
        })
        .catch(error => ({
          type: actionTypes.getClaims.failed,
          payload: error
        }))
    }),
    catchError(error =>
      of({
        type: actionTypes.getClaims.failed,
        payload: error
      })
    )
  );

export default getClaimsEpic;
