import { Button } from "@mantine/core"
import { IconWallet } from "@tabler/icons-react"
import { limitChars } from "../../configs/utils"
import { useAppContext } from "../../providers/AppProvider"

const ConnectWalletBtn = () => {
    const { handleConnetWalletBtnClick, address } = useAppContext()
    return (
        <Button h={42} variant='outline' radius={'xl'} leftSection={<IconWallet stroke={1.5} />} onClick={handleConnetWalletBtnClick}>
            {
                address ? limitChars(address, 10, true) : 'Connect wallet'
            }
        </Button>
    )
}

export default ConnectWalletBtn