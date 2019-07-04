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

import styled from 'styled-components';

const backgroundColor = ({ type, disabled }) => {
  switch (type) {
    case 'primary':
      return disabled ? '#EBECED' : '#0087fa';
    case 'deny':
      return disabled ? '#EBECED' : '#DC143C';
    default:
      return disabled ? '#F8F9F9' : '#fff';
  }
};

const titleColor = ({ type, disabled }) => {
  switch (type) {
    case 'primary':
      return disabled ? '#B5BABD' : '#fff';
    case 'deny':
      return '#fff';
    default:
      return '#0087fa';
  }
};

const borderColor = ({ type }) => {
  switch (type) {
    case 'secondary':
      return '#0087FA';
    case 'deny':
      return 'rgba(240,240,240,10)';
    default:
      return '#0087fa';
  }
};

export const Container = styled.View`
  background: ${$props => backgroundColor($props)}
  border-radius: ${$props => ($props.small ? '14px' : '27px')};
  height: ${$props => ($props.small ? '28px' : '54px')};
  padding-horizontal: ${$props => ($props.small ? '12px' : '50px')};
  justify-content: center;
  align-items: center;
  border-width: ${$props => ($props.disabled ? 0 : '1px')};
  border-color: ${$props => borderColor($props)};
  shadow-color: #cad4dc;
  shadow-opacity: ${({ disabled }) => (disabled ? 0 : 0.5)};
  shadow-radius: 8px;
  shadow-offset: 0px 4px;
  elevation: 2;
`;

export const Title = styled.Text`
  color: ${$props => titleColor($props)};
  font-size: ${$props => ($props.small ? '13px' : '16px')};
  font-weight: 600;
`;
