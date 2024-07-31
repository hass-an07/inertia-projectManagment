import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

export default function Index({ auth, users, querryPrams = null, success }) {
  querryPrams = querryPrams || {};

  const SearchFieldChanged = (name, value) => {
    if (value) {
      querryPrams[name] = value;
    } else {
      delete querryPrams[name];
    }

    router.get(route("user.index"), querryPrams);
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

    router.get(route("user.index"), querryPrams);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you shure to want to delete User")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Users
          </h2>
          <Link
            href={route("user.create")}
            className="bg-emerald-500 py-1 px-3  text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Users" />
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
                      <th onClick={(e) => orderChanged("id")} className="">
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          ID
                          <div>
                            <FaChevronUp className="w-4" />
                            <FaChevronDown className="w-4 -mt-1" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => orderChanged("name")} className="">
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Name
                          <div>
                            <FaChevronUp className="w-4" />
                            <FaChevronDown className="w-4 -mt-1" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => orderChanged("email")}>
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Email
                          <div>
                            <FaChevronUp className="w-4" />
                            <FaChevronDown className="w-4 -mt-1" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => orderChanged("created_at")}>
                        <div className="py-2 px-3 flex items-center justify-between gap-2 cursor-pointer">
                          Created Date
                          <div>
                            <FaChevronUp className="w-4" />
                            <FaChevronDown className="w-4 -mt-1" />
                          </div>
                        </div>
                      </th>
                      <th className="py-2 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-sm text-gray-700 dark:text-gray-400 border-b-2 border-gray-500 ">
                    <tr className="text-nowrap">
                      <th className="py-2 px-3"></th>
                      <th className="py-2 px-3">
                        <TextInput
                          className="w-full"
                          placeholder="User name"
                          onBlur={(e) =>
                            SearchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                          defaultValue={querryPrams.name}
                        />
                      </th>
                      <th className="py-2 px-3">
                        <TextInput
                          className="w-full"
                          placeholder="User Email"
                          onBlur={(e) =>
                            SearchFieldChanged("email", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("email", e)}
                          defaultValue={querryPrams.name}
                        />
                      </th>
                      <th className="py-2 px-3"></th>
                      <th className="py-2 px-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map((user) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={user.id}
                      >
                        <td className="px-3 py-2">{user.id}</td>
                        <td className="px-3 py-2 text-gray-100">{user.name}</td>
                        <td className="px-3 py-2">{user.email}</td>
                        <td className="px-3 py-2">{user.created_at}</td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("user.edit", { user: user.id })}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteUser(user)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* <pre>{JSON.stringify(users)}</pre> */}
                </table>
              </div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
