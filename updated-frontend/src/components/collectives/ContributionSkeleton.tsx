import { Paper, Skeleton, Stack, useMantineColorScheme } from '@mantine/core'
import HeroSkeleton from './HeroSkeleton'
import { isDarkMode } from '../../configs/utils'

const ContributionSkeleton = () => {
    const { colorScheme } = useMantineColorScheme()

    return (
        <Paper p="xs" style={theme => ({
            background: isDarkMode(colorScheme) ? theme.colors.dark[5] : theme.colors.gray[1]
        })}>
            <Stack>
                <HeroSkeleton />
                <Skeleton radius={'md'} height={20} width={'40%'} />
            </Stack>
        </Paper>
    )
}

export default ContributionSkeleton