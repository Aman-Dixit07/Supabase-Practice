import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

const App = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [newDescription, setNewDescription] = useState("");

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error in fetchingTasks: ", error.message);
      return;
    }

    setTasks(data);
    console.log(tasks);
  };

  const updateTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .update({ description: newDescription })
      .eq("id", id);

    if (error) {
      console.error("error in updating task:", error.message);
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error in deletingTask: ", error.message);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert(newTask).single();

    if (error) {
      console.error("Error in handleSubmit: ", error.message);
      return;
    }

    setNewTask({ title: "", description: "" });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className=" text-2xl flex items-center justify-center min-h-screen w-screen  text-white bg-black">
      <div className="flex items-center gap-4 justify-center flex-col w-1/2">
        <h1>TODO</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <label htmlFor="task" className=" p-2">
            Task
          </label>
          <input
            type="text"
            id="task"
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border-white bg-gray-800 border-2  rounded-xl"
          />
          <label htmlFor="description" className=" p-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            onChange={(e) => {
              setNewTask((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            className="border-white bg-gray-800 border-2  rounded-2xl"
          />
          <button
            type="submit"
            className="bg-gray-400 rounded-xl mt-2 cursor-pointer hover:bg-gray-900 "
          >
            Add
          </button>
        </form>
        <div>
          <ul>
            {tasks.map((task, key) => (
              <li
                className="flex flex-col my-5  items-center  justify-center bg-gray-800 w-3xl rounded-2xl"
                key={key}
              >
                <div>
                  <p className="text-green-400">{task.title}</p>

                  <p>{task.description}</p>
                  <textarea
                    placeholder="edit the task"
                    onChange={(e) => {
                      setNewDescription(e.target.value);
                    }}
                  ></textarea>
                  <div className="flex flex-row gap-5 mt-2">
                    <button
                      onClick={() => updateTask(task.id)}
                      className="bg-gray-400 p-2.5 rounded-xl  cursor-pointer hover:bg-gray-900 "
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-gray-400 rounded-xl cursor-pointer hover:bg-gray-900 "
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
