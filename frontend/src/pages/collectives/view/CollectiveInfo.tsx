import { Alert, Button, Grid, Group, Skeleton, Stack, Text, Title } from "@mantine/core"
import { useParams } from "react-router-dom"
import { ACCOUNT_ADDRESS } from "../../../configs/config"
import { timeStampToDate } from "../../../configs/utils"
import { IconAlertTriangle, IconCheck, IconX } from "@tabler/icons-react"
import BigNumber from "bignumber.js"
import CloseRegistrationsBtn from "../../../components/collectives/CloseRegistrationsBtn"
import { useCollectiveContext } from "../../../providers/CollectiveProvider"
import { Helmet } from "react-helmet"

interface IDataRow {
  title: string
  value: React.ReactNode
  loading: boolean
}

export const Datarow = (props: IDataRow) => {
  const { title, value, loading } = props

  return (
    <Grid>
      <Grid.Col span={3} >
        <Stack className="h-100" justify="center">
          <Title order={3} fw={500}>{title}</Title>
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Stack className="h-100" justify="center">
          {
            loading ? <Skeleton radius={'sm'} height={14} /> : <>{value}</>
          }
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

const CollectiveInfo = () => {

  const { cid } = useParams()

  const {collective, isCollectiveFound, isCollectiveLoading} = useCollectiveContext()
  const loading = isCollectiveLoading
  
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div>
      <Helmet>
        <title>{`${collective?.name} | Heroes`}</title>
      </Helmet>
      <Stack>
        <Title order={1} size={42} className="custom-title">About</Title>
        {
          !isCollectiveLoading && !isCollectiveFound ? (
            <Alert variant="light" color="red" title="Collective Not Found" icon={<IconAlertTriangle stroke={1.5} />}>
              The collective was not found! Follow collectives from collectives tab or my collective tab.
            </Alert>
          ) : null
        }
        <Datarow title="Creator" value={<Text size="sm">{collective?.owner}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="Name" value={<Text size="sm">{collective?.name}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="Aim" value={<Text size="sm">{collective?.aim}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="Has Started"
          value={<Group>
            <Button radius={"md"} size="sm" leftSection={collective?.has_started ? <IconCheck stroke={1.5} /> : <IconX stroke={1.5} />} color={collective?.has_started ? "green" : "red"} variant="light">
              {collective?.has_started ? "Yes" : "No"}
            </Button>
            {
              collective?.owner === ACCOUNT_ADDRESS && !collective?.has_started ? <CloseRegistrationsBtn collective_id={cid} callBackFn={reloadPage} /> : null
            }
          </Group>}
          loading={loading || !isCollectiveFound} />
        <Datarow title="Token" value={<Text size="sm">{`${collective?.symbol} | ${collective?.decimals}`}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="Token Address" value={<Text size="sm">{collective?.token}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="Amount/Cycle" value={<Text size="sm">{collective?.cycle_amount}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="No. of Heroes" value={<Text size="sm">{collective?.hero_count}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="No. of Cycles" value={<Text size="sm">{collective?.cycles_count}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="Active Cycle" value={<Text size="sm">Cycle {collective?.active_cycle}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="Fine Amount" value={<Text size="sm">{collective?.fine}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="Start Date" value={<Text size="sm">{timeStampToDate(BigNumber(collective?.start_date).toNumber())?.toDateString() ?? ""}</Text>} loading={loading || !isCollectiveFound} />
        <Datarow title="Next Cycle Date" value="" loading={loading || !isCollectiveFound} />
        <Datarow title="Rules" value={<Text size="sm">{`${collective?.rule_1} | ${collective?.rule_2} | ${collective?.rule_3}`}</Text>} loading={loading || !isCollectiveFound} />
      </Stack>
    </div>
  )
}

export default CollectiveInfo