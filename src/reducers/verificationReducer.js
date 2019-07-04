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

const requesting = {
  status: false,
  title: null
};

const initialState = {
  holder: null,
  isLegal: null,
  topics: [],
  claims: null,
  requesting
};

const verificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.verification.toggled:
    case actionTypes.verifyOverEighteen.requested:
      return { ...state, ...action.payload };
    case actionTypes.verifyOverEighteen.completed:
    case actionTypes.verifyOverEighteen.failed:
      return { ...state, ...action.payload, requesting };
    
    case actionTypes.getClaims.completed:
      return { ...state, ...action.payload };
    case actionTypes.getClaims.failed:
      return { ...state, requesting };
    case actionTypes.legalVerified.toggled:
      return { ...initialState };

    default:
      return state;
  }
};

export default verificationReducer;
