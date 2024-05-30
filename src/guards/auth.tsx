import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../stores/auth"

export default function AuthGuard () {
  const isAuth = useAuthStore(state => state.isAuth)

  return isAuth ? <Outlet /> : <Navigate to='/login' />
}