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
import LottieView from 'lottie-react-native';

import Modal from '../modal';
import { Container, Title } from './style';

const Loading = ({visible = false}) => (
  <Modal visible={visible}>
    <Container>
      <LottieView
        style={{ width: 80, backgroundColor: 'transparent' }}
        source={require('./loading.json')}
        autoPlay
        loop
      />
    </Container>
  </Modal>
);

export default Loading;