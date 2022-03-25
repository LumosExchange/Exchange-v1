import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const useAuth = () => {
	const loginToken = localStorage.getItem("token");
	if (loginToken) {
		return true;
	} else {
		return false;
	}
};

const ProtectedRoutes = () => {
	const auth = useAuth();
	return auth ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoutes;