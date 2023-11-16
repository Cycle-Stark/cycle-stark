import { Accordion, Box, Button, Card, Group, Stack, Text, Title, useMantineColorScheme } from "@mantine/core"
import Hero from "./Hero"
import { IconInbox, IconLoader } from "@tabler/icons-react"
import Contribution from "./Contribution"
import ContributionSkeleton from "./ContributionSkeleton"
import { bigintToLongStrAddress, isDarkMode } from "../../configs/utils"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ContributeBtn from "./ContributeBtn"
import { useAppContext } from "../../providers/AppProvider"
import { useCollectiveContext } from "../../providers/CollectiveProvider"
import RemitCycleBtn from "./RemitCycleBtn"


export interface ICycle {
    receiver: string
    date: string
    amount: string
    total_contributions: number
    cycle_id: number,
    has_ended: boolean
}


const Cycle = (props: ICycle) => {
    const { receiver, date, amount, total_contributions, cycle_id, has_ended } = props
    const { colorScheme } = useMantineColorScheme()

    const [contributions, setContributions] = useState<null | any>([])
    const [loading, setLoading] = useState(false)
    const { cid } = useParams()
    const { contract, address } = useAppContext()
    const { collective, isMember, isOwner } = useCollectiveContext()


    async function loadContributions() {
        if (contract) {
            setLoading(true)
            try {
                const res = await contract.get_cycle_contributions(cid, cycle_id)
                setContributions(res)
            }
            catch (error: any) {
                console.error("Error loading collective cycles::- ", error)
            }
            setLoading(false)
        }
    }

    const can_contribute = () => {
        let can_make_contribution = true
        if (contributions.length > 0) {
            const contrib_found = contributions?.map((contrib: any) => bigintToLongStrAddress(contrib?.hero_id) === address)
            if (contrib_found) {
                can_make_contribution = false
            }
        }
        return can_make_contribution
    }

    const percent_to_remit = Math.round(total_contributions / collective?.hero_count) * 100

    useEffect(() => {
        loadContributions()
    }, [])


    return (
        <Card radius={"md"}>
            <Stack gap={'sm'}>
                <Hero hero_address={receiver} />
                <Text>Cyle: {cycle_id} ({percent_to_remit}% contributions) </Text>
                <Text size="md">Contributions: {total_contributions} / {collective?.hero_count} | Amount: {amount} </Text>
                <Text size="sm"> Started On: {date}</Text>
                <Box>
                    {has_ended ? <Button radius={'md'} disabled>Cycle has ended</Button> :
                        <>
                        {(total_contributions >= collective?.hero_count && isOwner) ? <RemitCycleBtn collective_id={cid} callBackFn={() => window.location.reload()} /> : `${percent_to_remit} % to remitance`}
                        </>
                    }
                </Box>
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
                                    {isMember  && can_contribute() ? <ContributeBtn cid={cid} cycle_id={cycle_id} callBackFn={loadContributions} /> : null}
                                </Group>
                                {
                                    loading ? (
                                        <>
                                            {Array(total_contributions < 2 ? 2 : total_contributions).fill(1).map((_item: number, i: number) => (
                                                <ContributionSkeleton key={`constibutin_skeletorn_${i}`} />
                                            ))}
                                        </>
                                    ) : null
                                }
                                {
                                    contributions?.length === 0 ? (
                                        <Title order={2} ta={'center'} fw={500} my={10}>No contributions yet!</Title>
                                    ) : null
                                }
                                {
                                    !loading && contributions?.length > 0 ? (
                                        <>
                                            {
                                                contributions?.map((contribution: any, i: any) => (
                                                    <Contribution key={`contribution_${i}`} {...contribution} decimals={collective?.decimals} symbol={collective?.symbol} />
                                                ))
                                            }
                                        </>
                                    ) : null
                                }
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Stack>
        </Card>
    )
}

export default Cycle