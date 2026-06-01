import { createContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/authService.js";

const AuthContext = createContext();

const getStored = () => ({
	token: localStorage.getItem("token"),
	role: localStorage.getItem("role"),
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: null
});

const AuthProvider = ({ children }) => {
	const [state, setState] = useState(() => ({
		...getStored(),
		loading: false,
		error: null
	}));

	const setSession = (data) => {
		const session = {
			token: data.token,
			role: data.role,
			user: data
		};

		localStorage.setItem("token", session.token || "");
		localStorage.setItem("role", session.role || "");
		localStorage.setItem("user", JSON.stringify(session.user || {}));

		setState((prev) => ({
			...prev,
			...session,
			error: null
		}));
	};

	const clearSession = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		localStorage.removeItem("user");
		setState((prev) => ({
			...prev,
			token: null,
			role: null,
			user: null
		}));
	};

	const login = async (payload) => {
		setState((prev) => ({ ...prev, loading: true }));
		try {
			const data = await authService.login(payload);
			setSession(data);
			return data;
		} catch (error) {
			setState((prev) => ({
				...prev,
				error: error.message
			}));
			throw error;
		} finally {
			setState((prev) => ({ ...prev, loading: false }));
		}
	};

	const register = async (payload) => {
		setState((prev) => ({ ...prev, loading: true }));
		try {
			const data = await authService.register(payload);
			if (data.token) {
				setSession(data);
			}
			return data;
		} catch (error) {
			setState((prev) => ({
				...prev,
				error: error.message
			}));
			throw error;
		} finally {
			setState((prev) => ({ ...prev, loading: false }));
		}
	};

	const logout = () => {
		clearSession();
	};

	const refreshProfile = async () => {
		if (!state.token) {
			return;
		}

		try {
			const profile = await authService.getProfile(state.token);
			setSession({
				...profile,
				token: state.token,
				role: profile.role
			});
		} catch (error) {
			clearSession();
		}
	};

	useEffect(() => {
		if (state.token && !state.user) {
			refreshProfile();
		}
	}, []);

	const value = useMemo(
		() => ({
			...state,
			login,
			register,
			logout,
			refreshProfile
		}),
		[state]
	);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
