import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";

const KEY = import.meta.env.VITE_IMG_TOKEN

const AddClass = () => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    // console.log(formData)
    const newData = Object.fromEntries(formData)
    formData.append('file', image)
    // console.log(newData)

    fetch(API_URL, {
        method: "POST",
        body: formData
    }).then(res => res.json()).then(data => {
        console.log(data)
        if(data.success === true) {
            console.log(data.data.display_url)
            newData.image = data.data.display_url
            newData.instructorName = currentUser?.name
            newData.instructorEmail = currentUser?.email
            newData.status = 'pending'
            newData.submitted = new Date()
            newData.totalEnrolled = 0
            axiosSecure.post(`/new-class`, newData).then(res => {
                alert("Successfully added class!")
                console.log(res.data)
            })
        }
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
  };
  if(isLoading){
    return <div>Loading....</div>
  }


  return (
    <div>
      <div className="my-10">
        <h1 className="text-center text-3xl font-bold">Add Your Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white rounded shadow">
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Course Name
            </label>
            <input
              type="text"
              required
              placeholder="Your Course Name"
              name="name"
              id="name"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Course Thumbnail
            </label>
            <input
              type="file"
              required
              name="image"
              onChange={handleImageChange}
              className="blck mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4"
            />
          </div>
        </div>

        <div>
          <h1 className="text-[12px] my-2 ml-2 text-secondary">
            You can not change your name or email
          </h1>
          <div className="grid gap-3 grid-cols-2">
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="instructorName"
              >
                Teacher name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                value={currentUser?.name}
                readOnly
                disabled
                placeholder="Teacher Name"
                name="instructorName"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="instructorEmail"
                className="block text-gray-700 font-bold mb-2"
              >
                Teacher email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                title="You can not update your email"
                value={currentUser?.email}
                disabled
                readOnly
                name="instructorEmail"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
            <label
              htmlFor="availableSeats"
              className="block text-gray-700 font-bold mb-2"
            >
              Available seats
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              required
              placeholder="How many seats are available?"
              name="availableSeats"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              required
              placeholder="How mush does it cost?"
              name="price"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="youtubeLink"
            className="block text-gray-700 font-bold mb-2"
          >
            Youtube Link
          </label>
          <p className="text-[12px] my-2 mt-2 text-secondary">
            Only Youtube videos are support
          </p>
          <input
            type="text"
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            placeholder="Your course intro Video link"
            name="videoLink"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description About your course
          </label>
          <textarea
            name="description"
            placeholder="Description about your course"
            className="resize-none w-full p-2 border border-secondary rounded-lg outline-none"
            rows="4"
          ></textarea>
        </div>

        <div className="text-center w-full">
          <button
            className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add New Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
