import { Paper, Stack, Text, useMantineColorScheme } from '@mantine/core'
import Hero from './Hero'
import { isDarkMode } from '../../configs/utils'

const Contribution = () => {
    const {colorScheme} = useMantineColorScheme()

    return (
        <Paper p="xs" style={theme => ({
            background: isDarkMode(colorScheme) ? theme.colors.dark[5] : theme.colors.gray[1]
        })}>
            <Stack>
                <Hero hero_address='dalmas' />
                <Text size='sm'>
                    <strong>Amount</strong>: 200 ETH
                </Text>
            </Stack>
        </Paper>
    )
}

export default Contribution