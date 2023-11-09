import { Grid, Stack, Text, Title } from "@mantine/core"

interface IDataRow {
  title: string
  value: string
}

export const Datarow = (props: IDataRow) => {
  const { title, value } = props

  return (
    <Grid>
      <Grid.Col span={3} >
        <Stack className="h-100" justify="center">
          <Title order={3}>{title}</Title>
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Stack className="h-100" justify="center">
          <Text size="sm">{value}</Text>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

const CollectiveInfo = () => {
  return (
    <Stack>
      <Title order={1} size={42} className="custom-title">About</Title>
      <Datarow title="Name" value="Best Collective" />
      <Datarow title="Token" value="STRK" />
      <Datarow title="Amount/Cycle" value="200 STRK" />
      <Datarow title="No. of Heroes" value="10" />
      <Datarow title="Fine Amount" value="10 STKR" />
      <Datarow title="Start Date" value="13 Nov 2023 12:00 AM" />
      <Datarow title="Next Cycle Date" value="13 Nov 2023 12:00 AM" />
      <Datarow title="Rules" value="Rule 1 || Rule 2 || Rule 3" />
    </Stack>
  )
}

export default CollectiveInfo