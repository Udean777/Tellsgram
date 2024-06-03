import { Ionicons } from "@expo/vector-icons";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel as ChannelType } from "stream-chat";
import { Channel, MessageInput, MessageList, useChatContext } from "stream-chat-expo";
import * as Crypto from "expo-crypto"

export default function ChannelScreen() {
    const [channel, setChannel] = useState<any>()
    const { cid } = useLocalSearchParams<{ cid: string }>()

    const { client } = useChatContext()
    const videoClient = useStreamVideoClient()

    useEffect(() => {
        async function fetchChannel() {
            const res = await client.queryChannels({ cid })
            setChannel(res[0])
        }

        fetchChannel()
    }, [cid])

    if (!channel) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }

    async function joinCall() {
        const members = Object.values(channel.state.members).map((member: any) => ({
            user_id: member.user_id
        }))

        const call: any = videoClient?.call("default", Crypto.randomUUID())
        await call?.getOrCreate({
            data: {
                members
            }
        })

        router.push(`/call/${call.id}`)
    }

    return (
        <Channel channel={channel} audioRecordingEnabled>
            <Stack.Screen options={{
                headerRight: () => (
                    <Ionicons name="call" size={22} color={"#333"} onPress={joinCall} />
                ),
                headerTitle: "Chat",
                headerTitleAlign: "center"
            }} />
            <MessageList />
            <SafeAreaView edges={["bottom"]}>
                <MessageInput />
            </SafeAreaView>
        </Channel>
    )
}