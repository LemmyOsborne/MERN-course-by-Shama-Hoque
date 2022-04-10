import config from "../config/config"
import app from "./express"
import mongoose from "mongoose"
import Template from "../template"


app.listen(config.port, (err) => {
    if (err) {
        console.error(err)
    }
    console.info("Server start at port %s.", config.port)
})

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

mongoose.connection.on("error", () => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`)
})

app.get("/", (_, res) => {
    res.status(200).send(Template())
})
