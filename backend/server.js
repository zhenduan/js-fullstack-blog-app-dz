import express from "express";
const app = express();
const PORT = 5050;

console.log(333);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
