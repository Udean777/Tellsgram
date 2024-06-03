import { useAuth } from "@/src/providers/AuthProvider";
import CallProvider from "@/src/providers/CallProvider";
import ChatProvider from "@/src/providers/ChatProvider";
import VideoProvider from "@/src/providers/VideoProvider";
import { Redirect, Stack } from "expo-router";


export default function HomeLayout() {
    const { user } = useAuth()

    if (!user) {
        return <Redirect href={"/(auth)/login"} />
    }

    return (
        <ChatProvider>
            <VideoProvider>
                <CallProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </CallProvider>
            </VideoProvider>
        </ChatProvider>
    )
}