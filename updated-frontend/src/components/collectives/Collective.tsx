import { Avatar, Box, Grid, Indicator, Stack, Text, Title, useMantineColorScheme } from "@mantine/core"
import { convertToReadableTokens, bigintToShortStr, isDarkMode, getRealPrice, bigintToLongStrAddress, formatNumberInternational } from "../../configs/utils"
import { useHover } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../../providers/AppProvider";
import { CairoCustomEnum } from "starknet";
import TOKENS, { Token } from "../../configs/tokens";
import BigNumber from "bignumber.js";

interface ICollective {
    collective: any
}

const Collective = ({ collective }: ICollective) => {
    const { colorScheme } = useMantineColorScheme()
    const { hovered, ref } = useHover();
    const [tokenPrice, setTokenPrice] = useState<null | any>()
    const [asset, setAsset] = useState<null | Token>()
    const { pragma_contract } = useAppContext()

    const getTokenPrice = async () => {
        if (pragma_contract && collective) {
            const token = bigintToLongStrAddress(collective?.token)
            const asset: any = TOKENS.find(asset => asset.address.toLowerCase() === token.toLowerCase())
            if (asset) {
                const SPOTENTRY_ENUM = new CairoCustomEnum({
                    SpotEntry: asset.pair_id
                })
                const res = await pragma_contract.get_data_median(SPOTENTRY_ENUM)
                const price = getRealPrice(res)
                setTokenPrice(price?.price)
                setAsset(asset)
            }
        }
    }

    useEffect(() => {
        getTokenPrice()
    }, [])

    return (
        <>
            <Box ref={ref} p={4} py="lg" style={theme => ({
                background: isDarkMode(colorScheme) ? theme.colors.dark[5] : theme.colors.gray[2],
                borderRadius: theme.radius.md,
                border: `2px solid ${hovered ? theme.colors.blue[6] : "transparent"}`,
                cursor: hovered ? "pointer" : "auto",
                height: "100%"
            })}>
                <Box component={NavLink} to={`/collectives/${collective?.id?.toString()}/heroes`} style={{ all: "unset" }}>
                    {/* <Group style={{ position: "relative", overflow: "visible", flexWrap: 'nowrap' }}>
                        <Box className="collective-icon">
                            {bigintToShortStr(collective?.name).substring(0, 2)}
                        </Box>
                        <Avatar radius={'md'} size={'md'} style={{ visibility: "hidden" }}>
                            BC
                        </Avatar>
                        <Stack gap={2}>
                            <Title order={3} size={'md'} style={{ fontWeight: '800' }}>{bigintToShortStr(collective?.name)}</Title>
                            <Text size={'xs'} style={{ fontWeight: '400' }}>{convertToReadableTokens(collective?.cycle_amount, 18)} ETH/cycle | {collective?.hero_count?.toString() ?? 0} Heroes</Text>
                            <Text size={'sm'} style={{ fontWeight: '600' }}>{bigintToShortStr(collective?.aim)}</Text>
                        </Stack>
                    </Group> */}
                    <Grid>
                        <Grid.Col span={4} px={'xs'}>
                            <Stack className="h-100" align="center" justify="start" pb={'md'}>
                                <Indicator label={<Avatar src={asset?.icon} size={'sm'} />} position="bottom-end" color="transparent">
                                    <Avatar radius={'xl'} size={'lg'} tt={'uppercase'} mx={'auto'}>
                                        {bigintToShortStr(collective?.name).substring(0, 2)}
                                    </Avatar>
                                </Indicator>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Stack gap={4}>
                                <Title order={3} size={'md'} style={{ fontWeight: '800' }}>{bigintToShortStr(collective?.name)}</Title>
                                <Text size={'xs'} style={{ fontWeight: '400' }} lineClamp={1}>{convertToReadableTokens(collective?.cycle_amount, BigNumber(collective?.decimals).toNumber())} {bigintToShortStr(collective?.symbol)} (${formatNumberInternational(BigNumber(convertToReadableTokens(collective?.cycle_amount, BigNumber(collective?.decimals).toNumber())).multipliedBy(tokenPrice).toNumber())}) /cycle | {collective?.hero_count?.toString() ?? 0} Heroes</Text>
                                <Text size={'sm'} style={{ fontWeight: '600' }} lineClamp={1}>{bigintToShortStr(collective?.aim)}</Text>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Collective