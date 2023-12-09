import { ActionIcon, Button, Center, Container, Grid, Group, LoadingOverlay, MantineTheme, NumberInput, Stack, Text, TextInput, Title, useMantineTheme } from "@mantine/core"
import { DateTimePicker } from '@mantine/dates';
import { IconAlertTriangle, IconInfoCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form"
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useAppContext } from "../../providers/AppProvider";
import { formatNumberInternational } from "../../configs/utils";
import BigNumber from "bignumber.js";
import SelectTokenModal from "../../components/tokens/SelectTokenModal";
import TOKENS, { Token } from "../../configs/tokens";


interface IColorText {
    theme: MantineTheme,
    len: number
}

const ColorText = (props: IColorText) => {
    const { theme, len } = props
    function getColor(len: number) {
        let percent = Math.abs(len / 30 * 100)
        if (percent >= 100) {
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
    return (
        <Text size="xs" c={getColor(len ?? 0)}>{len ?? 0}/30</Text>
    )
}

const RULE = {
    rule: ""
}

const CreateCollective = () => {

    const [loading, setLoading] = useState(false)
    const theme = useMantineTheme()
    const { contract } = useAppContext()

    const form = useForm({
        initialValues: {
            rules: Array(1).fill(RULE),
            name: "",
            aim: "",
            // token: "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
            token: TOKENS[0],
            amt: 0,
            fine: 0,
            start_date: "",
            decimals: 0,
            symbol: "",
            token_price: 0,
        },
        validate: {
            name: (value: any) => {
                if (value === "") {
                    return "Enter collective name"
                }
                else if (value.length > 30) {
                    return "Collective name should be only 30 characters and below"
                }
                return null
            },
            aim: value => {
                if (value === "") {
                    return "Enter collective aim"
                }
                else if (value.length > 30) {
                    return "Collective aim should be only 30 characters and below"
                }
                return null
            },
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

    async function registerCollective(data: any) {
        setLoading(true)
        // contract.connect(account)

        const rule_1 = data.rules[0].rule
        const rule_2 = data?.rules.length > 1 ? data.rules[1].rule : "N/A"
        const rule_3 = data?.rules.length > 2 ? data.rules[2].rule : "N/A"

        // const token: string = '0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7'

        const collective_inputs = [
            data.name,
            rule_1, rule_2,
            rule_3,
            BigNumber(data.amt).multipliedBy(10 ** data?.token.decimals).toNumber(),
            BigNumber(data.fine).multipliedBy(10 ** data?.token.decimals).toNumber(),
            data?.token.address,
            data.start_date.getTime(), data.aim,
            data?.token.decimals, data?.token.symbol]
        console.log(collective_inputs)
        if (contract) {
            const myCall = contract.populate('register_collective', collective_inputs)
            console.log(myCall.calldata)
            contract.register_collective(myCall.calldata).then(() => {
                showNotification({
                    title: "Success",
                    message: "You have successfully created a new collective",
                    color: "green",
                    icon: <IconInfoCircle stroke={1.5} />
                })
                form.reset()

            }).catch((_error: any) => {
                console.trace(_error)
                showNotification({
                    title: "Failed!!",
                    message: "Creating a new collective has failed",
                    color: "red",
                    icon: <IconAlertTriangle stroke={1.5} />
                })
                setLoading(false)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    // async function sendSomeFunds() {
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


    const styles = {
        input: {
            borderWidth: "2px"
        }
    }

    const selectToken = (token: Token) => {
        form.setFieldValue('token', token)
    }

    const seTokenPrice = (price: number) => {
        form.setFieldValue('token_price', price)
    }

    // 2 ETH -> 2000000000000000000
    // 0.000002 ETH-> 20000000000000

    const calculateAmt = (value: number) => {
        if (form.values.token_price) {
            const amt = BigNumber(value).multipliedBy(form.values.token_price).toNumber()
            return amt
        }
        return null
    }

    return (
        <Stack>
            <Title order={1} className="custom-title" style={{ textAlign: "center" }}>Register New Collective</Title>
            <form onSubmit={form.onSubmit((_values) => cerateCollective())} style={{ position: "relative" }}>
                <LoadingOverlay visible={loading} />
                <Container maw={600}>
                    <Grid>
                        <Grid.Col span={{ md: 12 }}>
                            <TextInput label={"Collective Name"} radius={'md'} placeholder="STRK Collective" styles={styles} {...form.getInputProps('name')}
                                rightSection={<ColorText theme={theme} len={form.values.name.length} />} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 12 }}>
                            <TextInput label={"Collective Aim"} radius={'md'} placeholder="Buy Land for Each other" styles={styles} {...form.getInputProps('aim')}
                                rightSection={<ColorText theme={theme} len={form.values.aim.length} />} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 12 }}>
                            <Stack>
                                <Text>Rules</Text>
                                {
                                    form.values.rules.map((_rule: any, i: number) => (
                                        <Grid key={`rule_${i}`}>
                                            <Grid.Col span={{ xs: 10 }}>
                                                <TextInput label={`Rule # ${i + 1}.`} radius={'md'} placeholder="Less than 30 characters" styles={styles} {...form.getInputProps(`rules.${i}.rule`)}
                                                    rightSection={<ColorText theme={theme} len={form.values.rules[i].rule.length} />} />
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
                        <Grid.Col span={12}>
                            <Text fw={500} fs={'md'}>Select Token</Text>
                            <SelectTokenModal selectedToken={form.values.token} select={selectToken} seTokenPrice={seTokenPrice} />
                        </Grid.Col>
                        {/* <Grid.Col span={{ md: 4 }}>
                            <TextInput label={"Token"} radius={'md'} placeholder="Token Address: 0x00fdkb..." {...form.getInputProps('token')} styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <NumberInput label={"Token Decimals"} hideControls radius={'md'} placeholder="18" {...form.getInputProps('decimals')} styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <TextInput label={"Token Symbol"} radius={'md'} placeholder="Token Symbol: ETH" {...form.getInputProps('symbol')} styles={styles} />
                        </Grid.Col> */}
                        <Grid.Col span={{ md: 6 }}>
                            <NumberInput label={`Amount / cycle ≈ $${formatNumberInternational(calculateAmt(form.values.amt) ?? 0)}`} hideControls radius={'md'} placeholder="200 STRK" {...form.getInputProps('amt')} styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <NumberInput label={`Fine / cycle≈ $${formatNumberInternational(calculateAmt(form.values.fine) ?? 0)}`} hideControls radius={'md'} placeholder="20 STRK" {...form.getInputProps('fine')} styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <DateTimePicker label={"Start Date"} radius={'md'} minDate={new Date()} placeholder="Start Date" {...form.getInputProps('start_date')} clearable styles={styles} />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Group justify="center" py="lg">
                                <Button leftSection={<IconPlus stroke={1.5} />} type="submit" size="lg" variant="outline" radius={"xl"}>Create Collective</Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Container>
            </form>
        </Stack>
    )
}

export default CreateCollective