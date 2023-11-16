import { ActionIcon, Box, Group, Image, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import CustomNavLink, { ICustomNavLinkProps } from './CustomNavLink'
import { isDarkMode } from '../../configs/utils';
import { IconSun, IconMoon, IconHome2, IconPlus, IconUsersGroup, IconUserHeart } from '@tabler/icons-react';
import ConnectWalletBtn from './ConnectWalletBtn';


const navlinks: ICustomNavLinkProps[] = [
    {
        to: '/',
        title: 'Home',
        icon: <IconHome2 stroke={1.5} />
    },
    {
        to: '/collectives',
        title: 'Collectives',
        icon: <IconUsersGroup stroke={1.5} />
    },
    {
        to: '/create/collective',
        title: 'Collective',
        icon: <IconPlus stroke={1.5} />
    },
    {
        to: '/my-collectives',
        title: 'My Collectives',
        icon: <IconUserHeart stroke={1.5} />
    },
]

const TopBarNavigation = () => {
    const { setColorScheme, colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()

    return (
        <Box p={'md'} style={{
            background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[3],
            borderRadius: "20px 20px 0 0",
        }}>
            <Group align='center' justify='space-between'>
                <Group>
                    {/* <Image src={'/images/logo.png'} w={'200px'} /> */}
                    <Image src={'/images/icon1.png'} h={'60px'} />
                    {
                        navlinks?.map((link: ICustomNavLinkProps, i: number) => (
                            <CustomNavLink key={`navlink_${i}`} {...link} />
                        ))
                    }
                </Group>
                <Group>
                    <ConnectWalletBtn />
                    <ActionIcon size={'lg'} variant='subtle' radius={'md'} onClick={() => setColorScheme(isDarkMode(colorScheme) ? 'light' : 'dark')}>
                        {isDarkMode(colorScheme) ? <IconSun /> : <IconMoon />}
                    </ActionIcon>
                </Group>
            </Group>
        </Box>
    )
}

export default TopBarNavigation