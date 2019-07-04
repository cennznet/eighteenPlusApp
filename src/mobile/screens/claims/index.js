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
import { NavigationActions } from 'react-navigation';
import ClaimsPage from './claimsPage';
import actionTypes from '../../../actions';
import { serviceTypes } from '../../../utils/types';

const mapStateToProps = ({ issuer }) => ({
  ...issuer
});

const mapDispatchToProps = dispatch => ({
  onScanQRCode: () => dispatch(NavigationActions.navigate({
    params: { type: serviceTypes.issuer },
    routeName: 'QRScanner'
  })),
  onRemoveClaim: selectedClaim => dispatch({
    type: actionTypes.removeClaim.requested,
    payload: {
      loading: { status: true, title: 'Removing claim' },
      selectedClaim
    }
  }),
  onRestoreClaims: () => dispatch({
    type: actionTypes.restoreClaims.requested,
    payload: { loading: { status: true, title: 'Restore claims' } }
  }),
  onClaimDetails: selectedClaim => {
    dispatch(NavigationActions.navigate({ routeName: 'ClaimDetails' }));
    dispatch({
      type: actionTypes.selectedClaim.changed,
      payload: { selectedClaim }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsPage);
