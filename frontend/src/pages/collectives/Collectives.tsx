import { Grid, Stack, Title } from "@mantine/core"
import Collective from "../../components/collectives/Collective"
import { useEffect } from "react"
import { contract } from "../../configs/config"
import { CairoResult, CairoResultVariant, cairo, shortString } from "starknet"
import BN from "bignumber.js"

const Collectives = () => {

    async function callContract() {
        const res = await contract.get_collectives(1)
        console.log(res)
        const result = new CairoResult(CairoResultVariant.Ok, "25604676053229993250954053807560286580137370434497907n")
        // console.log(result)
        let large_no = BN("25604676053229993250954053807560286580137370434497907n").toString()
        console.log(large_no)
        let r = shortString.decodeShortString("25604676053229993250954053807560286580137370434497907n")
        console.log(r)
    }

    useEffect(() => {
        callContract()
    }, [callContract])

    return (
        <Stack>
            <Title order={1} className="custom-title" style={{ textAlign: "center" }} size={42}>Browse Through Collectives</Title>
            <Grid>
                {
                    Array(20).fill(1).map((item: number, i: number) => (
                        <Grid.Col key={`collective_${item}_${i}`} span={{ xl: 3, md: 4, sm: 6, xs: 12 }} py={40} pl={20}>
                            <Collective id={item + i} />
                        </Grid.Col>
                    ))
                }
            </Grid>
        </Stack>
    )
}

export default Collectives

// curl -d '{"amount":8646000000000, "address": "0x002d0b41511e235b9f2e79acf391550f9c4798745724095fd36c2aaad193d3ae"}' -H "Content-Type: application/json" -X POST http://localhost:5050/mint