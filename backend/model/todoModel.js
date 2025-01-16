class Todo {
  constructor(tarea, status = "pendiente") {
    this.id = Date.now();
    this.tarea = tarea;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStatus(newStatus) {
    const validStatuses = ["pendiente", "completado"];
    if (validStatuses.includes(newStatus)) {
      this.status = newStatus;
      this.updatedAt = new Date();
    } else {
      throw new Error(
        "Estado inválido. Los estados permitidos son: 'pendiente', 'completado'."
      );
    }
  }

  getDetails() {
    return {
      id: this.id,
      tarea: this.tarea,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Todo;
