import { ActionIcon, Button, Center, Container, Grid, Group, NumberInput, Stack, Text, TextInput, Title, useMantineTheme } from "@mantine/core"
import { DateTimePicker } from '@mantine/dates';
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { ACCOUNT_ADDRESS, CONTRACT_ADDRESS, account, contract } from "../../configs/config";
import { cairo, BigNumberish, CallData } from "starknet";
import { useForm } from "@mantine/form"

import BN from "bignumber.js"


const RULE = {
    rule: ""
}

const CreateCollective = () => {

    const theme = useMantineTheme()

    const form = useForm({
        initialValues: {
            rules: Array(1).fill(RULE),
            name: "",
            token: "",
            amt: 0,
            fine: 0,
            start_date: ""
        },
        validate: {
            name: value => {
                if (value === "") {
                    return "Enter collective name"
                }
                else if (value.length > 30) {
                    return "Collective name should be only 30 characters and below"
                }
                return null
            },
            token: value => value === "" ? "Collective Token address required" : null,
            amt: value => value === 0 ? "Cycle amount is required" : null,
            start_date: value => value === "" ? "Start date is required" : null,
            rules: {
                rule: value => {
                    if (value.length > 30) {
                        return "Rule length should be less than 30 characters"
                    }
                    else if (value === "") {
                        return "Rule is required or delete this"
                    }
                    return null
                }
            }
        }
    })

    const addRule = () => {
        form.insertListItem("rules", RULE)
    }

    const removeRule = (i: number) => {
        form.removeListItem("rules", i)
    }

    // async function registerHero() {
    //     // contract.connect(account)
    //     // console.log(contract)
    //     // console.log(account)
    //     const myCall = contract.populate('register_account', [])
    //     const res = await contract.register_account(myCall.calldata, {
    //         entrypoint: "transfer",
    //         calldata: CallData.compile({
    //             recipient: CONTRACT_ADDRESS,
    //             amount: cairo.uint256(100000n)
    //         })
    //     })
    //     console.log(res)
    // }

    async function registerCollective(data: any) {
        contract.connect(account)

        const rule_1 = data.rules[0].rule
        const rule_2 = data?.rules.length > 1 ? data.rules[1].rule : ""
        const rule_3 = data?.rules.length > 2 ? data.rules[2].rule : ""

        // const token: string = '0x048242eca329a05af1909fa79cb1f9a4275ff89b987d405ec7de08f73b85588f'
        // console.log(cairo.felt(token))
        const collective_inputs = [data.name, rule_1, rule_2, rule_3, data.amt, data.fine, data?.token, data.start_date.getTime()]
        const calldata = CallData.compile(collective_inputs)
        console.log(calldata)
        const myCall = contract.populate('register_collective', collective_inputs)
        const res = await contract.register_collective(myCall.calldata)
        console.log(res)
    }

    // async function sendSomeFunds() {
    //     console.log(account)
    //     const result = await account.execute(
    //         {
    //             contractAddress: ACCOUNT_ADDRESS,
    //             entrypoint: 'transfer',
    //             calldata: CallData.compile({
    //                 recipient: CONTRACT_ADDRESS,
    //                 amount: cairo.uint256(100000n)
    //             })
    //         }
    //     );
    //     await provider.waitForTransaction(result.transaction_hash);
    //     await provider.waitForTransaction(result.transaction_hash);
    // }

    function cerateCollective() {
        const data = structuredClone(form.values)
        registerCollective(data)
    }

    function getColor(len: number) {
        let percent = Math.abs(len / 30 * 100)
        if (percent == 100) {
            return theme.colors.red[6]
        }
        else if (percent > 80) {
            return theme.colors.yellow[6]
        }
        else if (percent > 50) {
            return theme.colors.indigo[6]
        }
        return theme.colors.green[6]
    }


    const styles = {
        input: {
            borderWidth: "2px"
        }
    }

    // 2 ETH -> 2000000000000000000

    return (
        <Stack>
            <Title order={1} className="custom-title" style={{ textAlign: "center" }}>Register New Collective</Title>
            <form onSubmit={form.onSubmit((_values) => cerateCollective())}>
                <Container maw={600}>
                    <Grid>
                        <Grid.Col span={{ md: 12 }}>
                            <TextInput label={"Collective Name"} radius={'md'} placeholder="STRK Collective" styles={styles} {...form.getInputProps('name')} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 12 }}>
                            <Stack>
                                <Text>Rules</Text>
                                {
                                    form.values.rules.map((_rule: any, i: number) => (
                                        <Grid key={`rule_${i}`}>
                                            <Grid.Col span={{ xs: 10 }}>
                                                <TextInput label={"Rule # 1."} radius={'md'} placeholder="Less than 30 characters" styles={styles} {...form.getInputProps(`rules.${i}.rule`)}
                                                    rightSection={<Text size="xs" c={getColor(form.values.rules[i].rule.length ?? 0)}>{form.values.rules[i].rule.length ?? 0}/30</Text>} />
                                            </Grid.Col>
                                            <Grid.Col span={{ xs: 2 }}>
                                                <Center className="h-100">
                                                    <ActionIcon color="red" variant="light" disabled={i === 0} radius={"lg"} size={'lg'} onClick={() => removeRule(i)}>
                                                        <IconTrash size={22} />
                                                    </ActionIcon>
                                                </Center>
                                            </Grid.Col>
                                        </Grid>
                                    ))
                                }
                                <Group justify="right">
                                    <Button size="sm" variant="outline" disabled={form.values.rules.length === 3} radius={'md'} leftSection={<IconPlus />} onClick={addRule}>Add</Button>
                                </Group>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <TextInput label={"Token"} radius={'md'} placeholder="Token Address: 0x00fdkb..." {...form.getInputProps('token')} styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <NumberInput label={"Amount / cycle"} hideControls radius={'md'} placeholder="200 STRK" {...form.getInputProps('amt')} styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <NumberInput label={"Fine / cycle"} hideControls radius={'md'} placeholder="20 STRK" {...form.getInputProps('fine')} styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <DateTimePicker label={"Start Date"} radius={'md'} minDate={new Date()} placeholder="Start Date" {...form.getInputProps('start_date')} clearable styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Group justify="center" py="lg">
                                <Button leftSection={<IconPlus stroke={1.5} />} type="submit" size="md" variant="outline" radius={"xl"}>Create Collective</Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Container>
            </form>
        </Stack>
    )
}

export default CreateCollective