import { Center, Stack, Text, Title } from "@mantine/core"
import { useLocation } from "react-router-dom"
import CustomBox from "../components/others/CustomBox"

const NotFound = () => {
    const location = useLocation()
    return (
        <div style={{
            height: "480px"
        }}>
            <Center className="h-100">
                <CustomBox>
                    <Stack align="center" p={{xs: "sm", sm: "xl", md:"100px"}}>
                        <Title order={1} size={62} className="custom-title clip-text">
                            Page Not Found
                        </Title>
                        <Text>{location.pathname}</Text>
                    </Stack>
                </CustomBox>
            </Center>
        </div>
    )
}

export default NotFound