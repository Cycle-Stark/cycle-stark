import { useState } from 'react'
import { Button, Loader } from '@mantine/core'
import { IconAlertTriangle, IconInfoCircle, IconRepeat } from '@tabler/icons-react'
import { showNotification } from '@mantine/notifications'
import { useAppContext } from '../../providers/AppProvider'


interface IStartCollectiveBtn {
    collective_id: any
    callBackFn: any
}

const CloseRegistrationsBtn = (props: IStartCollectiveBtn) => {
    const { collective_id, callBackFn } = props
    const [loading, setLoading] = useState(false)
    const { contract } = useAppContext()

    async function close() {

        if (contract) {

            setLoading(true)
            const collective_inputs: any = [collective_id]
            const myCall = contract.populate('close_registrations', collective_inputs)
            contract.close_registrations(myCall.calldata).then((_res: any) => {
                showNotification({
                    title: "Success",
                    message: "Collective registrations closed successfully",
                    color: "green",
                    icon: <IconInfoCircle stroke={1.5} />
                })
                callBackFn && callBackFn()
            }).catch((_error: any) => {
                showNotification({
                    title: "Failed!!",
                    message: "Couldn't close registrations, try again later!",
                    color: "red",
                    icon: <IconAlertTriangle stroke={1.5} />
                })
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <Button onClick={close} size="sm" radius={'md'} rightSection={loading ? <Loader size={'sm'} c={'white'} /> : <IconRepeat stroke={1.5} />} variant="filled">{loading ? "Closing Registrations" : "Close Registrations"}</Button>
    )
}

export default CloseRegistrationsBtn