import { Stack, Text, Title } from "@mantine/core"
import Hero from "../../../components/collectives/Hero"
import { bigintToLongStrAddress } from "../../../configs/utils"
import { useEffect, useState } from "react"
import { ACCOUNT_ADDRESS, contract } from "../../../configs/config"
import { useParams } from "react-router-dom"
import JoinCollectiveBtn from "../../../components/collectives/JoinCollectiveBtn"
import HeroSkeleton from "../../../components/collectives/HeroSkeleton"
import { useCollectiveContext } from "../../../providers/CollectiveProvider"
import { Helmet } from "react-helmet";

const Heroes = () => {

  const [heroes, setHeroes] = useState<null | any>([])
  const [loading, setLoading] = useState(false)
  const { cid } = useParams()

  const { collective } = useCollectiveContext()

  async function loadHeroes() {
    setLoading(true)
    try {
      const res = await contract.get_collective_heroes(cid)
      setHeroes(res)
    }
    catch (error: any) {
      console.error("Error loading heroes::- ", error)
    }
    setLoading(false)
  }

  function canJoin() {
    return heroes?.some((address: any) => bigintToLongStrAddress(address?.toString()) === ACCOUNT_ADDRESS);
  }

  useEffect(() => {
    loadHeroes()
  }, [])

  return (
    <>

      <Helmet>
        <title>{`${collective?.name} | Heroes`}</title>
      </Helmet>

      <Stack>

        <Title order={1} size={52} className="custom-title clip-text" style={{ textAlign: "center" }}> Heroes </Title>
        {
          !canJoin() && !loading ? <JoinCollectiveBtn collective_id={cid} callBackFn={loadHeroes} /> : null
        }
        {
          loading ? (
            <>
              {
                Array(8).fill(1).map((_item: number, i: number) => (
                  <HeroSkeleton key={`collective_${i}`} />
                ))
              }
            </>
          ) : null
        }
        {
          heroes?.length === 0 && !loading ? (
            <Stack align="center">
              <Title ta={'center'} fw={400} mt={40}>No heroes here!</Title>
              <Text size="sm" ta={'center'}>Want to join?</Text>
              <Text ta="center"></Text>
              <JoinCollectiveBtn collective_id={cid} callBackFn={loadHeroes} />
            </Stack>
          ) : null
        }
        {
          heroes?.map((hero_address: any, i: number) => (
            <Hero key={`hero_${i}`} hero_address={bigintToLongStrAddress(hero_address?.toString())} />
          ))
        }
      </Stack>
    </>
  )
}

export default Heroes