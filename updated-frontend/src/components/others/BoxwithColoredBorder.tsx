import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { isDarkMode } from '../../configs/utils'
import { ReactNode } from 'react'

interface IBoxwithColoredBorder {
    borderRadiusOuter: string,
    borderRadiusInner: string,
    children: ReactNode
}

const BoxwithColoredBorder = (props: IBoxwithColoredBorder) => {
    const { borderRadiusInner, borderRadiusOuter, children } = props
    const { colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()

    return (
        <Box className="bordered-card" style={theme => ({
            background: `linear-gradient(120deg, ${theme.colors.blue[6]} 10%, ${theme.colors.green[6]} 25%, ${theme.colors.violet[6]} 75%, ${theme.colors.grape[6]} 100%)`,
            borderRadius: borderRadiusOuter,
            width: '100%',
            height: '100%'
        })}>
            <Box p={'lg'} className="bordered-card-content" style={{
                background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[0],
                borderRadius: borderRadiusInner
            }}>
                {children}
            </Box>
        </Box>
    )
}

export default BoxwithColoredBorder