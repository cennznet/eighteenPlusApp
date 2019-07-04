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

import { connect } from 'react-redux';
import actionTypes from '../../../actions';
import AddClaimPage from './addClaimPage';

const mapDispatchToState = dispatch => ({
  onIssueClaim: () => dispatch({
    type: actionTypes.addClaim.requested,
    payload: { loading: { status: true, title: 'Claiming' } }
  }),
  onDocTypeChanged: topic => dispatch({ 
    type: actionTypes.documentType.changed,
    payload: { topic }
  }),
});

const mapPropsToState = ({ issuer }) => ({
  address: issuer.selectedClaim.holder,
  loading: issuer.loading
});

export default connect(mapPropsToState, mapDispatchToState)(AddClaimPage);
