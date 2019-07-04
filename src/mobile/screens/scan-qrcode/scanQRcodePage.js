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

import React, { PureComponent } from 'react';
import { View, Alert } from 'react-native';
import Camera from 'react-native-camera';

import { modalNavigationOptions } from '../../navigator/appNavigationOptions';
import { issuer } from '../../../utils/cennnznet';
import {
  UpGapView,
  DownGapView, 
  SubContainer,
  SubGapView,
  WindowContainer
} from './style';

type Props = {
  onBarCodeRead: () => void,
  onPageDismiss: () => void,
  navigation: Object
};

class ScanQRCodePage extends PureComponent <Props> {
  static navigationOptions = navigation =>
    modalNavigationOptions(
      navigation,
      {
        headerTransparent: true,
        headerTintColor: '#fff'
      },
      {
        backgroundColor: 'transparent'
      }
    );

  state = { serviceType: null, previousData: null };

  componentWillMount() {
    const serviceType = this.props.navigation.getParam('type');
    this.setState({ serviceType });
  }

  verifyData = (data) => {
    try {
      JSON.parse(data);
      Alert.alert('Format error, please make sure the QRCode is pure wallet address');
      return false
    } catch {
      return true;
    }
  }

  renderContentView = () => (
    <View>
      <UpGapView />
      <SubContainer>
        <SubGapView />
        <WindowContainer />
        <SubGapView />
      </SubContainer>
      <DownGapView />
    </View>
  );

  renderCamera = () => {
    const { onBarCodeRead, onPageDismiss } = this.props;
    const { serviceType } = this.state;
    return (
      <Camera
        style={{ flex: 1 }}
        aspect={Camera.constants.Aspect.fill}
        onBarCodeRead={({ data }) => {
          if (data !== this.state.previousData && this.verifyData(data)) {
            const claim = { holder: data, issuer: issuer.address };
            onPageDismiss();
            onBarCodeRead(claim, serviceType);
          }
          this.setState({ previousData: data });
        }}
      >
        {this.renderContentView()}
      </Camera>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderCamera()}
      </View>
    );
  }
}

export default ScanQRCodePage;
