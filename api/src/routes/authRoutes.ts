import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { 
    register,
    login,
    logout,
    me,
} from "../controllers/AuthController"

const authRoutes = Router()

authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.post("/logout", logout)

authRoutes.get("/me", authMiddleware, me)

export default authRoutes