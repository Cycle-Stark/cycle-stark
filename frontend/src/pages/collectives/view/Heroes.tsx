import { Stack, Title } from "@mantine/core"
import Hero from "../../../components/collectives/Hero"


const Heroes = () => {
  return (
    <Stack>
      <Title order={1} size={42} className="custom-title">Heroes</Title>
      <Hero hero_address="dalmas" />
      <Hero hero_address="dalmas" />
      <Hero hero_address="dalmas" />
      <Hero hero_address="dalmas" />
      <Hero hero_address="dalmas" />
      <Hero hero_address="dalmas" />
      <Hero hero_address="dalmas" />
      <Hero hero_address="dalmas" />
    </Stack>
  )
}

export default Heroes