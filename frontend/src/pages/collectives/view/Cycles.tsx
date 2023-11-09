import { Card, Stack, Text, Title } from '@mantine/core'
import Hero from '../../../components/collectives/Hero'


export interface ICycle {
  receiver: string
  date: string
  amount: string
  total_contributions: string
}

export const Cycle = (props: ICycle) => {
  const { receiver, date, amount, total_contributions } = props

  return (
    <Card radius={"md"}>
      <Hero hero_address={receiver} />
      <Text>Contributions: {total_contributions} | Amount: {amount} </Text>
      <Text> Date: {date}</Text>
    </Card>
  )
}

const Cycles = () => {
  return (
    <Stack>
      <Title order={1} size={42} className="custom-title">Cycles</Title>
      <Cycle receiver='dalmas' date="2023-02-21" amount='2000 STRK' total_contributions='30/32' />
      <Cycle receiver='dalmas' date="2023-02-21" amount='2000 STRK' total_contributions='30/32' />
      <Cycle receiver='dalmas' date="2023-02-21" amount='2000 STRK' total_contributions='30/32' />
      <Cycle receiver='dalmas' date="2023-02-21" amount='2000 STRK' total_contributions='30/32' />
      <Cycle receiver='dalmas' date="2023-02-21" amount='2000 STRK' total_contributions='30/32' />
      <Cycle receiver='dalmas' date="2023-02-21" amount='2000 STRK' total_contributions='30/32' />
    </Stack>
  )
}

export default Cycles