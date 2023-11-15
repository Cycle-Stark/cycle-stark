import { Box, Card, Group, Skeleton } from "@mantine/core"
import HeroSkeleton from "./HeroSkeleton"



const CycleSkeleton = () => {

    return (
        <Card radius={"md"}>
            <Group>
                <Box className="w-100">
                    <HeroSkeleton />
                </Box>
                <Skeleton height={14} c='red' />
                <Skeleton height={10} />
            </Group>
        </Card>
    )
}

export default CycleSkeleton