import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState(null)
	const [error, setError] = useState(null)

	const router = useRouter()

	// useEffect(() => checkUserLoggedIn(), [])

	// if user is logged in
	// const checkUserLoggedIn = async () => {
	// 	const res = await fetch(`${process.env.NEXT_URL}/api/user`)
	// 	const data = await res.json()

	// 	if (res.ok) {
	// 		setUser(data.user)
	// 	} else {
	// 		setUser(null)
	// 	}
	// }

	// LOGIN
	const login = async (ctx) => {

		const res = await fetch(`${process.env.NEXT_URL}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			})
		})

		const data = await res.json()

		if (res.ok) {
			// setUser(data.user)
			router.replace('/dashboard')
		} else {
			setError(data.data.msg)
			setError(null)
		}
	}

	// LOGOUT
	const logout = async () => {
		const res = await fetch(`${process.env.NEXT_URL}/api/auth/logout`, {
			method: 'POST',
		})

		if (res.ok) {
			setUser(null)
			router.replace('/')
		}
	}

	return (
		<AuthContext.Provider value={{ user, error, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext