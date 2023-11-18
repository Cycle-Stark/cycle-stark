import { Group, Stack, Title } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StartCycleBtn from '../../../components/collectives/StartCycleBtn'
import Cycle from '../../../components/collectives/Cycle'
import CycleSkeleton from '../../../components/collectives/CycleSkeleton'
import BigNumber from 'bignumber.js'
import { Helmet } from 'react-helmet'
import { useCollectiveContext } from '../../../providers/CollectiveProvider'
import { useAppContext } from '../../../providers/AppProvider'
import { bigintToLongStrAddress, convertToReadableTokens } from '../../../configs/utils'


const Cycles = () => {

  const [cycles, setCycles] = useState<null | any>([])
  const [loading, setLoading] = useState(false)
  const { cid } = useParams()

  const { collective, raw_collective } = useCollectiveContext()
  const { contract } = useAppContext()

  async function loadCycles() {
    setLoading(true)
    try {
      if (contract) {
        const res = await contract.get_collective_cycles(cid)
        setCycles(res)
      }
    }
    catch (error: any) {
      console.error("Error loading collective cycles::- ", error)
    }
    setLoading(false)
  }


  useEffect(() => {
    loadCycles()
  }, [contract])

  return (
    <>
      <Helmet>
        <title>{`${collective?.name} | Cycles`}</title>
      </Helmet>
      <Stack>
        <Title order={1} size={42} className="custom-title">Cycles</Title>

        {
          loading ? (
            <>
              {
                Array(8).fill(1).map((_item: number, i: number) => (
                  <CycleSkeleton key={`cycle_${i}`} />
                ))
              }
            </>
          ) : null
        }
        {
          cycles?.length === 0 && !loading ? (
            <Stack align="center">
              <Title ta={'center'} fw={400} mt={40}>There are no cycles yet!</Title>
            </Stack>
          ) : null
        }
        {
          cycles?.map((cycle: any, i: number) => (
            <Cycle key={`cycle_view_${i}`} {...cycle} receiver={bigintToLongStrAddress(cycle?.receiver_hero)} date="2023-02-21" amount={`${convertToReadableTokens(BigNumber(raw_collective?.cycle_amount).multipliedBy(cycle.contributions_count), collective?.decimals ?? 18)} ${collective?.symbol}`} total_contributions={BigNumber(cycle?.contributions_count).toNumber()} cycle_id={BigNumber(cycle?.id).toNumber()} />
          ))
        }
        {
          collective?.cycles_count >= collective?.hero_count ? null : (
            <Group>
              {collective ? <StartCycleBtn collective_id={cid} callBackFn={loadCycles} /> : null}
            </Group>
          ) 
        }
      </Stack>
    </>
  )
}

export default Cycles