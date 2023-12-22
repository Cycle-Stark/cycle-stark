import { Grid, Skeleton, Stack } from '@mantine/core';

function CollectiveSkeleton() {
    return (
        <Grid py={'lg'}>
            <Grid.Col span={4} px={'xs'}>
                <Stack className="h-100" align="center" justify="center">
                    <Skeleton height={50} circle mb="md" />
                </Stack>
            </Grid.Col>
            <Grid.Col span={8}>
                <Stack>
                    <Skeleton height={16} width={'100%'} radius="xsm" />
                    <Skeleton height={10} mt={2} radius="sm" />
                    <Skeleton height={20} mt={2} width="80%" radius="sm" />
                </Stack>
            </Grid.Col>
        </Grid>
    );
}

export default CollectiveSkeleton