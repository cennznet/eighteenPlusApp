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

import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import tabBarNavigatorConfig from './tabBarNavigationOptions';
import VerifyScreen from '../screens/verify';
import ClaimsScreen from '../screens/claims';
import ClaimDetailsScreen from '../screens/claimDetails';
import ScanQRCodeScreen from '../screens/scan-qrcode';
import AddClaimScreen from '../screens/addClaim';

// issuer
const IssuerStack = createStackNavigator({
  Claims: { screen: ClaimsScreen },
  ClaimDetails: { screen: ClaimDetailsScreen }
});

// tabBar
const homeStack = createBottomTabNavigator(
  tabBarNavigatorConfig([
    { issuer: { screen: IssuerStack, icon: 'cards-outline' } },
    { '18+': { screen: VerifyScreen, icon: 'account-check' } },
  ]),
  {
    tabBarOptions: {
      activeTintColor: '#0087fa',
      inactiveTintColor: 'gray',
      labelStyle: { marginBottom: 3 },
      style: { height: 50 }
    }
  }
);

const ScanQRCodeStack = createStackNavigator({
  QRScanner: { screen: ScanQRCodeScreen }
})

const AddClaimStack = createStackNavigator({
  AddClaim:  { screen: AddClaimScreen }
});

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: homeStack },
    QRScanner: { screen: ScanQRCodeStack },
    AddClaim: { screen: AddClaimStack }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default HomeNavigator;
