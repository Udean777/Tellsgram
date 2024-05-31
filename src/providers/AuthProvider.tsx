import { Session, User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type AuthContextType = {
    session: Session | null,
    user: User | any,
    profile: any
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    profile: null
})

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<any>()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    useEffect(() => {
        if (!session?.user) {
            setProfile(null)
            return
        }

        const fetchProfile = async () => {
            let { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .single()

            setProfile(data)
        }

        // console.log(profile)

        fetchProfile()
    }, [session?.user])

    return (
        <AuthContext.Provider value={{ session, user: session?.user, profile }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)