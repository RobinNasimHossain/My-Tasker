import { useState, useEffect } from "react";

const AddTaskModal = ({ onSave, onClose, taskData }) => {
  const [task, setTask] = useState({
    id: taskData?.id || crypto.randomUUID(),
    title: taskData?.title || "",
    description: taskData?.description || "",
    tags: taskData?.tags || [],
    priority: taskData?.priority || "", // Ensure priority is bound here
    isFavorite: taskData?.isFavorite || false,
  });

  useEffect(() => {
    if (taskData) {
      setTask({
        ...taskData,
        tags: taskData.tags || [], // Ensure tags is an array
      });
    }
  }, [taskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: name === "tags" ? value.split(",") : value, // Handle comma-separated tags
    }));
  };

  const handleSave = () => {
    const isAdd = !taskData;
    onSave(task, isAdd);
    onClose();
  };

  return (
    <div>
      <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
      <form className="mx-auto my-10 w-full max-w-3xl rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/4">
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px] ">
          {taskData ? "Edit Task" : "Add New Task"}
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              name="description"
              id="description"
              value={task.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                value={task.tags.join(",")}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            onClick={handleSave}
            type="button"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskModal;
