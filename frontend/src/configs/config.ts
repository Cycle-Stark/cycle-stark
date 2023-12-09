import { connect, disconnect } from 'starknetkit'

// import { abi } from '../assets/abi.json' // main contract abi
import { abi } from '../assets/abi_v2.json' // main contract abi
import { erc20abi } from '../assets/erc20abi.json'
import pragma_abi from '../assets/pragmaabi.json'

// const PRIVATE_KEY = "0x819033027885bc1840b6d564b6e8f68c"
const ACCOUNT_ADDRESS = "0x77a6390ab3dc3045df373b93bf8b93899c3ad5111da9b66c54b62ddc98e7d4"

// const CONTRACT_ADDRESS = "0x010a09eb11dd5cc68012039a1923209413a96eafdefd635ac406231627464328" // main contract address
const CONTRACT_ADDRESS = "0x317b1dfe90ab699ee810138cc1d5b3958a3f1e0cc5c58bb17f69fd6be501670"
const CONTRACT_ABI = abi
const ERC20_ABI = erc20abi
// Pragma configs
const PRAGMA_ABI = pragma_abi
const PRAGMA_CONTRACT_ADDRESS = "0x06df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d167"

// const provider = new Provider({ rpc: { nodeUrl: "http://localhost:5050/rpc" } })
// const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY)
// const contract = new Contract(abi, CONTRACT_ADDRESS, account)


async function connectWallet() {
    return await connect({ webWalletUrl: "https://web.argent.xyz" })
}

async function disconnectWallet() {
    await disconnect()
}

// export {contract, provider, account}
export { ACCOUNT_ADDRESS, CONTRACT_ADDRESS, disconnectWallet, CONTRACT_ABI, ERC20_ABI, PRAGMA_ABI, PRAGMA_CONTRACT_ADDRESS }
export default connectWallet 
