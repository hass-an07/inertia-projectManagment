import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Link, router } from "@inertiajs/react";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

export default function TableContent ({tasks,success , querryPrams = null , hideProjectColunm = false }){
  querryPrams = querryPrams || {};


    const SearchFieldChanged = (name, value) => {
        if (value) {
          querryPrams[name] = value;
        } else {
          delete querryPrams[name];
        }
    
        router.get(route("task.index"), querryPrams);
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
    
        router.get(route("task.index"), querryPrams);
      };
      const deleteProject = (tasks) => {
        if (!window.confirm("Are you shure to want to delete Project")) {
          return;
        }
        router.delete(route("task.destroy",tasks.id));
      };
    
    return(
        <>
         {success && (
            <div className="bg-emerald-500 px-4 mb-4 py-4 text-white rounded">
              {success}
            </div>
          )}
             <div className="overflow-auto">
                <table className="text-gray-500 dark:text-gray-400 rtl:text-right w-full text-sm text-left">
                  <thead className="text-sm text-gray-700 dark:text-gray-400 border-b-2 border-gray-500 ">
                    <tr className="text-nowrap">
                      <th onClick={() => orderChanged("id")} className="">
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          ID
                          <div>
                            <FaChevronUp className="w-4"/>
                            <FaChevronDown className="w-4 -mt-1"/>
                          </div>
                        </div>
                      </th>
                      <th className="py-2 px-3">Image</th>
                      {!hideProjectColunm && <th className="py-2 px-3">Project Name</th>}
                      <th onClick={(e) => orderChanged("name")} className="">
                      <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                         Task Name
                          <div>
                            <FaChevronUp className="w-4"/>
                            <FaChevronDown className="w-4 -mt-1"/>
                          </div>
                        </div>
                      </th>
                      <th
                        onClick={(e) => orderChanged("status")}
                      >
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Status
                          <div>
                            <FaChevronUp className="w-4"/>
                            <FaChevronDown className="w-4 -mt-1"/>
                          </div>
                        </div>
                      </th>
                      <th
                        onClick={(e) => orderChanged("created_at")}
                      >
                       <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Created at
                          <div>
                            <FaChevronUp className="w-4"/>
                            <FaChevronDown className="w-4 -mt-1"/>
                          </div>
                        </div>
                      </th>

                      <th
                        onClick={(e) => orderChanged("due_date")}
                      >
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Due date
                          <div>
                            <FaChevronUp className="w-4"/>
                            <FaChevronDown className="w-4 -mt-1"/>
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
                      {!hideProjectColunm &&  <th className="py-2 px-3"></th>}
                      <th className="py-2 px-3"></th>
                      <th className="py-2 px-3">
                        <TextInput
                          className="w-full"
                          placeholder="Task name"
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
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.data.map((task) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={task.id}
                      >
                        <td className="px-3 py-2">{task.id}</td>
                        <td className="px-3 py-2">
                          <img
                            src={task.image_path}
                            alt=""
                            className="w-24"
                          />
                        </td>
                        {!hideProjectColunm && <td className="px-3 py-2 text-nowrap">{task.project.name}</td>}
                        <td className="px-3 py-2 hover:underline text-gray-100">
                          <Link href={route("task.show", task.id)}>
                            {task.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "text-white px-2 py-1 rounded-lg " +
                              TASK_STATUS_CLASS_MAP[task.status]
                            }
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {new Date(task.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {new Date(task.due_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-3 py-2">{task.createdBy.name}</td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("task.edit", {
                              task: task.id,
                            })}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteProject(task)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              {/* <pre>{JSON.stringify(tasks)}</pre> */}
              </div>
              <Pagination links={tasks.meta.links} />

        </>
    )
}