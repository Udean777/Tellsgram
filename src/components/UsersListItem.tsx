import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useChatContext } from 'stream-chat-expo'
import { useAuth } from '../providers/AuthProvider'
import { router } from 'expo-router'

const UsersListItem = ({ user }: any) => {
    const { client } = useChatContext()
    const { user: me } = useAuth()

    async function onPress() {
        const channel = client.channel("messaging", {
            members: [me.id, user.id]
        })

        await channel.watch()

        router.replace(`/(home)/channel/${channel.cid}`)
    }

    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 10, backgroundColor: "#fff" }}>
            <Text style={{ fontWeight: "bold" }}>{user.full_name}</Text>
        </TouchableOpacity>
    )
}

export default UsersListItem