import { View, Text } from 'react-native'
import React from 'react'

const UsersListItem = ({ user }: any) => {
    return (
        <View style={{ padding: 10, backgroundColor: "#fff" }}>
            <Text style={{ fontWeight: "bold" }}>{user.full_name}</Text>
        </View>
    )
}

export default UsersListItem