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

import { Wallet, SimpleKeyring } from '@cennznet/wallet';
import { hexToU8a, u8aToHex } from '@cennznet/util';
import { WsProvider } from '@cennznet/api/polkadot';
import { Api } from '@cennznet/api';
import { waitReady } from '@plugnet//wasm-crypto-js';
import network from './network';

const issuer = {
  address: '5C8JSNofegsFjwYHnrG7XtG1hCJ2PEtvQQFPkfeo75aLv6uB',
  seed: '0x6dfc73017eece8dbbf89736abdcefa5dcf9536a3c06da21031108f68f57382f7'
};

let attestationApi = null;

const generateWallet = async () => {
  await waitReady();
  const simpleKeyring = new SimpleKeyring();
  simpleKeyring.addFromSeed(hexToU8a(issuer.seed));
  const wallet = new Wallet();

  await wallet.createNewVault('666');
  await wallet.addKeyring(simpleKeyring);
  return wallet;
};

const createApi = async () => {
  if (attestationApi) return attestationApi;

  const provider = new WsProvider(network.url);
  const api = await Api.create({ provider });
  const wallet = await generateWallet();
  api.setSigner(wallet);

  return api;
};

const signAndSend = async (claim) => (
  new Promise(resolve => {
    claim.signAndSend(issuer.address, async ({ events, status }) => {
      if (status.isFinalized && events !== undefined) {
        const txHash = u8aToHex(status.asFinalized);
        console.log('@====blockHash===@:', txHash);
        resolve(txHash);
      }
    });
  })
);

export {
  createApi,
  issuer,
  signAndSend
};
