import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Pagination } from "@mui/material";
import Swal from 'sweetalert2'


const ManageClasses = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 6;
  const totalPage = Math.ceil(classes.length / itemsPerPage);

  useEffect(() => {
    axiosFetch
      .get("/classes-manage")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    if (lastIndex > classes.length) {
      lastIndex = classes.length;
    }
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginatedData(currentData);
  }, [page, totalPage]);

  const handleChange = (event, value) => {
    setPage(value)
  }

  const handleApprove = (id) => {
    axiosSecure.put(`/change-status/${id}`, {status: 'approved'}).then(res => {
        console.log(res.data)
        alert('Course Approved Successfully!')
        const updateClass = classes.map(cls => cls._id === id ? {...cls, status: 'approved'} : cls )
        setClasses(updateClass)
    }).catch(err => console.log(err))
  }

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unpublish it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const res = axiosSecure .put(`/change-status/${id}`, {status: 'rejected'})
        if(res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Unpublished!",
            text: "Your course is unpublished.",
            icon: "success"
          });
          const updateClass = classes.map(cls => cls._id === id ? {...cls, status: 'rejected'} : cls )
          setClasses(updateClass)
        }
        
      }
    });
  }

  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold text-center my-10">
        Manage <span className="text-black">Classes</span>
      </h1>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-6 lg:mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        PHOTO
                      </th>
                      <th scope="col" className="px-6 py-4">
                        COURSE NAME
                      </th>
                      <th scope="col" className="px-6 py-4">
                        TEACHER NAME
                      </th>
                      <th scope="col" className="px-6 py-4">
                        STATUS
                      </th>
                      <th scope="col" className="px-6 py-4">
                        DETAILS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length == 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center text-2xl font-bold"
                        >
                          No Classes Found
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((cls, index) => (
                        <tr
                          key={cls._id}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <img
                              src={cls.image}
                              className="h-[35px] w-[35px]"
                              alt=""
                            />
                          </td>
                          <td className="whitespace-pre-wrap px-6 py-4">
                            {cls.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {cls.instructorName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`font-bold ${
                                cls.status === "pending"
                                  ? "bg-orange-400"
                                  : cls.status === "checking"
                                  ? "bg-yellow-500"
                                  : cls.status === "approved"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              } px-2 py-1 uppercase text-white rounded-xl`}
                            >
                              {cls.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              {
                                <button
                                  onClick={() => handleApprove(cls._id)}
                                  className="text-[12px] cursor-pointer disabled:bg-green-700 bg-green-500 py-1 rounded-md px-2 text-white"
                                >
                                  Approve
                                </button>
                              }
                              {
                                <button
                                  disabled={
                                    cls.status === "rejected" ||
                                    cls.status === "checking"
                                  }
                                  onClick={() => handleReject(cls._id)}
                                  className="cursor-pointer disabled:bg-red-800 bg-red-600 py-1 rounded-md px-2 text-white"
                                >
                                  Deny
                                </button>
                              }
                              {/* {
                                <button
                                  disabled={
                                    cls.status === "rejected" ||
                                    cls.status === "checking"
                                  }
                                  onClick={() => handleReject(cls._id)}
                                  className="cursor-pointer  bg-red-600 py-1 rounded-md px-2 text-white"
                                >
                                  Feedback
                                </button>
                              } */}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div>
            <div className="w-full h-full flex justify-center items-center my-10">
                <Pagination onChange={handleChange} count={totalPage} color="primary" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClasses;
