import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const AdminRoute = () => {
  const { user } = useContext(AuthContext)

  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />
}

export default AdminRoute

