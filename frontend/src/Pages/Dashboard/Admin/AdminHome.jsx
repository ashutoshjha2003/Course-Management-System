import React, { useEffect, useState } from "react";
import useUser from "../../../Hooks/useUser";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import AdminStats from "./AdminStats";

const AdminHome = () => {
  const { currentUser, isLoading } = useUser();
  const axiosFetch = useAxiosFetch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosFetch
      .get('/users')
      .then((res) => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold my-7">
          Welcome Back,{" "}
          <span className="text-secondary">{currentUser?.name}</span>
        </h1>
        <AdminStats users={users} />
      </div>
    </div>
  );
};

export default AdminHome;
