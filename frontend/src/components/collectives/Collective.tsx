import { Avatar, Box, Group, Stack, Text, Title, useMantineColorScheme } from "@mantine/core"
import { isDarkMode } from "../../configs/utils"
import { useHover } from "@mantine/hooks";
import { NavLink } from "react-router-dom";

interface ICollective {
    id: any
}

const Collective = ({ id }: ICollective) => {
    const { colorScheme } = useMantineColorScheme()
    const { hovered, ref } = useHover();


    return (
        <Box ref={ref} p={4} style={theme => ({
            background: isDarkMode(colorScheme) ? theme.colors.dark[5] : theme.colors.gray[2],
            borderRadius: theme.radius.md,
            border: `2px solid ${hovered ? theme.colors.blue[6] : "transparent"}`,
            cursor: hovered ? "pointer" : "auto",
            height: "100%"
        })}>
            <Box component={NavLink} to={`/collectives/${id}/heroes`} style={{ all: "unset" }}>
                <Group style={{ position: "relative", overflow: "visible" }}>
                    <Box className="collective-icon">
                        BC
                    </Box>
                    <Avatar radius={'md'} size={'md'} style={{ visibility: "hidden" }}>
                        BC
                    </Avatar>
                    <Stack gap={2}>
                        <Title order={3} size={'md'} style={{ fontWeight: '800' }}>Best Collective</Title>
                        <Text size={'xs'} style={{ fontWeight: '400' }}>200 STRK/cycle | 20 Heroes</Text>
                        <Text size={'sm'} style={{ fontWeight: '600' }}>Buy Laptop</Text>
                    </Stack>
                </Group>
            </Box>
        </Box>
    )
}

export default Collective