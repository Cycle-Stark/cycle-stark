import { ActionIcon, AppShell, Container, Group, Image, useMantineColorScheme } from '@mantine/core'
import { ReactNode } from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import ConnectWalletBtn from '../components/navigation/ConnectWalletBtn'
import CustomNavLink, { ICustomNavLinkProps, navlinks } from '../components/navigation/CustomNavLink'
import { isDarkMode } from '../configs/utils'
import { Link } from 'react-router-dom'
import { useAppContext } from '../providers/AppProvider'
import SmallScreenMenu from '../components/navigation/SmallScreenMenu'

interface ICustomAppShell {
    children: ReactNode
}

const CustomAppShell = (props: ICustomAppShell) => {
    const { children } = props
    const { colorScheme, setColorScheme } = useMantineColorScheme()
    const { isSmallScreen } = useAppContext()

    return (
        <AppShell header={{ height: { base: 60, md: 80 } }}>
            <AppShell.Header>
                <Container size={'xl'} className='h-100'>
                    <Group align='center' className='h-100' justify='space-between'>
                        <Link to={'/'}>
                            <Image src={'/images/icon1.png'} h={'40px'} />
                        </Link>
                        {
                            !isSmallScreen ? (
                                <Group>
                                    {
                                        navlinks?.map((link: ICustomNavLinkProps, i: number) => (
                                            <CustomNavLink key={`navlink_${i}`} {...link} />
                                        ))
                                    }
                                </Group>
                            ) : null
                        }
                        <Group>
                            <ConnectWalletBtn />
                            <ActionIcon size={'lg'} variant='subtle' radius={'md'} onClick={() => setColorScheme(isDarkMode(colorScheme) ? 'light' : 'dark')}>
                                {isDarkMode(colorScheme) ? <IconSun /> : <IconMoon />}
                            </ActionIcon>
                            {
                                isSmallScreen ? <SmallScreenMenu /> : null
                            }
                        </Group>
                    </Group>
                </Container>
            </AppShell.Header>
            <AppShell.Main>
                <Container size={'xl'} py={40}>
                    {children}
                </Container>
            </AppShell.Main>
        </AppShell>
    )
}

export default CustomAppShell