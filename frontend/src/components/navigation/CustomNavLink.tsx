import { Button } from '@mantine/core';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

export interface ICustomNavLinkProps {
    to: string
    title: string
    icon: any
}

const CustomNavLink = ({ to, title, icon }: ICustomNavLinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Button h={42} leftSection={icon} component={NavLink} to={to} variant={match ? 'filled' : 'outline'} radius={'md'} style={theme => ({
            outline: `2px solid ${match ? theme.colors.blue[6]: 'transparent'}`,
            outlineOffset: "2px"
        })}>
            {title}
        </Button>
    )
}

export default CustomNavLink