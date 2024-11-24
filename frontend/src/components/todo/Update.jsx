import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import notify from "../../../UI/Notify/Notify";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";

const Update = ({ updateModal, id }) => {
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the task data for updating
  const fetchTask = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const { data } = await axios.get(`http://localhost:5000/api/${id}`);
      setTask(data.list || {});
    } catch (error) {
      notify("error", "Failed to fetch task details");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  // Handle input changes
  const handleChange = ({ target: { name, value, type, checked } }) => {
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update task handler
  const handleUpdate = async () => {
    if (!task.title) {
      notify("error", "Title cannot be empty");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/updateTask/${id}`, task);
      updateModal("none");
      notify("success", "Task updated successfully!");
    } catch (error) {
      notify("error", "Failed to update task");
    }
  };

  if (isLoading || !task) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update Your Task</h3>
      <Input
        type="text"
        name="title"
        value={task.title || ""}
        onChange={handleChange}
        className="todo-inputs my-4 w-100"
        placeholder="Task Title"
      />
      <textarea
        name="description"
        value={task.description || ""}
        onChange={handleChange}
        className="todo-inputs w-100 p-1"
        placeholder="Task Description"
      />
      <div className="mt-4">
        <input
          type="checkbox"
          name="isCompleted"
          checked={task.isCompleted || false}
          onChange={handleChange}
        />{" "}
        Task Completed
      </div>
      <div className="mt-4">
        <Button className="btn btn-dark" onClick={handleUpdate}>
          Update Task
        </Button>
        <button
          className="btn btn-danger mx-3"
          onClick={() => updateModal("none")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
