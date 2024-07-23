import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUser from "../../../../Hooks/useUser";

const CourseDetails = (classes) => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const course = useLoaderData();

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
    <>
       <div
        className="font-gilroy font-medium text-graydark:text-white text-lg leading-[27px] w-[90%] mx-auto"
        data-new-gr-c-s-check-loaded="14.1157.0"
        data-gr-ext-installed=""
      >
        {/* breadcrump or header */}
        <div className="breadcrump bg-blue-300 py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat">
          <div className="container text-center">
            <h2>Course Details</h2>
          </div>
        </div>

          <div className="nav-tab-wrapper tabs section-padding mt-8">
          <div className="container">
            <div className="grid grid-cols-12 md:gap-[30px]">
              {/* left side */}
              <div className="lg:col-span-8 col-span-12">
                <div className="Each-course-details">
                  <div className="xl:h-[470px] h-[350px] mb-10 course-main- thumb">
                    <img
                      src={course?.image}
                      alt=""
                      className="rounded-md object-fut w-full h-full block"
                    />
                    <h2 className="text-2xl mb-2">{course?.name}</h2>
                    <div className="author-meta mt-6 sm:flex lg:x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                      <div className="flex space-x-4 items-center group">
                        <div className="flex-none">
                          <div className="h-12 w-12 rounded">
                            <img
                              src="https://plus.unsplash.com/premium_vector-1683134313621-c2aaa27f8c28?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt=""
                              className="object-cover w-full h-full rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-secondary">
                            Teacher
                            <a href="#" className="text-black">
                              :{classes.instructorName}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="nav-tab-wrapper mt-12">
                      <ul id="tabs-nav" className="course-tab mb-8">
                        <li className="active">
                          <a href="#tab1">OverView</a>
                        </li>
                        <li>
                          <a href="#tab2">Carriculam</a>
                        </li>
                        <li>
                          <a href="#tab3">Teacher</a>
                        </li>
                        <li>
                          <a href="#tab4">Reviews</a>
                        </li>
                      </ul>
                      <div id="tabs-content">
                        <div id="tab1" className="tab-content">
                          <div>
                            <h3 className="text-2xl mt-8">
                              Course Description
                            </h3>
                            <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                              <h4 className="text-2xl">What you will learn?</h4>
                              <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                                <li className="flex space-x-3">
                                  <div className="flex-none relative top-1">
                                    <img src="correctMark" alt="" />
                                  </div>
                                  <div className="flex-1">
                                    Learn how prespective works and how to
                                    incorporate your Study
                                  </div>
                                </li>

                                <li className="flex space-x-3">
                                  <div className="flex-none relative top-1">
                                    <img src="/correct-mark.png" alt="" />
                                  </div>
                                  <div className="flex-1">
                                    Learn how prespective works and how to
                                    incorporate your Study
                                  </div>
                                </li>

                                <li className="flex space-x-3">
                                  <div className="flex-none relative top-1">
                                    <img src="/correct-mark.png" alt="" />
                                  </div>
                                  <div className="flex-1">
                                    Learn how prespective works and how to
                                    incorporate your Study
                                  </div>
                                </li>

                                <li className="flex space-x-3">
                                  <div className="flex-none relative top-1">
                                    <img src="/correct-mark.png" alt="" />
                                  </div>
                                  <div className="flex-1">
                                    Learn how prespective works and how to
                                    incorporate your Study
                                  </div>
                                </li>
                              </ul>
                            </div>
                            <div id="tab2" className="tab-content">
                              <div>
                                <h3 className="text-2xl mt-8">Lesson Plan</h3>
                                <p className="mt-4">
                                  Lorem ipsum dolor, sit amet consectetur
                                  adipisicing elit. Ipsam, soluta voluptatum
                                  repudiandae doloribus consequatur atque
                                  adipisci, eaque officiis consequuntur modi
                                  explicabo aut deleniti iure incidunt harum
                                  saepe amet architecto maiores!
                                  <br /> <br /> Lorem ipsum dolor sit amet
                                  consectetur adipisicing elit. Ad quas est
                                  exercitationem illo, ea natus amet nulla a
                                  distinctio esse explicabo? Iure similique
                                  maxime harum officiis mollitia aliquid autem!
                                  Dolor.
                                </p>
                                <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                                  <h4 className="text-2xl">
                                    This Course is For Beginners
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
                <div className="sidebarWrapper space-y-[30px]">
                  <div className="wdiget custom-text space-y-5">
                    <a className="h-[220px] rounded relative block" href="#">
                      <img
                        // src={course.image}
                        alt=""
                        className="block w-full h-full object-cover rounded"
                      />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img src="/play.png" alt="" />
                      </div>
                    </a>
                    {/* <h3>${course.price}</h3> */}
                    <ul className="list">
                      <li className="flex space-x-3 border-b  border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 fl items-center inline-flex">
                          <FaUser className="inline-flex" />
                          <div className="text-black font-semibold">
                            Instructor
                          </div>
                        </div>
                        <div className="flex-none">{course.instructorName}</div>
                      </li>

                      <li className="flex space-x-3 border-b  border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 fl items-center inline-flex">
                          <MdBookOnline />
                          <div className="text-black font-semibold">
                            Lectures
                          </div>
                        </div>
                        <div className="flex-none">23</div>
                      </li>

                      <li className="flex space-x-3 border-b  border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 fl items-center inline-flex">
                          <BiTime />
                          <div className="text-black font-semibold">
                            Duration
                          </div>
                        </div>
                        <div className="flex-none">2Hr 36Minutes</div>
                      </li>

                      <li className="flex space-x-3 border-b  border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 fl items-center inline-flex">
                          <FaUsers />
                          <div className="text-black font-semibold">
                            Enrolled
                          </div>
                        </div>
                        <div className="flex-none">
                          {course?.totalEnrolled} Students
                        </div>
                      </li>

                      <li className="flex space-x-3 border-b  border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 fl items-center inline-flex">
                          <FaLevelUpAlt />
                          <div className="text-black font-semibold">
                            Course level
                          </div>
                        </div>
                        <div className="flex-none">Intermediate</div>
                      </li>

                      <li className="flex space-x-3 border-b  border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 fl items-center inline-flex">
                          <FaLanguage />
                          <div className="text-black font-semibold">
                            Language
                          </div>
                        </div>
                        <div className="flex-none">English</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetails