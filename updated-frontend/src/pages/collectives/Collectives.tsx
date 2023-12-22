import { Button, Grid, Stack, Text, Title } from "@mantine/core"
import Collective from "../../components/collectives/Collective"
import { useEffect, useState } from "react"
import CollectiveSkeleton from "../../components/collectives/CollectiveSkeleton"
import { Link } from "react-router-dom"
import { IconPlus } from "@tabler/icons-react"
import { Helmet } from "react-helmet"
import { useAppContext } from "../../providers/AppProvider"
import CustomBox from "../../components/others/CustomBox"
import { motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from "../../configs/motion"

const Collectives = () => {
    const [collectives, setCollectives] = useState<null | any>()
    const [loading, setLoading] = useState(false)
    const { contract } = useAppContext()

    async function loadCollectives() {
        setLoading(true)
        try {
            if (contract) {
                const res = await contract.get_collectives(1)
                setCollectives(res)
            }
        }
        catch (error: any) {
            console.error("Error loading collectives::- ", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadCollectives()
    }, [contract])

    return (
        <>
            <Helmet>
                <title>Collectives | CycleStark</title>
            </Helmet>
            <motion.div {...slideAnimation('left')}>
                <CustomBox>
                    <Stack>
                        <Title order={1} className="custom-title" style={{ textAlign: "center" }} size={42}>Browse Through Collectives</Title>
                        {
                            loading ? (
                                <Grid>
                                    {
                                        Array(3).fill(1).map((_item: number, i: number) => (
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
                                    <Title ta={'center'} fw={400} mt={40}>There are no collectives yet!</Title>
                                    <Text>Create the first one!</Text>
                                    <Button component={Link} to="/create/collective" size="lg" radius={'md'} leftSection={<IconPlus stroke={1.5} />} variant="outline">Collective</Button>
                                </Stack>
                            ) : null
                        }
                        <Grid>
                            {
                                collectives?.map((collective: any, i: number) => (
                                    <Grid.Col key={`collective_${collective?.id?.toString()}_${i}`} span={{ xl: 4, md: 4, sm: 6, xs: 12 }} pl={20}>
                                        <motion.div {...fadeAnimation}>
                                            <Collective collective={collective} />
                                        </motion.div>
                                    </Grid.Col>
                                ))
                            }
                        </Grid>
                    </Stack>
                </CustomBox>
            </motion.div>
        </>
    )
}

export default Collectives

// curl -d '{"amount":8646000000000, "address": "0x002d0b41511e235b9f2e79acf391550f9c4798745724095fd36c2aaad193d3ae"}' -H "Content-Type: application/json" -X POST http://localhost:5050/mint