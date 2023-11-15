import { useState } from 'react'
import { Button, Loader } from '@mantine/core'
import { IconAlertTriangle, IconInfoCircle, IconRepeat } from '@tabler/icons-react'
import { showNotification } from '@mantine/notifications'
import { account, contract } from '../../configs/config'


interface IStartCycleBtnBtn {
    collective_id: any
    callBackFn: any
}

const StartCycleBtn = (props: IStartCycleBtnBtn) => {
    const { collective_id, callBackFn } = props
    const [loading, setLoading] = useState(false)

    async function start() {
        contract.connect(account)

        setLoading(true)
        const collective_inputs: any = [collective_id]
        const myCall = contract.populate('start_cycle', collective_inputs)
        contract.start_cycle(myCall.calldata).then((_res: any) => {
            showNotification({
                title: "Success",
                message: "Collective cycle started successfully",
                color: "green",
                icon: <IconInfoCircle stroke={1.5} />
            })
            callBackFn && callBackFn()
        }).catch((_error: any) => {
            showNotification({
                title: "Failed!!",
                message: "Collective cycle failed to start, try again later!",
                color: "red",
                icon: <IconAlertTriangle stroke={1.5} />
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Button onClick={start} size="sm" radius={'md'} rightSection={loading ? <Loader size={'sm'} c={'white'} /> : <IconRepeat stroke={1.5} />} variant="filled">{loading ? "Starting Cycle" : "Start Cycle"}</Button>
    )
}

export default StartCycleBtn