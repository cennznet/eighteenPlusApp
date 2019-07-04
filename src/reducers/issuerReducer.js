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

import actionTypes from '../actions';

const loading = { status: false, title: null };

const initialState = {
  selectedClaim: null,
  claims: [],
  loading,
};

const claimReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.restoreClaims.requested:
    case actionTypes.removeClaim.requested:
    case actionTypes.addClaim.requested:
      return { ...state, ...action.payload };

    case actionTypes.restoreClaims.completed:
    case actionTypes.addClaim.completed:
      return { ...state, ...action.payload, loading };
    case actionTypes.removeClaim.completed:
      return { ...state, ...action.payload, loading, selectedClaim: null };

    case actionTypes.addClaim.failed:
    case actionTypes.removeClaim.failed:
    case actionTypes.restoreClaims.failed:
      return { ...state, loading };
    
    case actionTypes.qrcode.changed:
      return { ...state, selectedClaim: action.payload.claim };
    case actionTypes.documentType.changed:
      return { ...state, selectedClaim: { ...state.selectedClaim, ...action.payload } }

    case actionTypes.selectedClaim.changed:
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
};

export default claimReducer;
