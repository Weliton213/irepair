import { Router } from "express"

import {
  create,
  list,
  findById,
  update,
  remove,
} from "../controllers/ServiceOrderController"

import { authMiddleware } from "../middlewares/authMiddleware"

const serviceOrderRoutes = Router()

serviceOrderRoutes.use(authMiddleware)

serviceOrderRoutes.post("/", create)
serviceOrderRoutes.get("/", list)
serviceOrderRoutes.get("/:id", findById)
serviceOrderRoutes.put("/:id", update)
serviceOrderRoutes.delete("/:id", remove)

export default serviceOrderRoutes