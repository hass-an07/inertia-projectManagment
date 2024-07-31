import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

export default function Index({ auth, projects, querryPrams = null, success }) {
  querryPrams = querryPrams || {};

  const SearchFieldChanged = (name, value) => {
    if (value) {
      querryPrams[name] = value;
    } else {
      delete querryPrams[name];
    }

    router.get(route("project.index"), querryPrams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    SearchFieldChanged(name, e.target.value);
  };

  const orderChanged = (name) => {
    if (name === querryPrams.sort_field) {
      if (querryPrams.sort_direction === "asc") {
        querryPrams.sort_direction = "desc";
      } else if (querryPrams.sort_direction === "desc") {
        querryPrams.sort_direction = "asc";
      } else {
        // Handle cases where sortDirection is not set or has an unexpected value
        querryPrams.sort_direction = "asc";
      }
    } else {
      querryPrams.sort_field = name;
      querryPrams.sort_direction = "asc";
    }

    router.get(route("project.index"), querryPrams);
  };

  const deleteProject = (project) => {
    if (!window.confirm("Are you shure to want to delete Project")) {
      return;
    }
    router.delete(route("project.destroy",project.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-1 px-3  text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 px-4 mb-4 py-4 text-white rounded">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="text-gray-500 dark:text-gray-400 rtl:text-right w-full text-sm text-left">
                  <thead className="text-sm text-gray-700 dark:text-gray-400 border-b-2 border-gray-500 ">
                    <tr className="text-nowrap">
                      <th onClick={() => orderChanged("id")} className="">
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          ID
                          <div>
                            <FaChevronUp className="w-4" />
                            <FaChevronDown className="w-4 -mt-1" />
                          </div>
                        </div>
                      </th>
                      <th className="py-2 px-3">Image</th>
                      <th onClick={(e) => orderChanged("name")} className="">
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Name
                          <div>
                            <FaChevronUp className="w-4" />
                            <FaChevronDown className="w-4 -mt-1" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => orderChanged("status")}>
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Status
                          <div>
                            <FaChevronUp className="w-4" />
                            <FaChevronDown className="w-4 -mt-1" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => orderChanged("created_at")}>
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Created at
                          <div>
                            <FaChevronUp className="w-4" />
                            <FaChevronDown className="w-4 -mt-1" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => orderChanged("due_date")}>
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Due date
                          <div>
                            <FaChevronUp className="w-4" />
                            <FaChevronDown className="w-4 -mt-1" />
                          </div>
                        </div>
                      </th>
                      <th className="py-2 px-3">Created By</th>
                      <th className="py-2 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-sm text-gray-700 dark:text-gray-400 border-b-2 border-gray-500 ">
                    <tr className="text-nowrap">
                      <th className="py-2 px-3"></th>
                      <th className="py-2 px-3"></th>
                      <th className="py-2 px-3">
                        <TextInput
                          className="w-full"
                          placeholder="Project name"
                          onBlur={(e) =>
                            SearchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                          defaultValue={querryPrams.name}
                        />
                      </th>
                      <th className="py-2 px-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={querryPrams.status}
                          onChange={(e) =>
                            SearchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="py-2 px-3"></th>
                      <th className="py-2 px-3"></th>
                      <th className="py-2 px-3"></th>
                      <th className="py-2 px-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={project.id}
                      >
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                          <img
                            src={project.image_path}
                            alt=""
                            className="w-24 h-20 rounded-xl"
                          />
                        </td>
                        <td className="px-3 py-2 hover:underline text-gray-100">
                          <Link href={route("project.show", project.id)}>
                            {project.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "text-white px-2 py-1 rounded-lg " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.due_date}
                        </td>
                        <td className="px-3 py-2">{project.createdBy.name}</td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("project.edit", {
                              project: project.id,
                            })}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteProject(project)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* <pre>{JSON.stringify(projects , undefined , 2)}</pre> */}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
