import { Router } from "express"

import {
  create,
  list,
  findById,
  update,
  remove,
} from "../controllers/ClientController"

import { authMiddleware } from "../middlewares/authMiddleware"

const clientRoutes = Router()

clientRoutes.use(authMiddleware)

clientRoutes.post("/", create)
clientRoutes.get("/", list)
clientRoutes.get("/:id", findById)
clientRoutes.put("/:id", update)
clientRoutes.delete("/:id", remove)

export default clientRoutes