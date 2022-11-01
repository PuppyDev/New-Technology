import { useAppSelector } from '@/app/hook'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: any }) => {
	// Get Authenticated here
	const isAuthenticated = useAppSelector((state) => state.authSlice.user) || localStorage.getItem('loginData')

	return true ? children : <Navigate to="/login" />
}

export default PrivateRoute
