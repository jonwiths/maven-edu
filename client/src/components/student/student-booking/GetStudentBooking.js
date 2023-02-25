import axios from 'axios';
import React, { useEffect, useState } from 'react';

import defaultAvatar from '../../../assets/profiles/default-avatar-m.jpg';

const GetStudentBooking = () => {
  const [bookedMentors, setBookedMentors] = useState([]);
  const [mentorLink, setMentorLink] = useState([]);

  useEffect(() => {
    const getBookedMentors = async () => {
      const response = await axios.get(
        'http://localhost:8000/api/student/get-booked-mentors',
        {
          headers: {
            Authorization: localStorage.getItem('jwt'),
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            withCredentials: true
          }
        }
      );
      setBookedMentors(response.data);
    };
    getBookedMentors();
  }, []);

  return (
    <>
      <div className="max-h-[80vh] overflow-x-scroll">
        <div className="">
          <div className="">
            <p className="mb-4">Here's all of your incoming meeting(s):</p>
          </div>
          <div className="">
            {bookedMentors.map((mentor, index) => (
              <article key={index} className="">
                <div className="border border-blue-900 rounded-2xl px-2 py-4 mb-2">
                  <div className="flex md:flex-row flex-col justify-between md:px-4 px-0">
                    {/* Image */}
                    <div className="flex md:flex-row flex-col gap-x-3 justify-center items-center">
                      <div className="rounded-full overflow-hidden">
                        <img
                          src={defaultAvatar}
                          alt=""
                          className="w-24 h-24 object-cover rounded-full border-4 border-blue-700"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center md:items-start">
                        <h3 className="font-semibold md:text-start text-center">
                          {mentor.f_name} {mentor.l_name}
                        </h3>
                        <p className="md:mt-0 mt-2 text-gray-500">
                          {mentor.subject}
                        </p>
                        <p>
                          Role:{' '}
                          <span className="md:mt-0 mt-2 text-gray-500">
                            {mentor.access}
                          </span>
                        </p>

                        <p className="md:mt-0 mt-2 text-center ">
                          Meeting Link:{' '}
                          <span className="font-medium text-gray-500">
                            <input
                              type="text"
                              value={mentor.meeting_link}
                              onChange={(e) => setMentorLink(e.target.value)}
                              className="pl-1 outline-none border-blue-700 border"
                            />
                            {/* {mentor.meeting_link} */}
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex flex-col md:items-end items-center">
                      <div className="font-normal md:mt-4 mt-2">
                        Date: <span className="font-medium">{mentor.date}</span>
                      </div>
                      <div className="font-normal ">
                        Duration:{' '}
                        <span className="font-medium">{mentor.duration}</span>
                      </div>
                      <div className="font-normal ">
                        Time:{' '}
                        <span className="font-medium">
                          {mentor.start} to {mentor.end}
                        </span>
                      </div>
                      <p className="md:mt-0 mt-2 ">
                        Status:{' '}
                        <span className="font-medium text-red-600">
                          {' '}
                          {mentor.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStudentBooking;
