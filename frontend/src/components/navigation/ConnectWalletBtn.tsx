import { Button } from "@mantine/core"
import { IconWallet } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import connectWallet, { disconnectWallet } from "../../configs/config"
import { limitChars } from "../../configs/utils"

const ConnectWalletBtn = () => {
    const [_connection, setConnection] = useState<any | null>()
    const [account, setAccount] = useState<any | null>()
    const [address, setAddress] = useState<any | null>();

    const checkIfConnected = () => {
        if (window?.starknet_argentX) {
            setConnection(window.starknet_argentX)
            setAccount(window.starknet_argentX?.account)
            setAddress(window.starknet_argentX?.selectedAddress)
        }
    }

    const handleConnectWallet = async () => {
        const connection_ = await connectWallet()
        if (connection_ && connection_.isConnected) {
            setConnection(connection_)
            setAccount(connection_.account)
            setAddress(connection_.selectedAddress)
        }
    }

    const handleDisconnectWallet = async () => {
        await disconnectWallet()
        setConnection(undefined)
        setAccount(undefined)
        setAddress('')
    }

    const handleConnetWalletBtnClick = () => {
        if(account){
            handleDisconnectWallet()
        }
        else{
            handleConnectWallet()
        }
    }   

    useEffect(() => {
        checkIfConnected()
    }, [])


    return (
        <Button h={42} variant='outline' radius={'xl'} leftSection={<IconWallet stroke={1.5} />} onClick={handleConnetWalletBtnClick}>
            {
                address ? limitChars(address, 10, true) : 'Connect wallet'
            }
        </Button>
    )
}

export default ConnectWalletBtn