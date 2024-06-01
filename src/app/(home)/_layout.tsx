import { useAuth } from "@/src/providers/AuthProvider";
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
                <Stack>
                    <Stack.Screen name="call/index" options={{ headerShown: true }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </VideoProvider>
        </ChatProvider>
    )
}