import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import express from "express"
import helmet from "helmet"
import cors from "cors"
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth,routes"


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.use(cors())

app.use("/", userRoutes)
app.use("/", authRoutes)

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.error(err)
    }
})

export default app