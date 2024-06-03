import { useCalls } from "@stream-io/video-react-native-sdk";
import { router } from "expo-router";
import { PropsWithChildren, useEffect } from "react";

export default function CallProvider({ children }: PropsWithChildren) {
    const calls = useCalls()
    const call = calls[0]

    useEffect(() => {
        if (!call) {
            return
        }

        router.push(`/call/${call.id}`)

        console.warn("There is an incoming call with id :", call.id)
    }, [call])

    return (
        <>
            {children}
        </>
    )
}