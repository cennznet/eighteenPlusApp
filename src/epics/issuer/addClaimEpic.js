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
import { switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import attestation from '../../utils/attestation';
import { issuer } from '../../utils/cennnznet';
import actionTypes from '../../actions';

const addClaimEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.addClaim.requested),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const { claims, selectedClaim } = state.issuer;
      const { holder, topic } = selectedClaim;
      return attestation.addClaim(holder, topic, topic)
        .then(() => ({
          type: actionTypes.addClaim.completed,
          payload: { claims: [
            ...claims,
            { ...selectedClaim, issuer: issuer.address }
          ]}
        }));
    }),
    catchError(error =>
      of({
        type: actionTypes.addClaim.failed,
        payload: error
      })
    )
  );

export default addClaimEpic;
