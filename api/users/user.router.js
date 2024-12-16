const router = require("express").Router();
const { checkToken } = require("../../auth/validate");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.post("/", createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/:id", checkToken, deleteUser);
router.get('/', (req, res) => {
    res.send('User route works!');
});
module.exports = router;
