import { authApi } from '@/api/authApi'
import { UserProfile } from '@/models/user'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginPayload } from './../../models/auth'

const KEY = 'Auth'
export interface AuthState {
	isLoading: boolean
	isLogin: boolean
	user: UserProfile | null
	openModalInstant: boolean
	isFetchUserComplete: boolean
	isDisabled: boolean
}

const initialState: AuthState = {
	isLoading: false,
	isLogin: false,
	user: null,
	openModalInstant: false,
	isFetchUserComplete: false,
	isDisabled: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<boolean>) => {
			state.isLogin = action.payload
		},
		setUser: (state, action: PayloadAction<UserProfile>) => {
			state.user = action.payload
		},
		setDisableUser: (state, action: PayloadAction<boolean>) => {
			state.isDisabled = action.payload
		},
		logout: (state) => {
			localStorage.removeItem('loginData')
			state.user = null
		},
	},
	extraReducers: (builder) => {},
})

export const { setLogin, setUser, setDisableUser, logout } = authSlice.actions

export default authSlice.reducer
