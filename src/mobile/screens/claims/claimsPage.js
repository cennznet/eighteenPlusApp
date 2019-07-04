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
import { ActionSheetIOS, ScrollView } from 'react-native';
import { isEmpty } from 'lodash';

import { defaultNavigationOptions } from '../../navigator/appNavigationOptions';
import FloatingButton from '../../components/floating-button';
import Loading from '../../components/loading';
import { topicDescs } from '../../../utils/types';
import {
  Container,
  Header,
  Title,
  Wrapper,
  Image,
  ClaimContainer,
  EmptyContainer,
  ClaimTitle,
  Content
} from './style';

type Props = {
  claims: Array,
  loadingMsg: string,
  selectedClaim: Object,
  loading: boolean,
  onScanQRCode: () => void,
  onRemoveClaim: () => void,
  onClaimDetails: () => void,
  onRestoreClaims: () => void
};

class ClaimsPage extends PureComponent <Props> {
  static navigationOptions = () =>
    defaultNavigationOptions({
      headerStyle: { borderBottomWidth: 0 },
    });

  componentWillMount() {
    const { onRestoreClaims } = this.props;
    onRestoreClaims();
  }

  buttons = (item) => ([{
    text: 'Delete',
    backgroundColor: 'red', 
    color: '#fff',
    onPress: () => this.showActionSheet(item)
  }]);

  renderItem = (claim) => {
    const { onClaimDetails } = this.props;
    const { topic, holder } = claim;
    const title = `Holder: ${holder}`;
    const typeDesc = `Topic: ${topicDescs[topic]}`;
    const key = `${holder}${topic}`;
    return (
      <ClaimContainer key={key} onPress={() => onClaimDetails(claim)}>
        <ClaimTitle numberOfLines={1} ellipsizeMode="middle">
          {title}
        </ClaimTitle>
        <Content>{typeDesc}</Content>
      </ClaimContainer>
    );
  };

  renderNoneClaims = () => (
    <EmptyContainer>
      <Image source={require('../../../images/empty.png')} />
      <Content>You don't have any claims</Content>
    </EmptyContainer>
  );

  showActionSheet = (item) => {
    const { onRemoveClaim } = this.props;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Would you like to delete this claim',
        options: ['Cancel', 'Delete'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (index) => {
        if (index === 1) onRemoveClaim(item);
      },
    );
  }

  render () {
    const { claims, onScanQRCode, loading: { status } } = this.props;
    return (
      <Container>
        <Header>
          <Title>Claims</Title>
        </Header>
        {!isEmpty(claims) && 
        <ScrollView>
          {claims.map(claim => this.renderItem(claim))}
        </ScrollView>}
        <FloatingButton
          icon="qrcode-scan"
          onPress={onScanQRCode}
        />
        <Loading visible={status} />
      </Container>
    );
  }
}

export default ClaimsPage;
