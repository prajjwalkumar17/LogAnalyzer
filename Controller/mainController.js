/** @format */

exports.getallstats = async (req, res) => {
  return res.status(200).render("welcome").json({
    status: "sucess",
    results: "hello baby",
  });
};
