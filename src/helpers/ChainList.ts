import ETH from '../../public/icons/eth.png'
import AVAX from '../../public/icons/avax.png'
import USDC from '../../public/icons/usdc.png'

export const SUPPORTED_CHAINS = [
  // {
  //     id: 31337, name: 'Localnet', rpc: 'http://127.0.0.1:8545', symbol: 'ETH', router: '0xFd0c6D2899Eb342b9E48abB3f21730e9F4532976', limit: 0.0001, apiKey: process.env.ETH_APIKEY, verifyApiUrl: "https://api.etherscan.io/api"
  // },
  {
    id: 43113,
    name: 'Avalanche Testnet',
    rpc: 'https://api.avax-test.network/ext/bc/C/rpc',
    symbol: 'AVAX',
    limit: 0.01,
    scanUrl: 'https://testnet.snowtrace.io',
    testnet: true,
    // crossChainBridge: "0x765ccE4Cfb17Ee02F21Ece640eDf72Da4e00a445",
    crossChainBridge: '0xF757fe6816B927b3E7fAE49c8a9dE686aF528872',
    chainSelector: '14767482510784806043',
    availableTokens: [
      {
        name: 'WAVAX',
        address: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
        decimals: 18,
        isNative: true,
        icon: AVAX,
      },
      {
        name: 'USDC',
        address: '0x5425890298aed601595a70AB815c96711a31Bc65',
        decimals: 6,
        icon: USDC,
      },
    ],
  },
  {
    id: 43114,
    name: 'Avalanche Mainnet',
    hardhatChainname: 'avalanche',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    symbol: 'AVAX',
    router: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4', // TraderJoe
    limit: 2,
    scanUrl: 'https://snowtrace.io/',
    testnet: false,
    availableTokens: [
      {
        name: 'AVAX',
        address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        decimals: 18,
        icon: AVAX,
      },
      {
        name: 'USDC',
        address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
        decimals: 6,
        icon: USDC,
      },
    ],
  },
  {
    id: 84531,
    name: 'Base Goerli',
    rpc: 'https://goerli.base.org',
    symbol: 'ETH',
    crossChainBridge: '0x765ccE4Cfb17Ee02F21Ece640eDf72Da4e00a445',
    chainSelector: '5790810961207155433',
    limit: 0.5,
    scanUrl: 'https://goerli.basescan.org',
    testnet: true,
    availableTokens: [
      {
        name: 'ETH',
        address: '0x4200000000000000000000000000000000000006',
        decimals: 18,
        isNative: true,
        icon: ETH,
      },
      {
        name: 'USDC',
        address: '0xf175520c52418dfe19c8098071a252da48cd1c19',
        decimals: 6,
        icon: USDC,
      },
    ],
  },
]
