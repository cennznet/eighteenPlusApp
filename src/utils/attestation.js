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

import { u8aToHex, stringToU8a } from '@cennznet/util';
import { createApi, signAndSend } from './cennnznet';
import { Attestation } from '@cennznet/crml-attestation';

const stringToHex = str => u8aToHex(stringToU8a(str));

const createAttestationApi =  async () => {
  const api = await createApi();
  return api.tx.attestation;
};

const attestation = {
  addClaim: async (holder, topic, value) => {
    const api = await createAttestationApi();
    const claim = api.setClaim(
      holder,
      stringToHex(topic),
      stringToHex(value)
    );

    const txHash = await signAndSend(claim);
    return txHash;
  },
  
  removeClaim: async (holder, topic) => {
    const api = await createAttestationApi();
    const claim = await api.removeClaim(
      holder,
      stringToHex(topic)
    );

    const txHash = await signAndSend(claim);
    return txHash;
  },
  
  getClaims: async (holder, issuers, topics) => {
    const api = await createApi();
    const attestationApi = await Attestation.create(api);
    const claims = await attestationApi.getClaims(holder, issuers, topics);
    
    return claims;
  }
};

export default attestation;
