import { useState, useEffect } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import LoadingDots from "../LoadingDots/LoadingDots";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const TaskBoard = () => {
  const defaultTasks = [
    {
      id: crypto.randomUUID(),
      title: "Learn ReactJs",
      description: "This is a sample React task",
      tags: ["Web", "React", "Javascript"],
      priority: "High",
      isFavorite: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Complete Tailwind CSS Project",
      description: "A project to practice Tailwind CSS",
      tags: ["CSS", "Tailwind", "Frontend"],
      priority: "Medium",
      isFavorite: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Read JavaScript Guide",
      description:
        "Read through the official JavaScript guide for better understanding",
      tags: ["JavaScript", "Guide", "Reading"],
      priority: "Low",
      isFavorite: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Build a Portfolio Website",
      description: "A personal project to build a portfolio site",
      tags: ["HTML", "CSS", "JavaScript"],
      priority: "High",
      isFavorite: true,
    },
  ];

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setTasks(defaultTasks); // Simulating data load
      setFilteredTasks(defaultTasks); // Initially set filtered tasks to all tasks
      setLoading(false); // Stop loading after tasks are set
    }, 1000); // Simulating 1 second delay
  }, []);

  const handleAddTask = () => {
    setTaskUpdate(null); // Clear any previous task data
    setShowAddModal(true);
  };

  const handleSaveTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
      setFilteredTasks([...tasks, newTask]);
    } else {
      const updatedTasks = tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setTaskUpdate(task);
    setShowAddModal(true);
  };

  const handleDeletetask = (taskId) => {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
    setFilteredTasks(taskAfterDelete);
  };

  const hendleAllDelete = () => {
    setTasks([]);
    setFilteredTasks([]);
  };

  const handlefavorite = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const onSearchHandle = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredTasks(tasks);
    } else {
      const updatedTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(updatedTasks);
    }
  };

  return (
    <div>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            taskData={taskUpdate}
            onSave={handleSaveTask}
            onClose={() => setShowAddModal(false)}
          />
        )}
        <div className="container">
          <div className="p-2 flex justify-end">
            <SearchTask onSearch={onSearchHandle} />
          </div>
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            {loading ? (
              <div className="flex justify-center py-10">
                <LoadingDots /> {/* Show loading spinner */}
              </div>
            ) : (
              <>
                <TaskAction
                  onAddClick={handleAddTask}
                  onAllDelete={hendleAllDelete}
                />
                {filteredTasks.length > 0 ? (
                  <TaskList
                    tasks={filteredTasks} // Display the filtered tasks
                    onEdit={handleEditTask}
                    onDeleteTask={handleDeletetask}
                    onFav={handlefavorite}
                  />
                ) : (
                  <NoTaskFound /> // Display NoTaskFound component if no tasks
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskBoard;
