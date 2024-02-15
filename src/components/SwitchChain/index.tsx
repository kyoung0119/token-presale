import React from 'react'
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'

const SwithChain = () => {
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  })
  const { openChainModal } = useChainModal()
  return (
    <div className="w-full flex flex-col items-center text-center ">
      {openChainModal && (
        <>
          <p className="text-xl font-bold">NETWORK</p>
          <div className="grid w-full grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-bold text-sky-400">Source Chain</p>
              <button
                onClick={openChainModal}
                type="button"
                className="m-1 rounded-lg bg-orange-500 py-1 px-3 text-white transition-all duration-150 hover:scale-105"
              >
                {chain?.name}
              </button>
            </div>
            <div>
              <p className="text-lg font-bold text-sky-400">Destination Chain</p>
              <dd className="flex flex-wrap justify-center">
                {isConnected &&
                  chains
                    .filter(id => id.id !== chain?.id)
                    .map(x => (
                      <button
                        disabled={!switchNetwork || x.id === chain?.id}
                        key={x.id}
                        // onClick={() => switchNetwork?.(x.id)}
                        className={
                          'm-1 rounded-lg bg-blue-500 py-1 px-3 text-white transition-all duration-150 hover:scale-105'
                        }
                      >
                        {x.name}
                        {isNetworkLoading && pendingChainId === x.id && ' (switching)'}
                      </button>
                    ))}
              </dd>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SwithChain
