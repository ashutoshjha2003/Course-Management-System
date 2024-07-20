import { useContext } from "react"
import { AuthContext } from "../Utilities/Providers/AuthProvider"

const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export default useAuth