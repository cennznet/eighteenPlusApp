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
import { Touchable, Icon } from './style';
import FontIcon from '../icon';

type Props = {
  icon: string,
  onPress: () => void
};

const FloatingButton = ({ icon, onPress }: Props) => (
  <Touchable onPress={onPress}>
    {typeof icon === 'string' ? (
      <FontIcon name={icon} color="#fff" size={30} />
    ) : (
      <Icon source={icon} />
    )}
  </Touchable>
);

export default FloatingButton;
