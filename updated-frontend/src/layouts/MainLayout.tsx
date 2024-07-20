import { MantineProvider } from "@mantine/core";
import { theme } from "./../theme";
import { Notifications } from '@mantine/notifications';
import AppProvider from "../providers/AppProvider";
import { ModalsProvider } from '@mantine/modals';
import CustomAppShell from "./CustomAppShell";
import MyCanvas from "../components/MyCanvas";
import { AnimatePresence } from 'framer-motion'


const MainLayout = (props: any) => {
    const { children } = props
    return (
        <>
            {/* <MyCanvas /> */}
            {/* <div className='main-holder'> */}
            <div style={{
                transition: 'all 0.05s linear'
            }}>
                {/* <AnimatePresence> */}
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
                {/* </AnimatePresence> */}
            </div>
        </>
    )
}

export default MainLayout