import React from "react";
import Card from "../../UI/Card/Card";
import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import "./todo.css";

const TodoList = ({ todoList, deleteTask, updateModal, setUpdateId }) => {
  return (
    <div className="todoList">
      <div className="container-fluid">
        <div className="row">
          {todoList.map((task) => {
            return (
              <div className="col-lg-3 col-9 mx-5 my-2" key={task._id}>
                <Card>
                  <div className={`p-3 card`}>
                    <div>
                      <h5>{task.title}</h5>
                      <p>{task.description.split("", 72)}...</p>
                    </div>
                    <div className="card-actions">
                      <div className="task-complete">
                        <input
                          type="checkbox"
                          value={task.isCompleted}
                          checked={task.isCompleted}
                          disabled
                          name="isCompleted"
                        />{" "}
                        <div style={{ color: "#737373" }}>Task Completed</div>
                      </div>
                      <div>
                        <CiEdit
                          className="mx-3 card-icon"
                          onClick={() => {
                            updateModal("block");
                            setUpdateId(task._id);
                          }}
                        />
                        <AiFillDelete
                          className="card-icon delete"
                          onClick={() => {
                            deleteTask(task._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
