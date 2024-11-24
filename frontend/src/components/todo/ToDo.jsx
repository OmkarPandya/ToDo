import React, { useEffect, useState, useCallback, useRef } from "react";
import "./todo.css";
import TodoList from "./todoList";
import notify from "../../../UI/Notify/Notify";
import Update from "./Update";
import axios from "axios";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";

const ToDo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  const [todoList, setTodoList] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const hasFetched = useRef(false);

  // Fetch tasks from the server
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      if (response.data.success) {
        setTodoList(response.data.list || []);
      } else {
        notify("error", "Failed to fetch tasks");
      }
    } catch (error) {
      notify("error", "Error fetching tasks!");
    }
  }, []);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchTasks();
      hasFetched.current = true; // Mark as fetched to prevent future calls
    }
  }, [fetchTasks]);

  // Handle input change
  const handleChange = ({ target: { name, value, checked, type } }) => {
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/deleteTask/${id}`
      );
      if (response.data.success) {
        fetchTasks();
        notify("success", response.data.message);
      } else {
        notify("info", response.data.message);
      }
    } catch (error) {
      notify("error", "Error deleting task!");
    }
  };

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!inputs.title) {
      notify("error", "Title is required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addTask",
        inputs
      );
      if (response.data.success) {
        fetchTasks();
        notify("success", response.data.message);
        setInputs({ title: "", description: "", isCompleted: false });
      } else {
        notify("error", response.data.message);
      }
    } catch (error) {
      notify("error", "Error adding task!");
    }
  };

  // Open/close update modal
  const toggleUpdateModal = (isOpen) => {
    document.getElementById("todo-update").style.display = isOpen;
    if (isOpen === "none") fetchTasks();
  };

  return (
    <>
      <div className="todo">
        <div className="todo-main-container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p-2">
            <Input
              type="text"
              placeholder="Title"
              name="title"
              value={inputs.title}
              className="my-2 todo-inputs"
              onChange={handleChange}
            />
            <textarea
              placeholder="Description"
              name="description"
              value={inputs.description}
              className="p-1 todo-inputs"
              onChange={handleChange}
            />
            <div className="mt-3">
              <input
                type="checkbox"
                name="isCompleted"
                checked={inputs.isCompleted}
                onChange={handleChange}
              />{" "}
              Task Completed
            </div>
          </div>
          {inputs.title && (
            <div className="w-50 d-flex justify-content-end my-3">
              <Button
                className="btn-add px-2 py-1"
                type="submit"
                onClick={addTask}
              >
                Add Task
              </Button>
            </div>
          )}
        </div>

        {todoList.length > 0 && (
          <TodoList
            todoList={todoList}
            deleteTask={deleteTask}
            updateModal={toggleUpdateModal}
            setUpdateId={setUpdateId}
          />
        )}
      </div>

      <div className="todo-update" id="todo-update">
        <div className="container">
          <Update updateModal={toggleUpdateModal} id={updateId} />
        </div>
      </div>
    </>
  );
};

export default ToDo;
