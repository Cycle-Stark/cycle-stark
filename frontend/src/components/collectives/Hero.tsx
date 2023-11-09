import { ActionIcon, Avatar, CopyButton, Group, Text } from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"


interface IHero {
    hero_address: string
}

const Hero = (props: IHero) => {
    const {} = props
    return (
        <Group align="center">
            <Group align="center">
                <Avatar />
                <Text size="sm">
                    0x02FEFe559db7F64d20296e7ca4aca8d864b79bbE1cb8A31502d8986f8ad5Ba0B
                </Text>
            </Group>
            <CopyButton value="0x02FEFe559db7F64d20296e7ca4aca8d864b79bbE1cb8A31502d8986f8ad5Ba0B">
                {({ copied, copy }) => (
                    <ActionIcon color={copied ? 'teal' : 'blue'} variant="subtle" onClick={copy}>
                        <IconCopy size={16} />
                    </ActionIcon>
                )}
            </CopyButton>
        </Group>
    )
}

export default Hero