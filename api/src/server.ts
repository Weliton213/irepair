import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes"
import clientRoutes from "./routes/clientRoutes"
import deviceRoutes from "./routes/deviceRoutes"
import serviceOrderRoutes from "./routes/serviceOrderRoutes"

const app = express()

app.get("/teste", (req, res) => {
  return res.send("OK")
})

const PORT = Number(process.env.PORT) || 3333

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use("/auth", authRoutes)
app.use("/clients", clientRoutes)
app.use("/devices", deviceRoutes)
app.use("/service-orders", serviceOrderRoutes)

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API iRepair funcionando!",
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})