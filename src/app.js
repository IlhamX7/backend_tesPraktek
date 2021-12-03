const express = require("express");
require("./db/mongo");
const app = express();
const port = process.env.PORT || 5000;
const apiRouter = require("./routers/api");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "Welcome To Backend Tes Praktek",
  });
});

app.use("/api", apiRouter);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});