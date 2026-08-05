import React, { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../supabaseConfig'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchRole = async (userId) => {
        if (!userId) {
            setRole(null)
            return
        }
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single()

        if (error) {
            console.log('Error fetching role:', error)
            setRole('user')
        } else if (data) {
            setRole(data.role)
        }
    }

    useEffect(() => {
        const initSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            const currentUser = session?.user ?? null
            setUser(currentUser)
            if (currentUser) {
                await fetchRole(currentUser.id)
            }
            setLoading(false)
        }

        initSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)
            if (currentUser) {
                await fetchRole(currentUser.id)
            } else {
                setRole(null)
            }
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw error
        return data
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.log('Signout error:', error)
        setUser(null)
        setRole(null)
    }

    const isAdmin = role === 'admin'

    return (
        <AuthContext.Provider value={{ user, role, isAdmin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
