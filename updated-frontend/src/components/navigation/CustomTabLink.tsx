import { Button } from '@mantine/core';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

export interface ICustomTabLinkProps {
    to: string
    title: string
    icon: any
    color: string
}

const CustomTabLink = ({ to, title, icon, color }: ICustomTabLinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Button leftSection={icon} component={NavLink} color={color} to={to} variant={match ? 'filled' : 'light'} radius={'md'} style={_theme => ({
            outline: `2px solid ${match ? color: 'transparent'}`,
            outlineOffset: "2px",
            border: "none",
            fontWeight: "400"
        })}>
            {title}
        </Button>
    )
}

export default CustomTabLink