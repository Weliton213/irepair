import { Router } from "express"

import {
  create,
  list,
  findById,
  update,
  remove,
} from "../controllers/DeviceController"

import { authMiddleware } from "../middlewares/authMiddleware"

const deviceRoutes = Router()

deviceRoutes.use(authMiddleware)

deviceRoutes.post("/", create)
deviceRoutes.get("/", list)
deviceRoutes.get("/:id", findById)
deviceRoutes.put("/:id", update)
deviceRoutes.delete("/:id", remove)

export default deviceRoutes