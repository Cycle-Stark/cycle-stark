import { Box, Grid, Stack, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { IconUsersGroup, IconRepeat, IconInfoCircle, IconMessage } from "@tabler/icons-react"
import CustomTabLink from "../../../components/navigation/CustomTabLink";
import { Outlet, useParams } from "react-router-dom";
import { isDarkMode } from "../../../configs/utils";
import CollectiveProvider, { useCollectiveContext } from "../../../providers/CollectiveProvider";


const CollectiveTitle = () => {
    const { collective } = useCollectiveContext()
    return (
        <Title order={1} size={42} className="custom-title" m={"auto"}>{collective?.name}</Title>
    )
}

const SingleCollective = () => {
    const { colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()
    const params = useParams()
    const { cid } = params

    return (
        <CollectiveProvider>
            <Stack>
                <CollectiveTitle />
                <Grid align="start">
                    <Grid.Col span={{ md: 4, xs: 12 }}>
                        <Stack gap={4} p="xs">
                            <CustomTabLink to={`/collectives/${cid}/heroes`} title="Heroes" icon={<IconUsersGroup stroke={1.5} />} color={theme.colors.blue[6]} />
                            <CustomTabLink to={`/collectives/${cid}/cycles`} title="Cycles" icon={<IconRepeat stroke={1.5} />} color={theme.colors.green[6]} />
                            <CustomTabLink to={`/collectives/${cid}/info`} title="Info" icon={<IconInfoCircle stroke={1.5} />} color={theme.colors.violet[6]} />
                            <CustomTabLink to={`/collectives/${cid}/chat`} title="chat" icon={<IconMessage stroke={1.5} />} color={theme.colors.grape[6]} />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ md: 8, xs: 12 }}>
                        <Box p={"xs"} style={theme => ({
                            flex: 1,
                            background: isDarkMode(colorScheme) ? theme.colors.dark[5] : theme.colors.gray[2],
                            borderRadius: theme.radius.md,
                            minHeight: "400px"
                        })}>
                            <Outlet />
                        </Box>
                    </Grid.Col>
                </Grid>
            </Stack>
        </CollectiveProvider>
    )
}

export default SingleCollective