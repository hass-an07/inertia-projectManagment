import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth ,task ,projects ,users }) {
  const { data, setData, post, errors, reset } = useForm({
    project_id: task.project_id || "",
    image: "",
    name:  task.name || "",
    description:  task.description || "",
    due_date:  task.due_date || "",
    status:  task.status || "",
    priority:  task.priority || "",
    assigned_user_id: task.assigned_user_id || "",
    _method: 'PUT'
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('task.update', task.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Task  <span className="mx-3 capitalize">"{task.name}"</span>
          </h2>
        </div>
      }
    >
      <Head title="Create New Task" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
            <div className="text-image">
            <img src={task.image_path} alt="" className="w-64 h-64" />
            </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_project_id" value="Project" />
                <SelectInput
                  id="task_project_id"
                  name="project_id"
                  value={task.project_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("project_id", e.target.value)}
                >
                  <option value="">Select the Project</option>
                  {projects.data.map((project) => (
                    <option value={project.id} key={project.id}>{project.name}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.project_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_image_path" value="Task Image" />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" />
                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_description"
                  value="Task Description"
                />
                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" />
                <SelectInput
                  id="task_status"
                  name="status"
                  value={task.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select the status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Task Priority" />
                <SelectInput
                  id="task_priority"
                  name="priority"
                  value={task.priority}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Select the Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_assigned_user"
                  value="Assigned User"
                />
                <SelectInput
                  id="task_assigned_user"
                  name="assigned_user_id"
                  value={task.assigned_user_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Select the User</option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>{user.name}</option>
                  ))}
                </SelectInput>
                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("task.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 text-sm">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
