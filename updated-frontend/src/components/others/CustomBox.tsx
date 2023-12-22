import { Box, useMantineColorScheme } from "@mantine/core"
import { isDarkMode } from "../../configs/utils"

const CustomBox = (props: any) => {
    const { children, py } = props
    const { colorScheme } = useMantineColorScheme()
    return (
        <Box py={py ? py : 50} px={"xs"} style={theme => ({
            background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[0],
            borderRadius: theme.radius.lg
        })}>
            {children}
        </Box>
    )
}

export default CustomBox