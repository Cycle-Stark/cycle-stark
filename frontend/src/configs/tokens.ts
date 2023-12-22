
interface Token {
    name: string
    symbol: string
    decimals: number
    address: string
    pair_id: string
    icon: string
}

const TOKENS: Token[] = [
    {
        name: 'Ethereum',
        decimals: 18,
        address: '0x49D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7',
        pair_id: 'ETH/USD',
        symbol: 'ETH',
        icon: 'https://cryptocurrencyliveprices.com/img/eth-ethereum.png'
    },
    {
        name: 'Bitcoin',
        decimals: 8,
        address: '0x12d537dc323c439dc65c976fad242d5610d27cfb5f31689a0a319b8be7f3d56',
        pair_id: 'BTC/USD',
        symbol: 'BTC',
        icon: 'https://cryptocurrencyliveprices.com/img/btc-bitcoin.png'
    },
    {
        name: 'USDC',
        decimals: 6,
        address: '0x1d5b64feabc8ac7c839753994f469704c6fabdd45c8fe6d26ed57b5eb79057',
        pair_id: 'USDC/USD',
        symbol: 'USDC',
        icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029'
    },
    {
        name: 'USDT',
        decimals: 6,
        address: '0x386e8d061177f19b3b485c20e31137e6f6bc497cc635ccdfcab96fadf5add6a',
        pair_id: 'DAI/USD',
        symbol: 'USDT',
        icon: 'https://cryptocurrencyliveprices.com/img/usdt-tether.png'
    },
    {
        name: 'Dai Stable Coin',
        decimals: 18,
        address: '0x278f24c3e74cbf7a375ec099df306289beb0605a346277d200b791a7f811a19',
        pair_id: 'DAI/USD',
        symbol: 'DAI',
        icon: 'https://cryptocurrencyliveprices.com/img/dai-dai.png'
    }
]

export type { Token }
export default TOKENS