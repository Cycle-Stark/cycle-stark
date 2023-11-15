import { Accordion, Button, Card, Group, Stack, Text, Title, useMantineColorScheme } from "@mantine/core"
import Hero from "./Hero"
import { IconInbox, IconLoader } from "@tabler/icons-react"
import Contribution from "./Contribution"
import ContributionSkeleton from "./ContributionSkeleton"
import { isDarkMode } from "../../configs/utils"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { contract } from "../../configs/config"
import ContributeBtn from "./ContributeBtn"


export interface ICycle {
    receiver: string
    date: string
    amount: string
    total_contributions: number
    cycle_id: number
}


const Cycle = (props: ICycle) => {
    const { receiver, date, amount, total_contributions, cycle_id } = props
    const { colorScheme } = useMantineColorScheme()

    const [contributions, setContributions] = useState<null | any>([])
    const [loading, setLoading] = useState(false)
    const { cid } = useParams()


    async function loadContributions() {
        setLoading(true)
        try {
            const res = await contract.get_cycle_contributions(cid, cycle_id)
            console.log(res)
            setContributions(res)
        }
        catch (error: any) {
            console.error("Error loading collective cycles::- ", error)
        }
        setLoading(false)
    }


    return (
        <Card radius={"md"}>
            <Stack gap={'sm'}>
                <Hero hero_address={receiver} />
                <Text>Cyle: 1</Text>
                <Text size="md">Contributions: {total_contributions} | Amount: {amount} </Text>
                <Text size="sm"> Started On: {date}</Text>
                {/* <Paper p={'md'}> */}
                <Accordion variant="separated">
                    <Accordion.Item value="contribution">
                        <Accordion.Control icon={<IconInbox />} style={theme => ({
                            background: isDarkMode(colorScheme) ? theme.colors.dark[8] : theme.colors.gray[2],
                            borderRadius: theme.radius.md
                        })}>Contributions</Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                <Group justify="right">
                                    <Button leftSection={<IconLoader stroke={1.5} />} variant="light" radius={'md'} onClick={loadContributions}>Load contributions</Button>
                                    <ContributeBtn cid={cid} cycle_id={cycle_id} callBackFn={loadContributions} />
                                </Group>
                                {
                                    loading ? (
                                        <>
                                            {Array(total_contributions < 2  ? 2 : total_contributions).fill(1).map((_item: number, i: number) => (
                                                <ContributionSkeleton key={`constibutin_skeletorn_${i}`} />
                                            ))}
                                        </>
                                    ) : null
                                }
                                {
                                    contributions?.length === 0 ? (
                                        <Title order={2} ta={'center'} fw={500} my={10}>No contributions yet!</Title>
                                    ): null
                                }
                                {
                                    !loading && contributions?.length > 0 ? (
                                        <>
                                            {
                                                contributions?.map((_contribution: any, i: any) => (
                                                    <Contribution key={`contribution_${i}`} />
                                                ))
                                            }
                                        </>
                                    ) : null
                                }
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                {/* </Paper> */}
            </Stack>
        </Card>
    )
}

export default Cycle