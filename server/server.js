import config from "../config/config"
import app from "./express"

app.listen(config.port, (err) => {
    if (err) {
        console.error(err)
    }
    console.info("Server start at port %s.", config.port)
})
