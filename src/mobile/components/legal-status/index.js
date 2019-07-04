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

import React from 'react';
import Modal from '../modal';
import Button from '../button';
import { 
  BGContainer, 
  Container, 
  ContentContainer, 
  Image, 
  Title
} from './style';

const source = (isLegal) => (
  isLegal ?
  require('../../../images/success.png') :
  require('../../../images/failed.png')
);

type Props = {
  title: string,
  isLegal: boolean,
  visible: boolean,
  onPress: () => void
};

const LegalStatus = ({
  title,
  isLegal,
  onPress,
  visible = false 
}: Props) => (
  <Modal visible={visible}>
    <BGContainer>
      <Container>
        <ContentContainer>
          <Image source={source(isLegal)} />
          <Title>{title}</Title>
        </ContentContainer>
        <Button
          title={isLegal ? 'Good to go' : 'Okay'}
          onPress={onPress}
        />
      </Container>
    </BGContainer>
  </Modal>
);

export default LegalStatus;
