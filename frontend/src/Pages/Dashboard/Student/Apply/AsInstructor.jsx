import React, { useEffect, useState } from "react";
import useUser from "../../../../Hooks/useUser";
import useAxiosFetch from "../../../../Hooks/useAxiosFetch";
import { FiUser, FiMail, FiBriefcase, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

const AsInstructor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState();
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  const inputVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };


  useEffect(() => {
    axiosFetch
      .get(`applied-instructors/${currentUser?.email}`)
      .then((res) => {
        console.log(data);
        setSubmittedData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const experience = event.target.experience.value
    const data = {
      name, email, experience
    }
    axiosFetch.post('/as-instructor', data).then(res => {
      console.log(res.data)
      alert("Successfully applied!")
    })
  }


  return (
    <div className="my-20">
      <h1 className='font-bold text-4xl text-center'>Apply For <span className="text-secondary">Teacher</span></h1>
      <div>
        {!submittedData?.name && (
          <div className="md:w-1/2">
            <form onSubmit={onSubmit}>
              <div className="flex w-full">
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  className="mb-4 w-full"
                >
                  <label className="text-gray-700" htmlFor="name">
                    Name
                  </label>
                  <div className="flex items-center mt-1">
                    <FiUser className="text-gray-500" />
                    <input
                      defaultValue={currentUser?.name}
                      disabled
                      readOnly
                      className="ml-2 w-full border-gray-300 focus:border-secondary outline-none"
                      type="text"
                      id="name"
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-4 w-full"
                >
                  <label className="text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <div className="flex items-center mt-1">
                    <FiMail className="text-gray-500" />
                    <input
                      defaultValue={currentUser?.email}
                      disabled
                      readOnly
                      className="ml-2 w-full border-gray-300 focus:border-secondary outline-none"
                      type="email"
                      id="email"
                      name="email"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-4 w-full"
              >
                <label className="text-gray-700" htmlFor="exprience">
                  Exprience & Qualification
                </label>
                <div className="flex items-center mt-1">
                  <FiBriefcase className="text-gray-500" />
                  <textarea
                    placeholder="Tell us about your exprience & Qualifiaction..."
                    className="ml-2 rounded-lg px-2 placeholder:text-sm py-1 w-full border border-gray-300 focus:border-secondary outline-none resize-none"
                    name="experience"
                    id="experience"
                  ></textarea>
                </div>
              </motion.div>

              <div className="text-center flex justify-center">
                <button
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTop={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none"
                >
                  <FiSend className="mr-2" />
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsInstructor;
