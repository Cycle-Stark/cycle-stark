import { Menu, rem, ActionIcon } from '@mantine/core';
import {
    IconMenu2,
    IconWalletOff,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { ICustomNavLinkProps, navlinks } from './CustomNavLink';
import { useAppContext } from '../../providers/AppProvider';

export default function SmallScreenMenu() {
    const { handleConnetWalletBtnClick, address } = useAppContext()

    return (
        <Menu shadow="md" width={200} position='bottom-end' radius={'lg'}>
            <Menu.Target>
                <ActionIcon variant='light'>
                    <IconMenu2 />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                {
                    navlinks.map((link: ICustomNavLinkProps, i: number) => (
                        <Menu.Item key={`link_${i}`} component={Link} to={link.to} leftSection={link.icon}>
                            {link.title}
                        </Menu.Item>

                    ))
                }
                <Menu.Divider />

                <Menu.Label>Wallet</Menu.Label>
                <Menu.Item color={address ? 'red': 'green'} leftSection={<IconWalletOff style={{ width: rem(14), height: rem(14) }} />} onClick={handleConnetWalletBtnClick}>
                    {address ? "Disconnect" : "Connect"}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}