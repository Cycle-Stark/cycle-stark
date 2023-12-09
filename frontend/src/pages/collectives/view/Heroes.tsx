import { Stack, Text, Title } from "@mantine/core"
import Hero from "../../../components/collectives/Hero"
import { bigintToLongStrAddress } from "../../../configs/utils"
import { useParams } from "react-router-dom"
import JoinCollectiveBtn from "../../../components/collectives/JoinCollectiveBtn"
import HeroSkeleton from "../../../components/collectives/HeroSkeleton"
import { useCollectiveContext } from "../../../providers/CollectiveProvider"
import { Helmet } from "react-helmet";

const Heroes = () => {

  const { cid } = useParams()
  const { collective, heroes, isMember, loadingHeroes } = useCollectiveContext()

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <>

      <Helmet>
        <title>{`${collective?.name} | Heroes`}</title>
      </Helmet>

      <Stack>

        <Title order={1} size={52} className="custom-title clip-text" style={{ textAlign: "center" }}> Heroes </Title>
        {
          !isMember && !loadingHeroes && !collective?.has_started ? <JoinCollectiveBtn collective_id={cid} callBackFn={reloadPage} /> : null
        }
        {
          loadingHeroes && !heroes ? (
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
          heroes?.length === 0 && !loadingHeroes ? (
            <Stack align="center">
              <Title ta={'center'} fw={400} mt={40}>No heroes here!</Title>
              <Text size="sm" ta={'center'}>Want to join?</Text>
              <Text ta="center"></Text>
              <JoinCollectiveBtn collective_id={cid} callBackFn={reloadPage} />
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