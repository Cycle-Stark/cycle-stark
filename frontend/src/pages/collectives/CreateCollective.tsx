import { Button, Container, Grid, Group, NumberInput, Stack, TextInput, Title } from "@mantine/core"
import { DateTimePicker } from '@mantine/dates';
import { IconPlus } from "@tabler/icons-react";
import { ACCOUNT_ADDRESS, CONTRACT_ADDRESS, account, contract, provider } from "../../configs/config";
import { CallData, cairo } from "starknet";


const CreateCollective = () => {

    async function registerHero() {
        // contract.connect(account)
        // console.log(contract)
        // console.log(account)
        const myCall = contract.populate('register_account', [])
        const res = await contract.register_account(myCall.calldata, {
            entrypoint: "transfer",
            calldata: CallData.compile({
                recipient: CONTRACT_ADDRESS,
                amount: cairo.uint256(100000n)
            })
        })
        console.log(res)
    }

    async function sendSomeFunds() {
        console.log(account)
        const result = await account.execute(
            {
                contractAddress: ACCOUNT_ADDRESS,
                entrypoint: 'transfer',
                calldata: CallData.compile({
                    recipient: CONTRACT_ADDRESS,
                    amount: cairo.uint256(100000n)
                })
            }
        );
        await provider.waitForTransaction(result.transaction_hash);
        await provider.waitForTransaction(result.transaction_hash);
    }

    const styles = {
        input: {
            borderWidth: "2px"
        }
    }
    return (
        <Stack>
            <Title order={1} className="custom-title" style={{ textAlign: "center" }}>Register New Collective</Title>
            <Button onClick={registerHero}>Register Hero</Button>
            <Button onClick={sendSomeFunds}>Send some funds</Button>
            <form>
                <Container maw={600}>
                    <Grid>
                        <Grid.Col span={{ md: 12 }}>
                            <TextInput label={"Collective Name"} radius={'md'} placeholder="STRK Collective" styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 12 }}>
                            <TextInput label={"Rules"} radius={'md'} placeholder="Less than 30 characters" styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <TextInput label={"Token"} radius={'md'} placeholder="Token Address: 0x00fdkb..." styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <NumberInput label={"Amount / cycle"} hideControls radius={'md'} placeholder="200 STRK" styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <NumberInput label={"Fine / cycle"} hideControls radius={'md'} placeholder="20 STRK" styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <DateTimePicker label={"Start Date"} radius={'md'} placeholder="Start Date" clearable styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Group justify="center">
                                <Button leftSection={<IconPlus stroke={1.5} />} size="md" variant="outline" radius={"xl"}>Create Collective</Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Container>
            </form>
        </Stack>
    )
}

export default CreateCollective