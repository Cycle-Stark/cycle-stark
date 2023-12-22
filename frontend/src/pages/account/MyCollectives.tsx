import { Button, Grid, Stack, Title } from "@mantine/core"
import CollectiveSkeleton from "../../components/collectives/CollectiveSkeleton"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { IconPlus } from "@tabler/icons-react"
import Collective from "../../components/collectives/Collective"
import { useAppContext } from "../../providers/AppProvider"


const MyCollectives = () => {

    const [collectives, setCollectives] = useState<null | any>()
    const [loading, setLoading] = useState(false)
    const { contract, address } = useAppContext()

    async function loadCollectives() {
        setLoading(true)
        try {
            if (contract) {
                const res = await contract.get_hero_collectives(address, 1)
                setCollectives(res)
            }
        }
        catch (error: any) {
            console.error("Error loading your collectives::- ", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadCollectives()
    }, [])

    return (
        <Stack>
            <Title order={1} size={52} className="custom-title clip-text" style={{ textAlign: "center" }}> My Collectives</Title>
            {
                loading ? (
                    <Grid>
                        {
                            Array(8).fill(1).map((_item: number, i: number) => (
                                <Grid.Col key={`collective_${i}`} span={{ xl: 4, md: 4, sm: 6, xs: 12 }} mb="lg">
                                    <CollectiveSkeleton />
                                </Grid.Col>
                            ))
                        }
                    </Grid>
                ) : null
            }
            {
                collectives?.length === 0 && !loading ? (
                    <Stack align="center">
                        <Title ta={'center'} fw={400} my={40}>You have not created any collectives</Title>
                        <Button component={Link} to="/create/collective" size="lg" radius={'md'} leftSection={<IconPlus stroke={1.5} />} variant="outline">Create New</Button>
                    </Stack>
                ) : null
            }
            <Grid>
                {
                    collectives?.map((collective: any, i: number) => (
                        <Grid.Col key={`collective_${collective?.id?.toString()}_${i}`} span={{ xl: 4, md: 4, sm: 6, xs: 12 }} py={40} pl={20}>
                            <Collective collective={collective} />
                        </Grid.Col>
                    ))
                }
            </Grid>
        </Stack>
    )
}

export default MyCollectives