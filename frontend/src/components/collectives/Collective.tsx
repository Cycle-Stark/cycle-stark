import { Avatar, Box, Grid, Stack, Text, Title, useMantineColorScheme } from "@mantine/core"
import { convertToReadableTokens, bigintToShortStr, isDarkMode } from "../../configs/utils"
import { useHover } from "@mantine/hooks";
import { NavLink } from "react-router-dom";

interface ICollective {
    collective: any
}

const Collective = ({ collective }: ICollective) => {
    const { colorScheme } = useMantineColorScheme()
    const { hovered, ref } = useHover();
    return (
        <>
            <Box ref={ref} p={4} style={theme => ({
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
                            <Stack className="h-100" align="center" justify="center">
                                <Avatar radius={'xl'} size={'lg'} tt={'capitalize'} mx={'auto'}>
                                    {bigintToShortStr(collective?.name).substring(0, 2)}
                                </Avatar>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Stack gap={4}>
                                <Title order={3} size={'md'} style={{ fontWeight: '800' }}>{bigintToShortStr(collective?.name)}</Title>
                                <Text size={'xs'} style={{ fontWeight: '400' }}>{convertToReadableTokens(collective?.cycle_amount, 18)} {bigintToShortStr(collective?.symbol)}/cycle | {collective?.hero_count?.toString() ?? 0} Heroes</Text>
                                <Text size={'sm'} style={{ fontWeight: '600' }}>{bigintToShortStr(collective?.aim)}</Text>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Collective