import { Button, Loader } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { IconInfoCircle, IconAlertTriangle, IconCoin } from "@tabler/icons-react"
import { contract, account } from "../../configs/config"
import { useState } from "react"
import { useCollectiveContext } from "../../providers/CollectiveProvider"


interface IContributeBtn {
    cid: any,
    cycle_id: number,
    callBackFn: any
}

const ContributeBtn = (props: IContributeBtn) => {
    const { cid, cycle_id, callBackFn } = props
    const [loading, setLoading] = useState(false)
    const { raw_collective } = useCollectiveContext()

    async function makeContribution() {
        setLoading(true)
        contract.connect(account)

        const collective_inputs = [cid, cycle_id, raw_collective?.cycle_amount]
        const myCall = contract.populate('contribute', collective_inputs)
        contract.contribute(myCall.calldata).then((_res: any) => {
            showNotification({
                title: "Success",
                message: "Contribution successful",
                color: "green",
                icon: <IconInfoCircle stroke={1.5} />
            })
            callBackFn && callBackFn
        }).catch((_error: any) => {
            console.log("Error: ", _error)
            showNotification({
                title: "Failed!!",
                message: "Making contribution failed!",
                color: "red",
                icon: <IconAlertTriangle stroke={1.5} />
            })
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <Button leftSection={loading ? <Loader size='sm' /> : <IconCoin stroke={1.5} />} variant="outline" radius={'md'} onClick={makeContribution}>Contribute</Button>
    )
}

export default ContributeBtn