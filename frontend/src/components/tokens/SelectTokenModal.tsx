import { useEffect, useMemo, useState } from 'react';

import { Modal, Box, Group, Title, ActionIcon, TextInput, Paper, Avatar, Stack, Text, ScrollArea, useMantineColorScheme, Grid } from "@mantine/core"


import { IconX } from "@tabler/icons-react"
import { Carousel } from "@mantine/carousel"
import TOKENS, { Token } from '../../configs/tokens';
import { formatNumberInternational, getRealPrice, isDarkMode } from '../../configs/utils';
import { useDisclosure } from '@mantine/hooks';
import { CairoCustomEnum } from 'starknet';
import { useAppContext } from '../../providers/AppProvider';

interface ISelectTokenModal {
    select: any
    selectedToken: any
    seTokenPrice: any
}

const SelectTokenModal = ({ select, selectedToken, seTokenPrice }: ISelectTokenModal) => {

    const [opened, { open, close }] = useDisclosure(false);
    const tokens = TOKENS

    const [searchedToken, setSearchedToken] = useState("")


    const filterTokens = () => {
        const filteredTokens = tokens?.filter(token => {
            const regex = new RegExp(searchedToken, 'gi');
            return token.symbol.match(regex) || token.name.match(regex) || token.address.match(regex)
        })
        return filteredTokens
    }

    const selectSingle = (token: Token) => {
        select(token);
        close()
    }

    return (
        <>
            <SelectAsset key={'main_asset'} select={() => open()} asset={selectedToken} selectedToken={selectedToken} seTokenPrice_={seTokenPrice} />
            <Modal
                lockScroll
                opened={opened}
                styles={{
                    header: {
                        width: '100%'
                    },
                    title: {
                        width: '100%'
                    }
                }}
                withCloseButton={false}
                size={'md'}
                onClose={() => close()}
                padding={0}
                radius="lg"
                title={(<Box >
                    <Group p={'md'} justify='space-between' align='center' className='w-100'>
                        <Title order={2} fw={500}>Select Token</Title>
                        <ActionIcon variant='light' onClick={close}>
                            <IconX />
                        </ActionIcon>
                    </Group>
                    <Box px="md" style={{ background: "rd" }}>
                        <TextInput value={searchedToken} onChange={e => setSearchedToken(e.target.value)}
                            size='md' radius="lg"
                            placeholder="Search name, symbol or paste address"
                            className='w-100' mb="md"
                            styles={{
                                input: {
                                    borderWidth: '2px'
                                }
                            }}
                            style={theme => ({
                                ".mantine-TextInput-input": {
                                    borderWidth: "2px !important",
                                    borderColor: theme.colors.blue[6],
                                }
                            })} />
                        <Title order={5} mb="xs">Common tokens</Title>
                        <Carousel slideGap={10} align="start" slideSize={'120px'} px={'50px'}>
                            {
                                tokens?.slice(0, 3).map((item, i) => (
                                    <Carousel.Slide key={`token_s_${i}`} w={120}>
                                        <SelectAssetBtn asset={item} select={selectSingle} selectedToken={selectedToken} seTokenPrice_={seTokenPrice} />
                                    </Carousel.Slide>
                                ))
                            }
                        </Carousel>
                    </Box>
                </Box>)}>
                <Box h={'400px'}>
                    <ScrollArea className='h-100'>
                        <Stack p="xs" gap={0}>
                            {
                                filterTokens()?.map((item, i) => (
                                    <SelectAsset key={`dfd_${i}`} asset={item} select={selectSingle} selectedToken={selectedToken} seTokenPrice_={seTokenPrice} />
                                ))
                            }
                        </Stack>
                    </ScrollArea>
                </Box>
            </Modal>
        </>
    )
}


interface ISelectAsset {
    asset: any
    select: any
    selectedToken?: Token
    seTokenPrice_: any
}

const SelectAsset = ({ asset, select, selectedToken, seTokenPrice_ }: ISelectAsset) => {
    const { colorScheme } = useMantineColorScheme()
    const { pragma_contract } = useAppContext()

    const [tokenPrice, setTokenPrice] = useState<null | any>(null)

    const getTokenPrice = async () => {
        if (pragma_contract) {
            const SPOTENTRY_ENUM = new CairoCustomEnum({
                SpotEntry: asset?.pair_id
            })
            const res = await pragma_contract.get_data_median(SPOTENTRY_ENUM)
            const price = getRealPrice(res)
            setTokenPrice(price?.price)
        }
    }

    const selectToken = () => {
        seTokenPrice_(tokenPrice)
        select(asset)
    }

    const has_changed = useMemo(() => ({
        pragma_contract, selectedToken
    }), [pragma_contract, selectedToken])

    useEffect(() => {
        getTokenPrice()
    }, [has_changed])

    return (
        <Paper py={'xs'} radius={'md'} px="md" style={theme => ({
            background: selectedToken?.address === asset?.address ? isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[1] : "transparent",
            cursor: "pointer",
            // pointerEvents: selectedToken?.address === asset?.address ? "none" : "all",
            // background: isDarkMode(colorScheme) ? theme.colors.dark[4] : theme.colors.gray[1],
        })} onClick={() => selectToken()}>
            <Group justify='space-between' align='center'>
                <Group align='center'>
                    <Avatar size="sm" src={asset?.icon} variant='light' color='pink' />
                    <Stack gap={-10}>
                        <Text size="md"><b>{asset?.symbol}</b></Text>
                        <Text size="sm" fw={400}>{asset?.name}</Text>
                    </Stack>
                </Group>
                <Text size='sm' fw={500}>
                    {/* {loading ? <Loader size={'xs'} /> : null} {' '}  */}
                    ${formatNumberInternational(tokenPrice)}
                </Text>
            </Group>
        </Paper>
    )
}

const SelectAssetBtn = ({ asset, select, selectedToken }: ISelectAsset) => {
    const { colorScheme } = useMantineColorScheme()
    const { pragma_contract } = useAppContext()

    const [tokenPrice, setTokenPrice] = useState<null | any>(null)
    const [_loading, setLoading] = useState(false)

    const getTokenPrice = async () => {
        setLoading(true)
        if (pragma_contract) {
            const SPOTENTRY_ENUM = new CairoCustomEnum({
                SpotEntry: asset?.pair_id
            })
            const res = await pragma_contract.get_data_median(SPOTENTRY_ENUM)
            const price = getRealPrice(res)
            setTokenPrice(price?.price)
        }
        setLoading(false)
    }
    const selectToken = () => {
        setTokenPrice(tokenPrice)
        select(asset)
    }

    useEffect(() => {
        getTokenPrice()
    }, [pragma_contract, selectedToken])
    return (
        <Paper style={theme => ({
            background: selectedToken?.address === asset?.address ? isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[1] : "transparent",
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "10px",
            borderColor: isDarkMode(colorScheme) ? theme.colors.dark[4] : theme.colors.gray[4],
            pointerEvents: selectedToken?.address === asset?.address ? "none" : "all",
            padding: "4px 6px",
            cursor: "pointer"
        })} onClick={() => selectToken()}>
            <Group gap={10}>
                <Avatar size="sm" src={asset?.icon} />
                <Text size="sm" fw={500}>{asset?.symbol}</Text>
            </Group>
        </Paper>
    )
}

export const AssetPreview = () => {
    const{colorScheme} = useMantineColorScheme()
    return (
        <>
        <Title order={2} size={'42px'} fw={500} mb={'lg'}>Pool in a number of Assets</Title>
            <Grid>
                {TOKENS?.map((item, i) => (
                    <Grid.Col span={{ md: 4 }} key={`dfd_asset_${i}`}>
                        <Paper radius={'lg'} style={theme => ({
                            background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[1],
                            borderWidth: '4px',
                            borderStyle: "groove",
                            borderColor: theme.colors.pink[6]
                        })}>
                            <SelectAsset asset={item} select={() => { }} selectedToken={TOKENS[0]} seTokenPrice_={() => { }} />
                        </Paper>
                    </Grid.Col>
                ))
                }
            </Grid>
        </>
    )
}

export default SelectTokenModal

