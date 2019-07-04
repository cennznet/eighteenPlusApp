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
import { ActionSheetIOS, StyleSheet } from 'react-native';

import { Container, ContentContainer, TypeContainer, TypeText } from './style';
import { modalNavigationOptions } from '../../navigator/appNavigationOptions';
import { topicDescs, topicTypes } from '../../../utils/types';
import Button from '../../components/button';
import RowItem from '../../components/row-item';

type Props = {
  address: string,
  loading: boolean,
  onDocTypeChanged: () => void,
  onIssueClaim: () => void
};

class AddClaimPage extends PureComponent <Props> {
  static navigationOptions = navigation =>
    modalNavigationOptions(
      navigation,
      { 
        title: 'Verify ID'
      },
      {
        borderBottomWidth: StyleSheet.hairlineWidth
      });

  state = { docType: null };

  get docType() {
    const { docType } = this.state;
    return docType || 'Select document';
  }

  get docTypes() {
    return topicTypes.map(type => topicDescs[type]);
  }

  onSelectDocType = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Select the topic',
        options: [...this.docTypes, 'Cancel'],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 3,
      },
      (index) => {
        if (index < 3) {
          const { onDocTypeChanged } = this.props;
          const docType = this.docTypes[index];
          onDocTypeChanged(topicTypes[index]);
          this.setState({ docType });
        }
      },
    );
  };

  render() {
    const { address, onIssueClaim } = this.props;
    const { docType } = this.state;
    return (
      <Container>
        <ContentContainer>
          <RowItem title="User identity">
            <TypeText numberOfLines={1} ellipsizeMode="middle">
              {address}
            </TypeText>
          </RowItem>
          <RowItem title="Document type">
            <TypeContainer onPress={this.onSelectDocType}>
              <TypeText light={!docType}>{this.docType}</TypeText>
            </TypeContainer>
          </RowItem>
        </ContentContainer>
        <Button
          type="primary"
          title="Issue attestation"
          disabled={!docType}
          onPress={onIssueClaim}
        />
      </Container>
    );
  }
}

export default AddClaimPage;
