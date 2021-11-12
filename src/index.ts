import express from "express";

import usersRoute from "./routes/UsersRoute";

const app = express()
const port = process.env.PORT || 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(usersRoute) 

app.listen(port, () => {
  console.log(`Application listening in http://localhost:${port}`)
})