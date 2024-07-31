import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, task, tasks, querryPrams = null }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`Task "${task.name}"`}
        </h2>
        <Link
            href={route("task.edit", task.id)}
            className="bg-emerald-500 py-1 px-3  text-white rounded shadow transition-all hover:bg-emerald-600"
          >
             Edit
          </Link>
        </div>
      
      }
    >
      <Head title={`Task "${task.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          {/* <pre>{JSON.stringify(task , undefined ,2)}</pre> */}
            <div className="task-image w-64 h-64 mb-7">
              <img
                src={task.image_path}
                alt=""
                className="w-full  imag object-cover "
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2">
                <div>
                  <div className="mt-4">
                    <label className="text-xl bold">Task ID</label>
                    <p>{task.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Task Name</label>
                    <p>{task.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Task Status</label>
                    <p>
                      <span
                        className={
                          "text-white px-2  py-1 rounded-lg  " +
                          TASK_STATUS_CLASS_MAP[task.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Task Priority</label>
                    <p>
                      <span
                        className={
                          "text-white px-2  py-1 rounded-lg  " +
                          TASK_PRIORITY_CLASS_MAP[task.priority]
                        }
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Created By</label>
                    <p className="capitalize">{task.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <label className="text-xl bold">Due Date</label>
                    <p>
                      {new Date(task.due_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Created Date</label>
                    <p>
                      {new Date(task.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Updated By</label>
                    <p className="capitalize">{task.updatedBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Project</label>
                   <p className="mt-1">
                   <Link href={route("project.show", task.project.id)} className="hover:text-underline">
                      {task.project.name}
                    </Link>
                   </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Assigned User</label>
                    <p className="capitalize">{task.assignedUser.name}</p>
                  </div>
                </div>
              </div>
              {task.description && (
                <div className="description mt-5">
                  <label className="text-xl bold">Task Description</label>
                  <p className="pt-2">{task.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
