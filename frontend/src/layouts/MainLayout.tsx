import { MantineProvider } from "@mantine/core";
import { theme } from "./../theme";
import { Notifications } from '@mantine/notifications';
import AppProvider from "../providers/AppProvider";
import { ModalsProvider } from '@mantine/modals';
import CustomAppShell from "./CustomAppShell";


const MainLayout = (props: any) => {
    const { children } = props
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