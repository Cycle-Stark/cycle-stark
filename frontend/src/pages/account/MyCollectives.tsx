import { Grid, Stack, Title } from "@mantine/core"
import Collective from "../../components/collectives/Collective"


const MyCollectives = () => {
    return (
        <Stack>
            <Title order={1} size={52} className="custom-title clip-text" style={{ textAlign: "center" }}> My Collectives</Title>
            <Grid>
                {
                    Array(3).fill(1).map((item: number, i: number) => (
                        <Grid.Col key={`collective_${item}_${i}`} span={{ xl: 3, md: 4, sm: 6, xs: 12 }} py={40} pl={20}>
                            <Collective id={item + i} />
                        </Grid.Col>
                    ))
                }
            </Grid>
        </Stack>
    )
}

export default MyCollectives