import { Box, Card, Container, MantineProvider, ScrollArea, Stack, Text } from "@mantine/core";
import { theme } from "./../theme";
import TopBarNavigation from "../components/navigation/TopBarNavigation";
// import CycleStarkLogo from "../components/others/CycleStarkLogo";
import { Notifications } from '@mantine/notifications';
import React, { useEffect } from "react";
import AppProvider, { useAppContext } from "../providers/AppProvider";
import { ModalsProvider, modals } from '@mantine/modals';
import CustomAppShell from "./CustomAppShell";

interface IWrapperCard {
    children: React.ReactNode
}
const WrapperCard = ({ children }: IWrapperCard) => {
    const infoModal = () => modals.open({
        title: "Quick information",
        children: (
            <>
                <Text>This is on testnet and best works when using a larger screen ie your pc where you have access to your web wallets like ArgentX and Braavos where you can switch to testnet easily</Text>
            </>
        )
    })

    useEffect(() => {
        infoModal()
    }, [])
    return (
        <Card p={0} style={{
            overflowX: "hidden"
        }}>
            <Box p="sm">
                {children}
            </Box>
        </Card>
    )
}


// const MainLayout = (props: any) => {
//     const { children } = props
//     const { isSmallScreen } = useAppContext()
//     return (
//         <MantineProvider theme={theme} defaultColorScheme="light">
//             <ModalsProvider>
//                 <AppProvider>
//                     <Notifications />
//                     <Container size={'xl'} px={isSmallScreen ? "xs" : "0"} py={70} className="behind-screen">
//                         <div style={{
//                             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                             // transform: "perspective(500px) skewY(15deg, -35deg)"
//                         }} className="main-holder">
//                             <CycleStarkLogo />
//                             <Stack gap={4}>
//                                 <TopBarNavigation />
//                                 <WrapperCard>
//                                     {children}
//                                 </WrapperCard>
//                             </Stack>
//                         </div>
//                     </Container>
//                 </AppProvider>
//             </ModalsProvider>
//         </MantineProvider>
//     )
// }

const MainLayout = (props: any) => {
    const { children } = props
    const { isSmallScreen } = useAppContext()
    return (
        <MantineProvider theme={theme} defaultColorScheme="light">
            <ModalsProvider>
                <AppProvider>
                    <Notifications />
                    <CustomAppShell>
                        {children}
                    </CustomAppShell>
                </AppProvider>
            </ModalsProvider>
        </MantineProvider>
    )
}

export default MainLayout