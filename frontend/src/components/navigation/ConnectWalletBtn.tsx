import { Button } from "@mantine/core"
import { IconWallet } from "@tabler/icons-react"
import { limitChars } from "../../configs/utils"
import { useAppContext } from "../../providers/AppProvider"

const ConnectWalletBtn = () => {
    const { handleConnetWalletBtnClick, address } = useAppContext()
    const { isSmallScreen } = useAppContext()

    return (
        <Button h={42} variant='outline' radius={'xl'} size="xs" leftSection={<IconWallet stroke={1.5} />} onClick={handleConnetWalletBtnClick}>
            {
                address ? limitChars(address, isSmallScreen ? 5 : 10, isSmallScreen ? false : true) : 'Connect'
            }
        </Button>
    )
}

export default ConnectWalletBtn