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
import { ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode';
import ActionSheet from 'react-native-actionsheet';

import { Container, ContentContainer, ButtonContainer, QRContainer, Text } from './style';
import { defaultNavigationOptions } from '../../navigator/appNavigationOptions';
import RowItem from '../../components/row-item';
import Button from '../../components/button';
import Loading from '../../components/loading';
import { topicDescs } from '../../../utils/types';

type Props = {
  claim: Object,
  loading: boolean,
  onRemoveClaim: () => void
};

class ClaimDetailsPage extends PureComponent <Props> {
  static navigationOptions = () =>
    defaultNavigationOptions({ title: 'Claim details' });
  
  renderRowItem = (title, content) => {
    return (
      <RowItem title={title}>
        <Text numberOfLines={1} ellipsizeMode="middle">
          {content}
        </Text>
      </RowItem>
    );
  };

  renderActionSheetView = () => {
    const { claim, onRemoveClaim } = this.props;
    return (
      <ActionSheet
        ref={a => this.ActionSheet = a}
        title={'Would you like to delete this claim'}
        options={['Cancel', 'Delete']}
        destructiveButtonIndex={1}
        cancelButtonIndex={0}
        onPress={(index) => {
          if (index === 1) onRemoveClaim(claim);
        }}
      />
    );
  }

  render() {
    const { claim, loading } = this.props;
    const { issuer, holder, topic } = claim || {};
    console.log('claim:', claim);
    const claimStr = JSON.stringify(claim);
    return (
      <ScrollView>
        <Container>
          <ContentContainer>
            {this.renderRowItem('Issuer', issuer)}
            {this.renderRowItem('Holder', holder)}
            {this.renderRowItem('Topic',  topicDescs[topic])}
            <QRContainer>
              <QRCode
                value={claimStr}
                size={230}
                bgColor="black"
                fgColor="white"
              />
            </QRContainer>
          </ContentContainer>
          <ButtonContainer>
            <Button
              type="deny"
              title="Remove claim"
              onPress={() => this.ActionSheet.show()}
            />
          </ButtonContainer>
          <Loading visible={loading.status} />
          {this.renderActionSheetView()}
        </Container>
      </ScrollView>
    );
  }
}

export default ClaimDetailsPage;
