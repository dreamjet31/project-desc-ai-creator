import React from 'react';
import { successAlert } from './Alert';

interface IProjectsListTableProps {
  projectList: IProject[];
  setProjectList: (projectList: IProject[]) => void;
  columns: string[];
}


const ProjectsListTable: React.FC<IProjectsListTableProps> = ({ projectList, columns, setProjectList }) => {
  const handleDelete = async (id: number, tableRowNumber: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      await fetch(`/api/supabase/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 200) {
            const newArray = projectList.filter((_, index) => index !== tableRowNumber);
            // Update the state with the new array
            setProjectList(newArray);
            successAlert("The project is successfully deleted!")
          }
        })
        .catch((err) => {
          console.log("err", err)
        })
    }
  };

  const handleClick = async (id: number) => {
    window.location.href = `/project?${id}`;
  }

  return (
    <div className="overflow-x-auto w-5/6 h-5/6">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-slate-600 ">
          <tr>
            {columns.map((column: string, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-xs text-white font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projectList && projectList.length > 0 && projectList.map((row: IProject, rowIndex: number) => (

            <tr className="text-black cursor-pointer" key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm text-gray-500"
                  onClick={() => {
                    if (row.id !== undefined) {
                      handleClick(row.id)
                    }
                  }}
                >
                  {column.toLowerCase() === "id"
                    ? rowIndex + 1
                    : (column !== "logourl"
                      ? row[column as keyof IProject] // explicitly cast to the correct key type
                      : (
                        <img
                          src={row[column as keyof IProject] as string} // explicitly cast to string
                          alt="Image from DALL·E"
                          width={50}
                          height={50}
                        />
                      )
                    )
                  }
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  className="text-red-500"
                  onClick={
                    () => {
                      if (row.id !== undefined) {
                        handleDelete(row.id, rowIndex)
                      }
                    }
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="red">
                    <path d="M16.5 6.9h-1.4V5.5c0-.6-.4-1-1-1H5.9c-.6 0-1 .4-1 1v1.4H3c-.6 0-1 .4-1 1s.4 1 1 1h1.5l1.6 10.6c0 .6.5 1 1 1h6c.6 0 1-.4 1-1L15.5 9.9h1.5c.6 0 1-.4 1-1s-.5-1-1.1-1zM8.4 6.5h3.2l-.6 3.2H9l-.6-3.2zM14 17H6l-1.3-8.6H15.3L14 17zm-4-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsListTable;
