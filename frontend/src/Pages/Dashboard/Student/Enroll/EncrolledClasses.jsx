import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAxiosFetch from "../../../../Hooks/useAxiosFetch";
import useUser from "../../../../Hooks/useUser";
import { Link } from "react-router-dom";

const EncrolledClasses = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const axiosFetch = useAxiosFetch();
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold my-6 text-center text-secondary underline">Enrolled Classes</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 w-auto">
        {data.map((item, index) => (
          <div className="bg-white shadow-md h-65 mx-3 md:flex-row justify-around flex flex-col items-center sm:flex-growsm:h-52 sm:w-3/2 w-auto rounded-lg  overflow-hidden">
            <img
              src={item.classes.image}
              alt="class image"
              className="sm:w-1/2 object-fill h-46 w-96"
            />
            <div className="p-4 flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-2">
                {item.classes.name}
              </h2>
              <p className="text-gray-500 mb-4">
                <span className="text-gray-400">by </span>{item.classes.instructorName}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-2">
                {item.classes.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-500 mr-2">${item.classes.price}</span>
                <Link to={'/dashboard/course-details'}>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncrolledClasses;
