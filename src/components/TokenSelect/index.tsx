import React, { Fragment, useEffect, useState } from 'react'
import { erc20ABI, useAccount, useBalance, useContractRead, useNetwork } from 'wagmi'
import Image from 'next/image'
import { Token } from '../../types'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { createPublicClient, formatUnits, http } from 'viem'
import { avalancheFuji, baseGoerli } from 'viem/chains'

interface TokenSelectProps {
  availableTokens: Token[]
  token: Token
  hanldeSelectToken: (arg0: Token) => void
  amount: string
  setAmount: (arg0: string) => void
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const TokenSelect = ({ availableTokens, token, hanldeSelectToken, amount, setAmount }: TokenSelectProps) => {
  const { address } = useAccount()

  const { data: balance } = useContractRead({
    address: token.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  return (
    <div className="flex w-60 flex-col items-center py-3">
      <p className="pb-2 text-xl font-bold">TOKEN</p>

      <Listbox value={token} onChange={hanldeSelectToken}>
        {({ open }) => (
          <>
            <div className="relative mt-2 w-full">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <Image src={token.icon} alt={token.name} width={30} height={30} />
                  {/* <img src={token.icon} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                  <span className="ml-3 block truncate">{token.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {availableTokens.map((availableToken: Token, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={availableToken}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <Image src={availableToken.icon} alt={availableToken.name} width={30} height={30} />
                            {/* <img src={availableToken.icon} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {availableToken.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      <p className="pt-4">
        Balance : {balance ? formatUnits(balance, token.decimals) : 0} {token.name}
      </p>
      <form className="w-full">
        <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
        <div className="relative">
          <input
            className="ps-10 block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="0.1"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <button
            className="absolute right-2 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={e => {
              e.preventDefault()
              setAmount(formatUnits(balance, token.decimals))
            }}
          >
            Max
          </button>
        </div>
      </form>
    </div>
  )
}

export default TokenSelect
