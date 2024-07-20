import { ActionIcon, AppShell, Container, Group, Image, useMantineColorScheme } from '@mantine/core'
import { ReactNode } from 'react'
import { IconSun, IconMoon, IconBrandTwitter } from '@tabler/icons-react'
import ConnectWalletBtn from '../components/navigation/ConnectWalletBtn'
import CustomNavLink, { ICustomNavLinkProps, navlinks } from '../components/navigation/CustomNavLink'
import { isDarkMode } from '../configs/utils'
import { Link } from 'react-router-dom'
import SmallScreenMenu from '../components/navigation/SmallScreenMenu'
import { useMediaQuery } from '@mantine/hooks'
import { motion } from 'framer-motion'
import { slideAnimation } from '../configs/motion'

interface ICustomAppShell {
    children: ReactNode
}

const CustomAppShell = (props: ICustomAppShell) => {
    const { children } = props

    const { colorScheme, setColorScheme } = useMantineColorScheme()
    const matches = useMediaQuery('(max-width: 768px)');

    return (
        <AppShell bg={'#05080e00'} header={{ height: { base: 60, md: 80 } }}
        styles={{
            main: {
                background: "#05080e00"
            }
        }}
        >
            <AppShell.Header>
                <Container size={'xl'} className='h-100'>
                    <Group align='center' className='h-100' justify='space-between'>
                        <motion.div {...slideAnimation('top')}>
                            <Link to={'/'}>
                                <Image src={'/images/icon1.png'} h={'40px'} />
                            </Link>
                        </motion.div>
                        {
                            !matches ? (
                                <Group>
                                    {
                                        navlinks?.map((link: ICustomNavLinkProps, i: number) => (
                                            <CustomNavLink key={`navlink_${i}`} {...link} />
                                        ))
                                    }
                                </Group>
                            ) : null
                        }
                        <Group align='center' justify='center' gap={4}>
                            <ConnectWalletBtn />
                            <ActionIcon component='a' target='_blank' href="https://x.com/dalmasonto" size={'lg'} variant='subtle' radius={'md'}>
                                <IconBrandTwitter />
                            </ActionIcon>
                            {
                                matches ? <SmallScreenMenu /> : null
                            }
                            <ActionIcon size={'lg'} variant='subtle' radius={'md'} onClick={() => setColorScheme(isDarkMode(colorScheme) ? 'light' : 'dark')}>
                                {isDarkMode(colorScheme) ? <IconSun /> : <IconMoon />}
                            </ActionIcon>
                        </Group>
                    </Group>
                </Container>
            </AppShell.Header>
            <AppShell.Main>
                <Container size={'xl'} py={40} px={'2px'} style={(_theme) => ({
                    // background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[0],
                    zIndex: 98,
                    position: 'relative',
                    // overflowY: 'scroll'
                    // background: isDarkMode(colorScheme) ? lighten(theme.colors.dark[6], 2) : lighten(theme.colors.gray[1], 0.11),
                })}>
                    {children}
                </Container>
            </AppShell.Main>
        </AppShell>
    )
}

export default CustomAppShell