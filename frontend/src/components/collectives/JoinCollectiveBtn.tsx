import { useState } from 'react'
import { Button, Loader } from '@mantine/core'
import { IconAlertTriangle, IconArrowRight, IconInfoCircle } from '@tabler/icons-react'
import { showNotification } from '@mantine/notifications'
import { account, contract } from '../../configs/config'


interface IJoinCollectiveBtn {
    collective_id: any
    callBackFn: any
}

const JoinCollectiveBtn = (props: IJoinCollectiveBtn) => {
    const { collective_id, callBackFn } = props
    const [loading, setLoading] = useState(false)

    async function join() {
        contract.connect(account)

        setLoading(true)
        const collective_inputs: any = [collective_id]
        const myCall = contract.populate('join_collective', collective_inputs)
        contract.join_collective(myCall.calldata).then((_res: any) => {
            showNotification({
                title: "Success",
                message: "You have successfully joined this collective",
                color: "green",
                icon: <IconInfoCircle stroke={1.5} />
            })
            callBackFn && callBackFn()
        }).catch((_error: any) => {
            showNotification({
                title: "Failed!!",
                message: "Joining the collective has failed! Learn more from the chat page",
                color: "red",
                icon: <IconAlertTriangle stroke={1.5} />
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Button onClick={join} size="lg" radius={'md'} rightSection={loading ? <Loader size={'sm'} c={'white'} /> : <IconArrowRight stroke={1.5} />} variant="outline">{loading ? "Joining" : "Join"}</Button>
    )
}

export default JoinCollectiveBtn