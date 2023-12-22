import { useState } from 'react'
import { Button, Loader } from '@mantine/core'
import { IconAlertTriangle, IconArrowRight, IconInfoCircle } from '@tabler/icons-react'
import { showNotification } from '@mantine/notifications'
import { useAppContext } from '../../providers/AppProvider'


interface IRemitCycleBtn {
    collective_id: any
    callBackFn: any
}

const RemitCycleBtn = (props: IRemitCycleBtn) => {
    const { collective_id, callBackFn } = props
    const [loading, setLoading] = useState(false)
    const { contract } = useAppContext()

    async function remit() {
        if (contract) {
            setLoading(true)
            const collective_inputs: any = [collective_id]
            const myCall = contract.populate('remit', collective_inputs)
            contract.remit(myCall.calldata).then((_res: any) => {
                showNotification({
                    title: "Success",
                    message: "You have successfully remited",
                    color: "green",
                    icon: <IconInfoCircle stroke={1.5} />
                })
                callBackFn && callBackFn()
            }).catch((_error: any) => {
                showNotification({
                    title: "Failed!!",
                    message: "Failed to remit. Try again later!",
                    color: "red",
                    icon: <IconAlertTriangle stroke={1.5} />
                })
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <Button onClick={remit} size="md" radius={'md'} rightSection={loading ? <Loader size={'sm'} c={'white'} /> : <IconArrowRight stroke={1.5} />} variant="filled">{loading ? "Remiting" : "Remit"}</Button>
    )
}

export default RemitCycleBtn