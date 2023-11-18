import { ActionIcon, Avatar, CopyButton, Group, Text, Tooltip } from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"
import { getTwoAddressLetters } from "../../configs/utils"


interface IHero {
    hero_address: string
}

const Hero = (props: IHero) => {
    const { hero_address } = props
    return (
        <Group align="center" style={{
            flexWrap: "nowrap"
        }}>
            <Group align="center" style={{
            flexWrap: "nowrap",
            wordBreak: "break-word",
            wordWrap: "break-word"
        }}>
                <Avatar radius={'md'}>
                    {getTwoAddressLetters(hero_address)}
                </Avatar>
                <Text size="sm">
                    {hero_address}
                </Text>
            </Group>
            <CopyButton value={hero_address}>
                {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} color={copied ? 'teal' : 'blue'} radius={'md'}>
                        <ActionIcon color={copied ? 'teal' : 'blue'} variant="subtle" onClick={copy}>
                            <IconCopy size={16} />
                        </ActionIcon>
                    </Tooltip>
                )}
            </CopyButton>
        </Group>
    )
}

export default Hero