import { Center, Stack, Text, Title } from "@mantine/core"
import { useLocation } from "react-router-dom"

const NotFound = () => {
    const location = useLocation()
    return (
        <div style={{
            height: "480px"
        }}>
            <Center className="h-100">
                <Stack align="center">
                    <Title order={1} size={62} className="custom-title clip-text">
                        Page Not Found
                    </Title>
                    <Text>{location.pathname}</Text>
                </Stack>
            </Center>
        </div>
    )
}

export default NotFound