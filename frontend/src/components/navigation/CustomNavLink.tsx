import { Text, rem, useMantineColorScheme } from '@mantine/core';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { isDarkMode } from '../../configs/utils';
import { IconPlus, IconUserHeart, IconUsersGroup } from '@tabler/icons-react';

export interface ICustomNavLinkProps {
    to: string
    title: string
    icon: any
}

export const navlinks: ICustomNavLinkProps[] = [
    // {
    //     to: '/',
    //     title: 'Home',
    //     icon: <IconHome2 stroke={1.5} />
    // },
    {
        to: '/collectives',
        title: 'Collectives',
        icon: <IconUsersGroup stroke={1.5} style={{ width: rem(14), height: rem(14) }} />
    },
    {
        to: '/create/collective',
        title: 'Create Collective',
        icon: <IconPlus stroke={1.5} style={{ width: rem(14), height: rem(14) }} />
    },
    {
        to: '/my-collectives',
        title: 'My Collectives',
        icon: <IconUserHeart stroke={1.5} style={{ width: rem(14), height: rem(14) }} />
    },
]

const CustomNavLink = ({ to, title }: ICustomNavLinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    const { colorScheme } = useMantineColorScheme()

    return (
        <Text component={NavLink} to={to} variant={match ? 'filled' : 'outline'} fw={500} fs={"16px"} style={theme => ({
            color: match ? theme.colors.blue[6] : isDarkMode(colorScheme) ? theme.colors.gray[1] : theme.colors.dark[6]
        })}>
            {title}
        </Text>
    )
}

export default CustomNavLink