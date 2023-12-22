import { Paper, Stack, Text, useMantineColorScheme } from '@mantine/core'
import Hero from './Hero'
import { bigintToLongStrAddress, convertToReadableTokens, formatNumberInternational, isDarkMode } from '../../configs/utils'
import BigNumber from 'bignumber.js'

interface IContribution{
    hero_id: any
    amount: any,
    decimals: any,
    symbol: any
    tokenPrice: any
}

const Contribution = (props: IContribution) => {
    const {hero_id, amount, decimals, symbol, tokenPrice} = props
    const {colorScheme} = useMantineColorScheme()

    return (
        <Paper p="xs" style={theme => ({
            background: isDarkMode(colorScheme) ? theme.colors.dark[5] : theme.colors.gray[1]
        })}>
            <Stack>
                <Hero hero_address={bigintToLongStrAddress(hero_id)} />
                <Text size='sm'>
                    <strong>Amount</strong>: {convertToReadableTokens(amount, decimals)} {symbol} | ${formatNumberInternational(BigNumber(convertToReadableTokens(amount, decimals)).multipliedBy(tokenPrice).toNumber())}
                </Text>
            </Stack>
        </Paper>
    )
}

export default Contribution