import { Box, Group, Stack, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { IconUsersGroup, IconRepeat, IconInfoCircle, IconMessage } from "@tabler/icons-react"
import CustomTabLink from "../../../components/navigation/CustomTabLink";
import { Outlet, useParams } from "react-router-dom";
import { isDarkMode } from "../../../configs/utils";

const SingleCollective = () => {
    const { colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()
    const params = useParams()
    const { cid } = params

    return (
        <Stack>
            <Title order={1} size={42} className="custom-title" m={"auto"}>Best collective</Title>
            <Group align="start">
                <Stack gap={4} w={200} miw={200}>
                    <CustomTabLink to={`/collectives/${cid}/heroes`} title="Heroes" icon={<IconUsersGroup stroke={1.5} />} color={theme.colors.blue[6]} />
                    <CustomTabLink to={`/collectives/${cid}/cycles`} title="Cycles" icon={<IconRepeat stroke={1.5} />} color={theme.colors.green[6]} />
                    <CustomTabLink to={`/collectives/${cid}/info`} title="Info" icon={<IconInfoCircle stroke={1.5} />}color={theme.colors.violet[6]}/>
                    <CustomTabLink to={`/collectives/${cid}/chat`} title="chat" icon={<IconMessage stroke={1.5} />} color={theme.colors.grape[6]}/>
                </Stack>
                <Box p={"xs"}  style={theme => ({
                    flex: 1,
                    background: isDarkMode(colorScheme) ? theme.colors.dark[5] : theme.colors.gray[2],
                    borderRadius: theme.radius.md,
                    minHeight: "400px"
                })}>
                    <Outlet />
                </Box>
            </Group>

        </Stack>
    )
}

export default SingleCollective