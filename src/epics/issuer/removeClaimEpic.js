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
import actionTypes from '../../actions';

const removeClaimEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.removeClaim.requested),
    withLatestFrom(state$),
    switchMap(async ([, state]) => {
      const { claims, selectedClaim } = state.issuer;
      const { holder, topic } = selectedClaim;
      const status = await attestation.removeClaim(holder, topic);
      if (!status) {
        return of({ type: actionTypes.removeClaim.failed });
      }

      const updatedClaims = claims.filter(claim => {
        const { holder: h, topic: t } = claim;
        return h !== holder || t !== topic;
      });

      return ({
        type: actionTypes.removeClaim.completed,
        payload: {
          claims: updatedClaims,
          selectedClaim: null,
        }
      });
    }),
    catchError(error =>
      of({
        type: actionTypes.removeClaim.failed,
        payload: error
      })
    )
  );

export default removeClaimEpic;
