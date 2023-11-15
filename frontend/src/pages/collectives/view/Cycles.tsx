import { Stack, Title } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { contract } from '../../../configs/config'
import StartCycleBtn from '../../../components/collectives/StartCycleBtn'
import Cycle from '../../../components/collectives/Cycle'
import CycleSkeleton from '../../../components/collectives/CycleSkeleton'
import BigNumber from 'bignumber.js'
import { Helmet } from 'react-helmet'
import { useCollectiveContext } from '../../../providers/CollectiveProvider'


const Cycles = () => {

  const [cycles, setCycles] = useState<null | any>([])
  const [loading, setLoading] = useState(false)
  const { cid } = useParams()

  const { collective } = useCollectiveContext()

  async function loadCycles() {
    setLoading(true)
    try {
      const res = await contract.get_collective_cycles(cid)
      console.log(res)
      setCycles(res)
    }
    catch (error: any) {
      console.error("Error loading collective cycles::- ", error)
    }
    setLoading(false)
  }


  useEffect(() => {
    loadCycles()
  }, [])

  return (
    <>
      <Helmet>
        <title>{`${collective?.name} | Cycles`}</title>
      </Helmet>
      <Stack>
        <Title order={1} size={42} className="custom-title">Cycles</Title>
        <StartCycleBtn collective_id={cid} callBackFn={loadCycles} />
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
            <Cycle key={`cycle_view_${i}`} receiver='dalmas' date="2023-02-21" amount='2000 STRK' total_contributions={3} cycle_id={BigNumber(cycle?.id).toNumber()} />
          ))
        }
      </Stack>
    </>
  )
}

export default Cycles