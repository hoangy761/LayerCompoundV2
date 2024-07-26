/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Banner from '~/components/Banner/Banner';
import PageTitle from '~/components/PageTitle/PageTitle';
import Platform from './Platform';
import Portfolio from './Portfolio';
import Filter from './Filter';
import { ArrowDown01Icon, ArrowUp01Icon, FilterHorizontalIcon, HelpCircleIcon, Search01Icon } from 'hugeicons-react';
import Button from '~/components/Button';
import { useModalContext } from '~/hooks/Modal/useModalProvider';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';
import Tippy from '@tippyjs/react';
interface Vault {
  contract: string;
  name: string;
  tokenAImage: string;
  tokenBImage: string;
  use: string;
  balance: number;
  deposited: number;
  apy: number;
  daily: number;
  tvl: number;
}
const Vault = () => {
  const vaults: Vault[] = [
    {
      contract: '1',
      name: 'ETHUSDC',
      tokenAImage: 'eth.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
    {
      contract: '2',
      name: 'BNBUSDC',
      tokenAImage: 'bnb.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
    {
      contract: '3',
      name: 'BTCUSDC',
      tokenAImage: 'btc.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
    {
      contract: '4',
      name: 'BTCUSDC',
      tokenAImage: 'btc.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
    {
      contract: '5',
      name: 'BTCUSDC',
      tokenAImage: 'btc.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
    {
      contract: '3',
      name: 'BTCUSDC',
      tokenAImage: 'btc.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
    {
      contract: '6',
      name: 'BTCUSDC',
      tokenAImage: 'btc.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
    {
      contract: '7',
      name: 'BTCUSDC',
      tokenAImage: 'btc.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
    {
      contract: '8',
      name: 'BTCUSDC',
      tokenAImage: 'btc.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
    {
      contract: '9',
      name: 'BTCUSDC',
      tokenAImage: 'btc.png',
      tokenBImage: 'usdt.png',
      use: 'Uniswap',
      balance: 123,
      deposited: 15,
      apy: 177,
      daily: 177,
      tvl: 123232,
    },
  ];
  const { openModal } = useModalContext();
  const { selectedAccount } = useWalletProvider();
  const [openDetail, setOpenDetail] = useState<string>('');
  const [openTippySort, setOpenTippySort] = useState<boolean>(false);
  const handleOpenTippySort = () => {
    setOpenTippySort(!openTippySort);
  };
  const showDetail = (id: string) => {
    if (id === openDetail) {
      setOpenDetail('');
    } else {
      setOpenDetail(id);
    }
  };
  return (
    <>
      <PageTitle title="LayerC | Vaults" />

      <main className="container mx-auto px-2">
        <div className="my-4">
          <Banner />
        </div>
        <div className="flex justify-between my-10">
          <Platform />
          <Portfolio />
        </div>
        <div className="flex justify-between mb-10 ">
          <div className="w-full flex-1 hidden md:block"></div>
          <div className="w-full flex-1">
            <Filter />
          </div>
        </div>
        <div className="bg-black-2 mb-10 sticky top-0 z-20">
          <div className="grid grid-cols-4 p-3 items-center">
            <div className="md:col-span-1 col-span-2">
              <div className="md:w-4/5 flex items-center justify-between bg-white">
                <input className="w-4/5 h-10 outline-none text-black px-4" />
                <Search01Icon className="left-0 text-black mr-3 " />
              </div>
            </div>
            <div className="sm:col-span-2 md:grid-cols-5 gap-0 md:hidden">
              <div className="ml-10 flex ">
                <Tippy
                  delay={0}
                  visible={openTippySort}
                  interactive
                  onClickOutside={() => setOpenTippySort(false)}
                  content={
                    <div className="box rounded-md z-200 bg-white">
                      <Button white large className="bg-white-3 rounded-md">
                        Wallet
                      </Button>
                      <Button white large className="bg-white-3">
                        Deposited
                      </Button>
                      <Button white large className="bg-white-3">
                        APY
                      </Button>
                      <Button white large className="bg-white-3">
                        Daily
                      </Button>
                      <Button white large className="bg-white-3 rounded-md">
                        TVL
                      </Button>
                    </div>
                  }
                >
                  <Button
                    text
                    icon={<FilterHorizontalIcon />}
                    iconRight={openTippySort ? <ArrowUp01Icon /> : <ArrowDown01Icon />}
                    onClick={handleOpenTippySort}
                    roundedMd
                  >
                    Sort
                  </Button>
                </Tippy>
              </div>
            </div>
            <div className="col-span-3 md:grid grid-cols-5 gap-2 hidden">
              <Button iconRight={<ArrowDown01Icon />} className="!p-0 !m-0">
                Wallet
              </Button>
              <Button iconRight={<ArrowDown01Icon />} className="!p-0 !m-0">
                Deposited
              </Button>
              <Button iconRight={<ArrowDown01Icon />} className="!p-0 !m-0">
                APY
              </Button>
              <Button iconRight={<ArrowDown01Icon />} className="!p-0 !m-0">
                Daily
              </Button>
              <Button iconRight={<ArrowDown01Icon />} className="!p-0 !m-0">
                TVL
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-2 overflow-y-scroll ">
          {vaults.map((item) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div className="bg-black-2 hover:cursor-pointer select-none z-10" key={item.contract}>
              <div
                className={`grid grid-cols-4 p-3 items-center hover:bg-black-4 hover:scale-y-125  hover:opacity-80 ${openDetail === item.contract ? 'bg-black-4 scale-y-125' : ''}`}
                onClick={() => showDetail(item.contract)}
              >
                <div className="col-span-2 md:col-span-1">
                  <div className="w-4/5 flex items-center justify-between ">
                    <div className="flex relative">
                      <img src={`coin/${item.tokenAImage}`} alt="logo" className="w-14 relative z-10" />
                      <img src={`coin/${item.tokenBImage}`} alt="logo" className="w-14 absolute left-1/2 " />
                    </div>
                    <div className="ml-10">
                      <h1 className="text-xs md:text-base">{item.name}</h1>
                      <p className="text-white-1">Use: {item.use}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-3 grid sm:grid-cols-1 md:grid-cols-5 md:gap-2 items-center">
                  <div className="text-xs md:text-base">
                    {selectedAccount ? (
                      <div className="grid grid-cols-2">
                        <p className="text-white-1 md:hidden">Balance:</p>
                        <p>{` ${item.balance} ${item.name}`}</p>
                      </div>
                    ) : (
                      <Button text onClick={openModal} className="!p-0 !m-0">
                        Connect Wallet
                      </Button>
                    )}{' '}
                  </div>
                  <div className="text-xs md:text-base">
                    {selectedAccount ? (
                      <div className="grid grid-cols-2">
                        <p className="text-white-1 md:hidden">Deposited:</p>
                        <p> {` ${item.deposited} ${item.name}`}</p>
                      </div>
                    ) : (
                      <Button text onClick={openModal} className="!p-0 !m-0">
                        Connect Wallet
                      </Button>
                    )}
                  </div>
                  <div className="text-xs md:text-base grid grid-cols-2">
                    <p className="text-white-1 md:hidden">Apy:</p>
                    <p>{`${item.apy}%`}</p>
                  </div>
                  <div className="text-xs md:text-base grid grid-cols-2">
                    <p className="text-white-1 md:hidden">Daily:</p>
                    <p>{`${item.daily}%`}</p>
                  </div>
                  <div className="text-xs md:text-base grid grid-cols-2">
                    <p className="text-white-1 md:hidden">Tvl:</p>
                    <p>{`${item.tvl}%`}</p>
                  </div>
                </div>
              </div>
              {/* show */}
              {openDetail === item.contract && (
                <div className="bg-white-1 rounded-b-md">
                  <div className="p-4 md:flex justify-between md:space-x-4">
                    <div className="flex-1">
                      <div className="">
                        <p className="text-black-3 text-sm md:text-lg">Balance:</p>
                        <h1 className="text-sm md:text-xl underline decoration-dotted">{`${item.balance} ${item.name}`}</h1>
                      </div>
                      <div className="">
                        <div className="flex justify-center">
                          <input
                            type="number"
                            className="outline-none text-black text-2xl  h-10 md:w-1/2  bg-transparent border-2  border-b-black-2 border-t-transparent border-r-transparent border-l-transparent"
                            value={0.0}
                          />
                        </div>
                        <div className=" flex justify-center">
                          <div className="flex justify-between md:w-1/2">
                            <Button text className="text-black-2 underline">
                              0%
                            </Button>
                            <Button text className="text-black-2">
                              25%
                            </Button>
                            <Button text className="text-black-2">
                              50%
                            </Button>
                            <Button text className="text-black-2">
                              75%
                            </Button>
                            <Button text className="text-black-2">
                              100%
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className=" flex justify-center my-5">
                        {selectedAccount ? (
                          <Button black roundedMd>
                            Approve
                          </Button>
                        ) : (
                          <Button black roundedMd onClick={openModal}>
                            Connect Wallet
                          </Button>
                        )}
                      </div>
                      <div className=" flex justify-center">
                        <h3 className="text-black md:text-lg text-sm font-semibold">
                          Deposit fee: 0.0%, Withdrawal fee: 0.05%
                        </h3>
                        <div className="md:hidden">
                          <Tippy
                            interactive
                            content={
                              <div className="box rounded-md z-200 bg-white">
                                <h5 className="text-black text-sm text-center">
                                  You will receive EUSlplc token as a receipt for your deposited EUSlp assets. This
                                  token is needed to withdraw your EUSlp, do not trade or transfer EUSlplc to strangers!
                                </h5>
                              </div>
                            }
                          >
                            <Button icon={<HelpCircleIcon />} className="text-black !w-0 !p-0 !m-0"></Button>
                          </Tippy>
                        </div>
                      </div>
                      <div className=" justify-center hidden md:flex">
                        <h5 className="text-black text-sm text-center w-3/4">
                          You will receive EUSlplc token as a receipt for your deposited EUSlp assets. This token is
                          needed to withdraw your EUSlp, do not trade or transfer EUSlplc to strangers!
                        </h5>
                      </div>
                    </div>
                    <div className="hidden md:block border-2 border-r-black-3 border-t-transparent border-b-transparent border-l-transparent"></div>
                    <div className="flex-1 ">
                      <div>
                        <p className="text-black-3">Deposited:</p>
                        <h1 className="text-xl underline decoration-dotted">{`${item.deposited} ${item.name}`}</h1>
                      </div>
                      <div className="">
                        <div className=" flex justify-center">
                          <input
                            type="number"
                            className="outline-none text-black text-2xl  h-10 md:w-1/2 bg-transparent border-2  border-b-black-2 border-t-transparent border-r-transparent border-l-transparent"
                            value={0.0}
                          />
                        </div>
                        <div className=" flex justify-center">
                          <div className="flex justify-between md:w-1/2">
                            <Button text className="text-black-2 underline">
                              0%
                            </Button>
                            <Button text className="text-black-2">
                              25%
                            </Button>
                            <Button text className="text-black-2">
                              50%
                            </Button>
                            <Button text className="text-black-2">
                              75%
                            </Button>
                            <Button text className="text-black-2">
                              100%
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className=" flex justify-center my-5">
                        {selectedAccount ? (
                          <div className="space-x-4 flex">
                            <Button white roundedMd>
                              Withdraw
                            </Button>
                          </div>
                        ) : (
                          <Button white roundedMd onClick={openModal}>
                            Connect Wallet
                          </Button>
                        )}
                      </div>
                      <div className=" flex justify-center">
                        <h3 className="text-black text-lg font-semibold">Withdrawal will result in: </h3>
                      </div>
                      <div className=" flex justify-center">
                        <h5 className="text-black text-sm text-center w-3/4">1. Redeem EUSlplc token for EUSlp</h5>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Vault;
