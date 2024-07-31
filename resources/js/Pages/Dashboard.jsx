import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  allPendingTasks,
  myPendingTasks,
  allInProgressTasks,
  myInProgressTasks,
  allCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-10 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg cursor-pointer">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="text-amber-500 text-2xl ">Pending Tasks</h2>
              <p className="text-xl my-2">
                <span className="mr-2">{myPendingTasks}</span>/
                <span className="ml-2">{allPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="text-blue-500 text-2xl ">In Progress Tasks</h2>
              <p className="text-xl my-2">
                <span className="mr-2">{myInProgressTasks}</span>/
                <span className="ml-2">{allInProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="text-green-500 text-2xl">Completed Tasks</h2>{" "}
              {/* Corrected header */}
              <p className="text-xl my-2">
                <span className="mr-2">{myCompletedTasks}</span>/
                <span className="ml-2">{allCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mt-4 mx-auto  sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg cursor-pointer">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="text-center text-2xl">My Active Tasks</h2>
              <table className="text-gray-500 mt-3 bg-gray-900 dark:text-gray-400 rtl:text-right w-full text-sm text-left">
                <thead className="text-sm text-gray-700 dark:text-gray-400 border-b-2 border-gray-500 ">
                  <tr>
                    <th className="py-2 px-3">Id</th>
                    <th className="py-2 px-3">Task Name</th>
                    <th className="py-2 px-3">Project Name</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.data.map((activeTask) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={activeTask.id}
                    >
                      <td className="px-3 py-2">{activeTask.id}</td>
                      <td className="px-3 py-2 hover:underline text-gray-100">
                        <Link href={route("task.show", activeTask.id)}>
                          {activeTask.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 hover:underline text-gray-100">
                        <Link href={route("project.show", activeTask.id)}>
                          {activeTask.project.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "text-white px-2 py-1 rounded-lg " +
                            TASK_STATUS_CLASS_MAP[activeTask.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[activeTask.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2">{activeTask.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
