import { Anchor, Box, Button, Grid, Group, List, ListItem, Stack, Text, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { IconUsersGroup, IconRepeat, IconInfoCircle, IconMessage, IconExternalLink, IconArrowRight } from "@tabler/icons-react"
import CustomTabLink from "../../../components/navigation/CustomTabLink";
import { Link, Outlet, useParams } from "react-router-dom";
import { formatNumberInternational, isDarkMode, limitChars, timeStampToDate } from "../../../configs/utils";
import CollectiveProvider, { useCollectiveContext } from "../../../providers/CollectiveProvider";
import CustomBox from "../../../components/others/CustomBox";
import BoxwithColoredBorder from "../../../components/others/BoxwithColoredBorder";
import BigNumber from "bignumber.js";
import { STARKSCAN_TOKEN_TESTNET } from "../../../configs/constants";


const CollectiveTitle = () => {
    const { collective } = useCollectiveContext()
    return (
        <Title order={1} size={42} className="custom-title" m={"auto"}>{collective?.name}</Title>
    )
}


interface IRowValue {
    label: string
    value: any
}

const RowValue = (props: IRowValue) => {
    const { label, value } = props

    return (
        <Group justify="space-between">
            <Title order={3} fw={500} ta={'start'} size={'14px'}>{label}</Title>
            <Text fw={500} size="sm">{value}</Text>
        </Group>
    )
}

const CollectiveCard = () => {
    const { collective, tokenPrice } = useCollectiveContext()
    const params = useParams()
    const { cid } = params
    return (
        <BoxwithColoredBorder borderRadiusOuter="20px" borderRadiusInner="18px">
            <Stack gap={6}>
                <Title order={2} fw={500} ta={'center'}>{collective?.name}</Title>
                <RowValue label="Token" value={<Group align="center" gap={2}>{limitChars(collective?.token ?? "", 5, true)}<Anchor target="_blank" href={`${STARKSCAN_TOKEN_TESTNET}/${collective?.token}`}><IconExternalLink stroke={1.5} size={'18px'} /></Anchor></Group>} />
                <RowValue label="Total Heroes" value={collective?.hero_count} />
                <RowValue label="Amt/Cycle" value={<>{collective?.cycle_amount} {collective?.symbol}</>} />
                <RowValue label="Amt/Cycle USD" value={<>${formatNumberInternational(BigNumber(collective?.cycle_amount).multipliedBy(tokenPrice).toNumber())}</>} />
                <RowValue label="Start Date" value={<>{timeStampToDate(BigNumber(collective?.start_date).toNumber())?.toDateString() ?? ""}</>} />
                <RowValue label="Has Started" value={<> {collective?.has_started ? "Yes" : "No"}</>} />
                <Title order={3} fw={500} ta={'start'} size={'medium'}>Guidelines</Title>
                <List icon={<IconInfoCircle color="violet" />} size="sm" fw={500} spacing={'xs'} center>
                    <ListItem>{collective?.rule_1}</ListItem>
                    <ListItem>{collective?.rule_2}</ListItem>
                    <ListItem>{collective?.rule_3}</ListItem>
                </List>
                <Group align="center" justify="center" pt={'lg'}>
                    <Button component={Link} px={'35px'} to={`/collectives/${cid}/info`} radius={'xl'} variant="light" rightSection={<IconArrowRight />}>
                        More Info
                    </Button>
                </Group>
            </Stack>
        </BoxwithColoredBorder>
    )
}

const SingleCollective = () => {
    const { colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()
    const params = useParams()
    const { cid } = params

    return (
        <CustomBox>
            <CollectiveProvider>
                <Stack>
                    <CollectiveTitle />
                    <Group align="center" justify="center" gap={'20px'}>
                        <CustomTabLink to={`/collectives/${cid}/heroes`} title="Heroes" icon={<IconUsersGroup stroke={1.5} />} color={theme.colors.blue[6]} />
                        <CustomTabLink to={`/collectives/${cid}/cycles`} title="Cycles" icon={<IconRepeat stroke={1.5} />} color={theme.colors.green[6]} />
                        <CustomTabLink to={`/collectives/${cid}/info`} title="Info" icon={<IconInfoCircle stroke={1.5} />} color={theme.colors.violet[6]} />
                        <CustomTabLink to={`/collectives/${cid}/chat`} title="chat" icon={<IconMessage stroke={1.5} />} color={theme.colors.grape[6]} />
                    </Group>
                    <Grid align="start">
                        <Grid.Col span={{ md: 4, xs: 12 }}>
                            <Stack gap={4} p="lg" py="lg">
                                {/* <CustomTabLink to={`/collectives/${cid}/heroes`} title="Heroes" icon={<IconUsersGroup stroke={1.5} />} color={theme.colors.blue[6]} />
                                <CustomTabLink to={`/collectives/${cid}/cycles`} title="Cycles" icon={<IconRepeat stroke={1.5} />} color={theme.colors.green[6]} />
                                <CustomTabLink to={`/collectives/${cid}/info`} title="Info" icon={<IconInfoCircle stroke={1.5} />} color={theme.colors.violet[6]} />
                                <CustomTabLink to={`/collectives/${cid}/chat`} title="chat" icon={<IconMessage stroke={1.5} />} color={theme.colors.grape[6]} /> */}
                                <CollectiveCard />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ md: 8, xs: 12 }} py={'lg'}>
                            <Box p={"xs"} style={theme => ({
                                flex: 1,
                                background: isDarkMode(colorScheme) ? theme.colors.dark[5] : theme.colors.gray[2],
                                borderRadius: theme.radius.lg,
                                minHeight: "400px",
                            })}>
                                <Outlet />
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </CollectiveProvider>
        </CustomBox>
    )
}

export default SingleCollective