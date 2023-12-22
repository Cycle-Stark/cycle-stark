import { Group, Skeleton } from '@mantine/core'

const HeroSkeleton = () => {
    return (
        <Group align="center">
            <Skeleton height={40} width={40} radius={'md'} />
            <Skeleton width={'70%'} height={16} radius={'md'} />
        </Group>
    )
}

export default HeroSkeleton