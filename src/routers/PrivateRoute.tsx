import { useAppSelector } from '@/app/hook'
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: any }) => {
	// Get Authenticated here
	const isAuthenticated = useAppSelector((state) => state.authSlice.user)

	return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute
