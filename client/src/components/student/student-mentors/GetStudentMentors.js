import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import defaultAvatar from '../../../assets/profiles/default-avatar-m.jpg';

const GetStudentMentors = ({ specificMentorProfile }) => {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      const getAllMentors = async () => {
        const response = await axios.get(
          'http://localhost:8000/api/student/get-all-mentors'
        );
        setMentors(response.data);
        setIsLoading(false);
      };
      getAllMentors();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="mt-6 max-h-[80vh] overflow-x-scroll">
      <p className="mb-4">Find the mentor to learn with:</p>
      <div className="grid md:grid-cols-2 grid-rows-2 gap-3 place-items-center  items-stretch">
        {isLoading
          ? 'Loading'
          : mentors.map((mentor) => (
              <article
                className="border border-blue-700 p-4 rounded-2xl bg-blue-100 w-full"
                key={mentor.id}
              >
                <div className="max-w-[2500px]">
                  <div className="mb-2 ">
                    <img
                      src={defaultAvatar}
                      alt=""
                      className=" object-center h-[250px] w-full"
                    />
                  </div>
                  <div className="flex justify-between  items-start md:flex-row flex-col">
                    <div className="flex flex-col w-full mt-2">
                      <h4 className=" mb-0 ">
                        <span className="font-bold">{mentor.f_name}</span>{' '}
                        {mentor.l_name}
                      </h4>
                      <p className="font-medium md:mt-2 mt-0 text-gray-500">
                        {mentor.subject}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end items-start w-full">
                      <h4 className="font-medium text-green-700">
                        {mentor.price}
                      </h4>
                      <button className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                        <Link
                          to={`profile/${specificMentorProfile}`}
                          className=""
                        >
                          Visit Profile
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
      </div>
    </div>
  );
};

export default GetStudentMentors;
