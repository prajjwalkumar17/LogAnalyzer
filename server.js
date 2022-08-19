/** @format */

const app = require("./app");
const PORT = 3000;
app.listen(PORT, () => {
  console.log(
    `App running on port ${PORT}\nhit me at 👉 http://127.0.0.1:${PORT}/api/v1/\nElse if wanna browse go with 👉 http://127.0.0.1:${PORT}/`
  );
});
