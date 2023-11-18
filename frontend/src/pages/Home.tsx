import { Box, Breadcrumbs, Button, Card, Center, Grid, Image, Stack, Text, Title, useMantineColorScheme } from "@mantine/core"
import { isDarkMode } from "../configs/utils"
import { useAppContext } from "../providers/AppProvider"


const Home = () => {
    const { colorScheme } = useMantineColorScheme()
    const { isSmallScreen } = useAppContext()
    const textSize = isSmallScreen ? "22px" : "32px"

    return (
        <>
            <Stack px={0}>
                <Card py={80} radius={'lg'} className="home-card" style={theme => ({
                    background: isDarkMode(colorScheme) ? theme.colors.dark[5] : theme.colors.gray[2]
                })}>
                    <Grid>
                        <Grid.Col span={{ md: 6 }}>
                            <Stack style={{ height: "400px" }} justify="center">
                                <Title order={1} size={isSmallScreen ? 52 : 62} className="custom-title" style={{
                                    fontWeight: 600
                                }}> CycleStark</Title>
                                <Title order={2} size={32} className="custom-title" style={{
                                    fontWeight: 600
                                }}>Empowering Heroes on Starknet for Collective Funding</Title>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <Image src={'/images/mgr.svg'} />
                        </Grid.Col>
                    </Grid>
                </Card>
                <Box py={50}>
                    <Grid>
                        <Grid.Col span={{ md: 6 }}>
                            <Card>
                                <Center>
                                    <Image src={'/images/glassy-pie.png'} maw={"70%"} />
                                </Center>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <Stack className="h-100" justify="center">
                                <Title>About</Title>
                                <Text>
                                    Welcome to CycleStark, where heroes unite to fuel change!
                                    <br />
                                    <br />
                                    Powered by Starknet's Layer 2 solution on Ethereum, CycleStark is a revolutionary platform enabling a cyclical
                                    funding ecosystem for collective support and empowerment.
                                    <br />
                                    <br />
                                    Embrace the power of decentralized funding and join a
                                    community dedicated to collective growth and support.
                                </Text>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Box>

                <Box py={50}>
                    <Grid>
                        <Grid.Col span={{ md: 7 }}>
                            <Stack className="h-100" justify="center">
                                <Title>How It Works</Title>
                                <Text>
                                    At CycleStark, heroes come together to create collectives and start funding cycles on a regular basis. Each cycle involves heroes funding each other within a defined period, utilizing Starknet's Layer 2 for seamless, efficient transactions.
                                    <br />
                                    <br />
                                    As a hero, you'll contribute to the collective and receive support from others, fostering a cycle of empowerment and solidarity.
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ md: 5 }}>
                            <Card>
                                <Center>
                                    <Image src={'/images/gif1.gif'} maw={"70%"} />
                                </Center>
                            </Card>
                        </Grid.Col>
                    </Grid>
                    <Box mt="xl">
                        <Breadcrumbs separator={<Image src={'/images/arrow.png'} maw={'40px'} />} style={{ flexWrap: "wrap" }} separatorMargin={"lg"}>
                            <Box className={`custom-box ${isDarkMode(colorScheme) ? '' : 'clip-text'}`} p={20} mb={'md'}>
                                <Text size={textSize}>Create Collective</Text>
                            </Box>
                            <Box className={`custom-box ${isDarkMode(colorScheme) ? '' : 'clip-text'}`} p={20} mb={'md'}>
                                <Text size={textSize}>Heroes Join</Text>
                            </Box>
                            <Box className={`custom-box ${isDarkMode(colorScheme) ? '' : 'clip-text'}`} p={20} mb={'md'}>
                                <Text size={textSize}>Lock Starks</Text>
                            </Box>
                            <Box className={`custom-box ${isDarkMode(colorScheme) ? '' : 'clip-text'}`} p={20} mb={'md'}>
                                <Text size={textSize}>Start Cyles</Text>
                            </Box>
                            <Box className={`custom-box ${isDarkMode(colorScheme) ? '' : 'clip-text'}`} p={20} mb={'md'}>
                                <Text size={textSize}>Finish Cyles</Text>
                            </Box>
                            <Box className={`custom-box ${isDarkMode(colorScheme) ? '' : 'clip-text'}`} p={20} mb={'md'}>
                                <Text size={textSize} style={{ wordWrap: "break-word" }}>Withdraw Locked Starks</Text>
                            </Box>
                        </Breadcrumbs>
                    </Box>
                </Box>

                <Box py={50}>
                    <Grid>
                        <Grid.Col span={{ md: 6 }}>
                            <Image src={'/images/onchain.png'} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <Stack className="h-100" justify="center">
                                <Title>Benefits for Heroes</Title>
                                <Text>
                                    Joining CycleStark as a hero brings a myriad of benefits. Experience decentralized funding, where collectives support each other, fostering financial inclusion and community empowerment.
                                    <br />
                                    <br />
                                    Participate in a dynamic system that fosters collaboration, mutual aid, and the opportunity to make a significant impact through collective efforts.
                                </Text>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Box>

                <Box py={70}>
                    <Grid>
                        <Grid.Col span={{ md: 6 }}>
                            <Stack className="h-100" justify="center">
                                <Title>Starknet Integration</Title>
                                <Text>
                                    At CycleStark, we leverage Starknet's Layer 2 solution for Ethereum, ensuring a smooth and cost-effective experience.
                                    <br />
                                    <br />
                                    Enjoy reduced gas fees, scalability, and faster transactions, enabling a seamless funding cycle.
                                    <br />
                                    <br />
                                    Starknet's integration guarantees a user-friendly and efficient platform, allowing heroes to focus on supporting each other without worrying about high transaction costs.
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <Stack className="h-100" justify="center">
                                <Image src={'/images/starknetlogo.webp'} width={"70%"} />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Box>

                <Box py={50}>
                    <Grid>
                        <Grid.Col span={{ md: 6 }}>
                            <Card>
                                <Center>
                                    <Image src={'/images/blocks1.png'} maw={"70%"} />
                                </Center>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <Stack className="h-100" justify="center">
                                <Title>Security & Trust</Title>
                                <Text>
                                    Security is paramount at CycleStark. We prioritize the integrity of your data and transactions.
                                    <br />
                                    <br />
                                    With robust security measures in place, your information is safeguarded, and each transaction is secure.
                                    <br />
                                    <br />
                                    Trust in our platform's reliability and transparency as you engage in the funding cycles and community activities.
                                </Text>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Box>

                <Box py={50}>
                    <Grid>
                        <Grid.Col span={{ md: 6 }}>
                            <Stack className="h-100" justify="center">
                                <Title>Community Engagement</Title>
                                <Text>
                                    CycleStark is not just a platform; it's a thriving community. Engage with fellow heroes, collaborate, and share experiences in a vibrant and supportive environment.
                                    <br />
                                    <br />
                                    Embrace the power of community-driven change, where collective efforts lead to shared growth and opportunities
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <Card>
                                <Center>
                                    <Image src={'/images/community.png'} maw={"70%"} />
                                </Center>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Box>

                <Box py={100}>
                    <Title style={{ textAlign: "center" }} size={"100px"} className="custom-title">Get Started </Title>
                    <Text style={{ textAlign: "center" }} maw={800} mx={"auto"}>
                        Ready to join the cycle? Become a hero today and embark on a journey of collective empowerment. Register now and start funding and receiving support within our cyclical ecosystem. Take the first step towards making a meaningful impact!
                    </Text>
                    <Center py={30}>
                        <Button size="lg" radius={"lg"}>
                            Register Today!
                        </Button>
                    </Center>
                </Box>
            </Stack>
        </>
    )
}

export default Home