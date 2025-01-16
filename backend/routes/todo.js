var {
  getAllTodo,
  postTodo,
  deleteTodo,
  updateTodo,
  getAllPendingTodo,
  getAllCompletedTodo,
  deleteAllTodo,
} = require("../controllers/todoControllers");
var express = require("express");
var router = express.Router();

router.get("/", getAllTodo);
router.post("/post", postTodo);
router.delete("/delete", deleteTodo);
router.put("/update", updateTodo);
router.get("/pending", getAllPendingTodo);
router.get("/completed", getAllCompletedTodo);
router.delete("/allDelete", deleteAllTodo);

module.exports = router;
