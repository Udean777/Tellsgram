import UsersListItem from "@/src/components/UsersListItem";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

export default function UsersScreen() {
    const [users, setUsers] = useState<any[] | null>([])
    const { user } = useAuth()

    useEffect(() => {
        const fetchUsers = async () => {
            let { data: profiles, error } = await supabase
                .from("profiles")
                .select("*")
                .neq("id", user.id) // Fetching everyone except me

            setUsers(profiles)
        }

        fetchUsers()
    }, [])

    return (
        <FlatList
            contentContainerStyle={{ gap: 5 }}
            data={users}
            renderItem={({ item }) => <UsersListItem user={item} />}
        />
    )
}