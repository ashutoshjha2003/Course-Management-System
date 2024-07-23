import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUser from "../../../../Hooks/useUser";

// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root'); // Set the app element here

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const axiosSecure = useAxiosSecure();
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

  const openModal = (item) => {
    setSelectedClass(item.classes);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedClass(null);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold my-6 text-center text-secondary underline">Enrolled Classes</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 w-auto">
        {data.map((item, index) => (
          <div key={index} className="bg-white shadow-md h-65 mx-3 md:flex-row justify-around flex flex-col items-center sm:flex-grow sm:h-52 sm:w-3/2 w-auto rounded-lg overflow-hidden">
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
                <button onClick={() => openModal(item)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedClass && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Class Video"
        >
          <h2>{selectedClass.name}</h2>
          <p>{selectedClass.description}</p>
          <div className="mt-4">
            <img
              src={selectedClass.image}
              alt="class image"
              className="sm:w-1/2 object-fill h-46 w-96"
            />
            <a
              href={selectedClass.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Watch Video
            </a>
          </div>
          <button onClick={closeModal} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default EnrolledClasses;