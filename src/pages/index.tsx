import styles from 'styles/Home.module.scss'
import { ThemeToggleButton, ThemeToggleList } from 'components/Theme'
import { useEffect, useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance, useContractWrite } from 'wagmi'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import SwithChain from 'components/SwitchChain'
import TokenSelect from 'components/TokenSelect'
import { SUPPORTED_CHAINS } from 'helpers/ChainList'
import { Token } from 'types'
import CrossChainBridge from '../abi/CrossChainBridge.json'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
    </div>
  )
}

function Header() {
  return (
    <header className={styles.header}>
      <div />
      <div />
      <div className="flex align-middle">
        <ThemeToggleButton />
        <div className="flex w-full flex-col items-center">
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}

function Main() {
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  // const { openConnectModal } = useConnectModal()
  // const { openAccountModal } = useAccountModal()
  // const { openChainModal } = useChainModal()

  const CurrentChainInfo = chain && SUPPORTED_CHAINS.find(chainInfo => chainInfo.id === chain?.id)

  const availableTokens: Token[] | undefined = CurrentChainInfo?.availableTokens!

  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: CurrentChainInfo.crossChainBridge as never,
  //   abi: CrossChainBridge,
  //   functionName: 'feed',
  // })

  const [token, setToken] = useState<Token | undefined>(availableTokens ? availableTokens[0] : undefined)
  const [amount, setAmount] = useState('0')
  const [receiverAddr, setReceiverAddr] = useState<`0x${string}`>()

  useEffect(() => {
    if (availableTokens && availableTokens?.length > 0) setToken(availableTokens[0])
  }, [availableTokens])

  const hanldeSelectToken = (token: Token) => {
    setToken(token)
  }

  const handleTransfer = () => {}

  return (
    <main className={styles.main + ' space-y-6'}>
      <div className="flex w-full flex-col items-center rounded-xl bg-sky-500/10 p-6">
        <SwithChain />
        {chain && token && availableTokens && (
          <>
            <TokenSelect
              availableTokens={availableTokens}
              token={token}
              hanldeSelectToken={hanldeSelectToken}
              amount={amount}
              setAmount={setAmount}
            />
            <p>Receiver Address:</p>
            <input
              className="ps-10 mt-2 mb-5 block w-96 rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Receiver Address"
              value={receiverAddr}
              onChange={e => setReceiverAddr(e.target.value as `0x${string}`)}
              required
            />
            <button
              className="rounded-lg bg-blue-700 px-4 py-2 text-xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={e => {
                e.preventDefault()
                handleTransfer()
              }}
            >
              Transfer
            </button>
          </>
        )}
      </div>
      {/* <div>
        <h4 className="text-center text-sm font-medium">demo: useModal (rainbowkit ^0.4.3)</h4>
        <div className="flex w-full flex-col items-center">
          {openConnectModal && (
            <button
              onClick={openConnectModal}
              type="button"
              className="m-1 rounded-lg bg-orange-500 py-1 px-3 text-white transition-all duration-150 hover:scale-105"
            >
              useConnectModal
            </button>
          )}

          <Image src={'/icons/eth.png'} alt="eth" width={100} height={100} />

          {openAccountModal && (
            <button
              onClick={openAccountModal}
              type="button"
              className="m-1 rounded-lg bg-orange-500 py-1 px-3 text-white transition-all duration-150 hover:scale-105"
            >
              useAccountModal
            </button>
          )}

          {openChainModal && (
            <button
              onClick={openChainModal}
              type="button"
              className="m-1 rounded-lg bg-orange-500 py-1 px-3 text-white transition-all duration-150 hover:scale-105"
            >
              useChainModal
            </button>
          )}
        </div>
      </div>
      <div className="w-full max-w-xl rounded-xl bg-sky-500/10 p-6 text-center">
        <dl className={styles.dl}>
          <dt>Connector</dt>
          <dd>
            {connector?.name}
            {!address && (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <span onClick={openConnectModal} className="cursor-pointer hover:underline">
                    Not connected, connect wallet
                  </span>
                )}
              </ConnectButton.Custom>
            )}
          </dd>
          <dt>Connected Network</dt>
          <dd>{chain ? `${chain?.id}: ${chain?.name}` : 'n/a'}</dd>
          <dt>Switch Network</dt>
          <dd className="flex flex-wrap justify-center">
            {isConnected &&
              chains.map(x => (
                <button
                  disabled={!switchNetwork || x.id === chain?.id}
                  key={x.id}
                  onClick={() => switchNetwork?.(x.id)}
                  className={
                    (x.id === chain?.id ? 'bg-green-500' : 'bg-blue-500 hover:scale-105') +
                    ' m-1 rounded-lg py-1 px-3 text-white transition-all duration-150'
                  }
                >
                  {x.name}
                  {isNetworkLoading && pendingChainId === x.id && ' (switching)'}
                </button>
              ))}
            <ConnectWallet show="disconnected" />
          </dd>
          <dt>Account</dt>
          <dd className="break-all">{address ? `${address}` : 'n/a'}</dd>
          <dt>Balance</dt>
          <dd className="break-all">
            {isBalanceLoading ? 'loading' : balance ? `${balance?.formatted} ${balance?.symbol}` : 'n/a'}
          </dd>
        </dl>
      </div> */}
    </main>
  )
}
