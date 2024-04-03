import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  photo?: string;
}

export default function DailyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [editedPhotoFile, setEditedPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: `Task ${tasks.length + 1}`,
      description: "",
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = () => {
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: editedTitle,
              description: editedDescription,
              photo: editedPhotoFile
                ? URL.createObjectURL(editedPhotoFile)
                : task.photo,
            }
          : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setEditedPhotoFile(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditedPhotoFile(null);
  };

  const handleCompleteTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col bg-white h-screen rounded-xl p-10 mt-5">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium m-5">Daily Tasks</h1>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="flex items-center flex-col gap-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between bg-gray-100 p-5 rounded-xl w-full ${
              task.completed ? "opacity-50" : ""
            }`}
          >
            <div className="flex gap-5 items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteTask(task.id)}
              />
              {editingTask?.id === task.id ? (
                <div className="flex gap-5">
                  <input
                    className="rounded-xl px-2"
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    className="rounded-xl w-full block "
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <div className="flex items-center">
                    <input
                      type="file"
                      onChange={(e) =>
                        setEditedPhotoFile(e.target.files && e.target.files[0])
                      }
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p>{task.title}</p>
                  <p>{task.description}</p>
                  {task.photo && (
                    <img
                      src={task.photo}
                      alt="Task"
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </>
              )}
            </div>
            <div className="flex gap-2">
              {editingTask?.id === task.id ? (
                <>
                  <button className="text-blue-700" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button className="text-slate-400" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <MdEdit
                  size={20}
                  color="black"
                  onClick={() => handleEditTask(task)}
                />
              )}
              <button
                className="text-red-400"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
