import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TableContent from "../Task/TaskTable";

export default function Show({ auth, user , tasks ,querryPrams = null }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`User "${user.name}"`}
        </h2>
      }
    >
      <Head title={`User "${user.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="user-image">
                <img
                  src={user.image_path}
                  alt=""
                  className="w-full h-64 object-cover"
                />
              </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2">
                <div>
                  <div className="mt-4">
                    <label className="text-xl bold">User ID</label>
                    <p>{user.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">User Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">User Status</label>
                    <p>
                      <span
                        className={
                          "text-white px-2  py-1 rounded-lg  " +
                          USER_STATUS_CLASS_MAP[user.status]
                        }
                      >
                        {USER_STATUS_TEXT_MAP[user.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Created By</label>
                    <p className="capitalize">{user.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <label className="text-xl bold">Due Date</label>
                    <p>
                    {new Date(user.due_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Created Date</label>
                    <p>
                    {new Date(user.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Updated By</label>
                    <p className="capitalize">{user.updatedBy.name}</p>
                  </div>
                </div>
              </div>
              {user.description && <div className="description mt-5">
              <label className="text-xl bold">User Description</label>
                <p className="pt-2">{user.description}</p>
              </div>}
            </div>
          </div>
        </div>
      </div>

      {/* this is task table content */}
      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
            <TableContent tasks={tasks} querryPrams={querryPrams} hideUserColunm={true}/>
      {/* <pre>{JSON.stringify(user)}</pre> */}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
