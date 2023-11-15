import { Box, Card, Container, MantineProvider, ScrollArea, Stack, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { theme } from "./../theme";
import TopBarNavigation from "../components/navigation/TopBarNavigation";
import CycleStarkLogo from "../components/others/CycleStarkLogo";
import { Notifications } from '@mantine/notifications';
import { isDarkMode } from "../configs/utils";
import React from "react";
import AppProvider from "../providers/AppProvider";

interface IWrapperCard {
    children: React.ReactNode
}
const WrapperCard = ({ children }: IWrapperCard) => {
    const { colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()

    return (
        <Card p={0} style={{
            borderRadius: "0 0 20px 20px",
            height: "600px",
            // background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[3],
        }}>
            <ScrollArea className="h-100">
                <Box p="sm">
                    {children}
                </Box>
            </ScrollArea>
        </Card>
    )
}


const MainLayout = (props: any) => {
    const { children } = props
    return (
        <MantineProvider theme={theme} defaultColorScheme="light">
            <AppProvider>
                <Notifications />
                <Container size={'xl'} py={70} className="behind-screen">
                    <div style={{
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        // transform: "perspective(500px) skewY(15deg, -35deg)"
                    }} className="main-holder">
                        <CycleStarkLogo />
                        <Stack gap={4}>
                            <TopBarNavigation />
                            <WrapperCard>
                                {children}
                            </WrapperCard>
                        </Stack>
                    </div>
                </Container>
            </AppProvider>
        </MantineProvider>
    )
}

export default MainLayout