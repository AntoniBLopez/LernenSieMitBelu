import express from "express"
import morgan from "morgan"
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static("public"))
app.use(morgan("dev"))

app.get("/", function (req: any, res: any) {
  res.send("Hello World!")
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})