import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TableContent from "../Task/TaskTable";

export default function Show({ auth,success, project , tasks ,querryPrams = null }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`Project "${project.name}"`}
        </h2>
        <Link
            href={route("project.edit", project.id)}
            className="bg-emerald-500 py-1 px-3  text-white rounded shadow transition-all hover:bg-emerald-600"
          >
             Edit
          </Link>
          </div>
      }
    >
      <Head title={`Project "${project.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="project-image w-64 h-64 mt-7 mx-7 ">
                <img
                  src={project.image_path}
                  alt=""
                  className="w-full h-64 object-cover"
                />
              </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2">
                <div>
                  <div className="mt-4">
                    <label className="text-xl bold">Project ID</label>
                    <p>{project.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Project Name</label>
                    <p>{project.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Project Status</label>
                    <p>
                      <span
                        className={
                          "text-white px-2  py-1 rounded-lg  " +
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-xl bold">Created By</label>
                    <p className="capitalize">{project.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <label className="text-xl bold">Due Date</label>
                    <p>
                    {new Date(project.due_date).toLocaleDateString(
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
                    {new Date(project.created_at).toLocaleDateString(
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
                    <p className="capitalize">{project.updatedBy.name}</p>
                  </div>
                </div>
              </div>
              {project.description && <div className="description mt-5">
              <label className="text-xl bold">Project Description</label>
                <p className="pt-2">{project.description}</p>
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
            <TableContent tasks={tasks} querryPrams={querryPrams} success={success} hideProjectColunm={true}/>
      {/* <pre>{JSON.stringify(project)}</pre> */}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
