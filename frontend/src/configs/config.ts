import { Contract, Account, Provider } from 'starknet'
import { connect, disconnect } from 'starknetkit'

import { abi } from '../assets/abi.json'

const PRIVATE_KEY = "0x819033027885bc1840b6d564b6e8f68c" 
const ACCOUNT_ADDRESS = "0x77a6390ab3dc3045df373b93bf8b93899c3ad5111da9b66c54b62ddc98e7d4"

const CONTRACT_ADDRESS = "0x10a09eb11dd5cc68012039a1923209413a96eafdefd635ac406231627464328"
const CONTRACT_ABI = abi

const provider = new Provider({ rpc: { nodeUrl: "http://localhost:5050/rpc" } })
const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY)
const contract = new Contract(abi, CONTRACT_ADDRESS, account)


async function connectWallet() {
    return await connect({ webWalletUrl: "https://web.argent.xyz" })
}

async function disconnectWallet() {
    await disconnect()
}

export { ACCOUNT_ADDRESS, CONTRACT_ADDRESS, provider, account, contract, disconnectWallet, CONTRACT_ABI }
export default connectWallet 
