
import { useForm } from "@mantine/form";
import { db } from "../../configs/firebase";
import {
    addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, limit,
} from "firebase/firestore";
import { ActionIcon, Avatar, Box, CopyButton, Grid, Group, ScrollArea, Stack, Text, Textarea, Tooltip, useMantineColorScheme } from "@mantine/core";
import { getTwoAddressLetters, isDarkMode } from "../../configs/utils";
import { useAppContext } from "../../providers/AppProvider";
import { IconSend } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { getHotkeyHandler } from "@mantine/hooks";


const Message = (props: any) => {
    const { text, sender, createdAt } = props
    const { address } = useAppContext()
    const isMsgFromThisAddress = address === sender
    const borderRadius = "20px"

    return (
        <Box mb={"xs"}>
            <Group align="start" className="w-100" gap={'sm'}>
                {
                    isMsgFromThisAddress ? null : (
                        <CopyButton value={sender}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copied' : 'Copy'}>
                                    <Avatar variant="filled" color={copied? "indigo.5" : "indigo.7"} tt={'uppercase'} onClick={copy} style={{cursor: "pointer"}}>
                                        {getTwoAddressLetters(sender)}
                                    </Avatar>
                                </Tooltip>
                            )}
                        </CopyButton>
                    )
                }
                <Box maw={"70%"} pt="lg" px={"lg"} pb={'sm'} style={theme => ({
                    background: isMsgFromThisAddress ? theme.colors.grape[6] : theme.colors.indigo[6],
                    color: "white",
                    marginRight: isMsgFromThisAddress ? 0 : 'auto',
                    marginLeft: isMsgFromThisAddress ? 'auto' : '0',
                    width: "fit-content",
                    borderTopLeftRadius: isMsgFromThisAddress ? borderRadius : borderRadius,
                    borderTopRightRadius: isMsgFromThisAddress ? borderRadius : borderRadius,
                    borderBottomLeftRadius: isMsgFromThisAddress ? borderRadius : 0,
                    borderBottomRightRadius: isMsgFromThisAddress ? 0 : borderRadius,
                })}>
                    <Group align="start">
                        <Text style={{
                            whiteSpace: "pre-wrap",
                            lineHeight: '1.2rem',
                        }}>{text ?? ""}</Text>
                    </Group>
                    <Text size="xs" w={"fit-content"} ml={"auto"}>
                        {/* {createdAt?.toDate().toDateString() ?? ""} {" "} */}
                        {createdAt?.toDate().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }) ?? "Now"}
                    </Text>
                </Box>
            </Group>
        </Box>
    )

}

interface IChat {
    collectiveID: any,
    isForCollective: boolean
}

const ChatBox = (props: IChat) => {
    const { collectiveID } = props
    const [messages, setMessages] = useState<null | any>([])
    const { colorScheme } = useMantineColorScheme()
    const { address } = useAppContext()

    const scroll: any = useRef();

    const form = useForm({
        initialValues: {
            msg: ""
        },
        validate: {
            msg: value => value === "" ? "Message is required" : null
        }
    })

    const sendMessage = async () => {
        let message = form.values.msg
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }
        await addDoc(collection(db, `collectives/${collectiveID}/messages`), {
            text: message,
            sender: address,
            createdAt: serverTimestamp(),
        });
        form.reset()
        scroll?.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const q = query(
            collection(db, `collectives/${collectiveID}/messages`),
            orderBy("createdAt"),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const groupedMessages: { date: string; messages: any[] }[] = [];
            QuerySnapshot.forEach((doc) => {
                const message: any = { ...doc.data(), id: doc.id };
                const messageDate = message?.createdAt?.toDate().toDateString();
                const groupIndex = groupedMessages.findIndex(group => group.date === messageDate);

                if (groupIndex !== -1) {
                    groupedMessages[groupIndex].messages.push(message);
                } else {
                    groupedMessages.push({ date: messageDate, messages: [message] });
                }
            });
            setMessages(groupedMessages);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        scroll?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <Box style={{
            height: "480px"
        }}>

            <Box style={{ height: "85%" }}>
                <ScrollArea className="h-100">
                    <Box px={'sm'}>
                        {
                            messages?.map((msggrp: any, i: any) => (
                                <Box key={`msg_${i}_${msggrp?.date}`}>
                                    <Text ta={'center'} mt="md" w="fit-content" px="md" mx="auto" mb="xs" style={theme => ({
                                        background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[0],
                                        borderRadius: theme.radius.md
                                    })} size="sm" p={2}>{msggrp?.date}</Text>
                                    {
                                        msggrp.messages.map((msg: any, i: any) => (
                                            <Message key={`msg_${i}_${msg?.id}`} {...msg} />
                                        ))
                                    }
                                </Box>
                            ))
                        }
                    </Box>
                    <span ref={scroll}></span>
                </ScrollArea>
            </Box>
            <Box px={'lg'} style={theme => ({
                height: "15%",
                background: isDarkMode(colorScheme) ? theme.colors.dark[4] : theme.colors.gray[1],
                borderRadius: theme.radius.lg
            })}>
                <Stack className="h-100 w-100" justify="center">
                    <form onSubmit={form.onSubmit(_values => sendMessage())}>
                        <Grid>
                            <Grid.Col span={10}>
                                <Textarea placeholder="Type here" autosize maxRows={2} radius={'lg'} size="md" {...form.getInputProps('msg')} onKeyDown={getHotkeyHandler([
                                    ['Enter', sendMessage],
                                    // ['mod+S', handleSave],
                                ])} />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Stack className="h-100" justify="center" align="center">
                                    <ActionIcon mb={0} variant="light" size={'xl'} radius={'xl'} type="submit">
                                        <IconSend stroke={1.5} />
                                    </ActionIcon>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </form>
                </Stack>
            </Box>
        </Box>
    )
}

export default ChatBox
