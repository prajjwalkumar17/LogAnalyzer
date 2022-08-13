/** @format */
const catchAsync = require("./../Utils/catchAsync");
exports.postfile = catchAsync(async (req, res) => {
  const email = req.body.Email;
  const name = req.body.name;
  console.log(email);
  console.log(name);
  return res.status(200).json({
    status: "sucess",
    results: "hello baby",
  });
});
