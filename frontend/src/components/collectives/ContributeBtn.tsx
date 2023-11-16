import { Button, Loader } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { IconInfoCircle, IconAlertTriangle, IconCoin } from "@tabler/icons-react"
import { useState } from "react"
import { useCollectiveContext } from "../../providers/CollectiveProvider"
import { useAppContext } from "../../providers/AppProvider"
import { CallData, Contract } from "starknet"
import { CONTRACT_ADDRESS, ERC20_ABI } from "../../configs/config"
import BigNumber from "bignumber.js"


interface IContributeBtn {
    cid: any,
    cycle_id: number,
    callBackFn: any
}

const ContributeBtn = (props: IContributeBtn) => {
    const { cid, cycle_id, callBackFn } = props
    const [loading, setLoading] = useState(false)
    const { raw_collective, collective } = useCollectiveContext()
    const { contract, account } = useAppContext()

    // async function makeContribution() {
    //     if (contract) {
    //         setLoading(true)

    //         const collective_inputs = [cid, BigNumber(raw_collective.cycle_amount).toNumber()]
    //         const myCall = contract.populate('contribute', collective_inputs)
    //         contract.contribute(myCall.calldata).then((_res: any) => {
    // showNotification({
    //     title: "Success",
    //     message: "Contribution successful",
    //     color: "green",
    //     icon: <IconInfoCircle stroke={1.5} />
    // })
    // callBackFn && callBackFn()
    //         }).catch((_error: any) => {
    //             console.log("Error: ", _error)
    //             showNotification({
    //                 title: "Failed!!",
    //                 message: "Making contribution failed!",
    //                 color: "red",
    //                 icon: <IconAlertTriangle stroke={1.5} />
    //             })
    //         }).finally(() => {
    //             setLoading(false)
    //         })
    //     }
    // }

    // async function makeERC20Contribution() {
    //     if (account) {
    //         const ERC_ADDRESS = "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7"
    //         const ERC20contract = new Contract(ERC20_ABI, ERC_ADDRESS, account)
    //         const myCall = ERC20contract.populate('approve', [CONTRACT_ADDRESS, BigNumber(raw_collective.cycle_amount).multipliedBy(2).toNumber()])
    //         const res = await ERC20contract.approve(myCall.calldata)
    //         // makeContribution()

    //     }
    // }

    const interactWithBothERC20_and_CONTRACT = async () => {
        if (contract) {
            setLoading(true)
            let amt = BigNumber(raw_collective.cycle_amount).toNumber()

            // const ERC_ADDRESS = "0x49D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7"
            const ERC_ADDRESS = collective?.token
            console.log("Token address: ", ERC_ADDRESS)
            const ERC20contract = new Contract(ERC20_ABI, ERC_ADDRESS, account)
            const erc20Call = ERC20contract.populate('approve', [CONTRACT_ADDRESS, amt])

            const collective_inputs = [cid, amt]
            const myCall = contract.populate('contribute', collective_inputs)

            const multiCall = await account.execute(
                [
                    {
                        contractAddress: ERC_ADDRESS,
                        entrypoint: "approve",
                        calldata: erc20Call.calldata
                    },
                    {
                        contractAddress: CONTRACT_ADDRESS,
                        entrypoint: "contribute",
                        calldata: myCall.calldata
                    }
                ]
            )
            console.log("Multicall: ", multiCall)
            account?.provider.waitForTransaction(multiCall.transaction_hash).then(() => {
                showNotification({
                    title: "Success",
                    message: "Contribution successful. Wait till the transaction is over, don't exit the page!",
                    color: "green",
                    icon: <IconInfoCircle stroke={1.5} />
                })
                callBackFn && callBackFn()
            }).catch((e: any) => {
                console.log("Error: ", e)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <Button leftSection={loading ? <Loader size='sm' /> : <IconCoin stroke={1.5} />} variant="outline" radius={'md'} onClick={interactWithBothERC20_and_CONTRACT}>Contribute</Button>
    )
}

export default ContributeBtn