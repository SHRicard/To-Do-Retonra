const Todo = require("../model/todoModel");

const allTodo = [];

const getAllTodo = async (_req, res) => {
  try {
    const todo = allTodo;
    res.status(200).json(todo);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const postTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      tarea: req.body.tarea,
    });
    allTodo.push(newTodo);

    res.status(200).json(newTodo);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;

    const index = allTodo.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Tarea no encontrada." });
    }

    const deletedTodo = allTodo.splice(index, 1);
    res.status(200).json({
      message: "Tarea eliminada con éxito.",
      deletedTodo: deletedTodo[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id, status } = req.body;
    const index = allTodo.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Tarea no encontrada." });
    }

    allTodo[index].status = status;
    res.status(200).json({
      message: "Tarea actualizada con éxito.",
      updatedTodo: allTodo[index],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPendingTodo = async (_req, res) => {
  try {
    const pendingTasks = allTodo.filter((todo) => todo.status === "pendiente");
    res.status(200).json(pendingTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllCompletedTodo = async (_req, res) => {
  try {
    const completedTasks = allTodo.filter(
      (todo) => todo.status === "completado"
    );
    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteAllTodo = async (_req, res) => {
  try {
    allTodo.length = 0;
    res.status(200).json({
      message: "Todas las tareas han sido eliminadas correctamente.",
      todos: allTodo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTodo,
  postTodo,
  deleteTodo,
  updateTodo,
  getAllPendingTodo,
  getAllCompletedTodo,
  deleteAllTodo,
};
