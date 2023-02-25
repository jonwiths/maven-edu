import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdComputer } from 'react-icons/md';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import SignUp from '../../components/landing-page/SignUp';
import Stats from '../../components/landing-page/Stats';
import Popup from '../../components/cards/Popup';

import logo from '../../assets/backgrounds/.webp/landing-page-leftbg.webp';
import HowDoesItWork from './HowDoesItWork';
import ReccomendedCourses from './ReccomendedCourses';

const LandingPage = () => {
  const [isPopUpShow, setIsPopUpShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPopUpShow(true);
    }, [1000]);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Popup
        navigate={() => navigate('/register')}
        open={isPopUpShow}
        close={() => setIsPopUpShow(!isPopUpShow)}
      ></Popup>
      <section className="">
        <div className="custom-container ">
          <article className=" flex flex-col md:flex-row-reverse lg:justify-around justify-center text-left ">
            <div className="left md:py-0  flex flex-col md:items-start items-center justify-center w-full p-4 ">
              <img src={logo} alt="Ementor" className="w-full object-cover " />
            </div>
            <div className="right md:py-0  flex flex-col md:items-start justify-center w-full p-4 md:h-[90vh] ">
              <h1 className="lg:text-7xl text-4xl pb-3 font-semibold">
                Investing in{' '}
              </h1>
              <h1 className="lg:text-7xl text-4xl pb-3 font-semibold">
                Knowledge and
              </h1>
              <h1 className="lg:text-7xl text-4xl pb-3 mb-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-violet-600 font-semibold">
                Your Future
              </h1>
              <p className="text-lg mb-4 text-gray-600">
                We are ready to help you grow together, Start developing right
                now!
              </p>
              <Link to="/register" className="large-blue-btn ">
                Enroll Now
              </Link>
            </div>
          </article>
          <HowDoesItWork />
          <SignUp />
          <ReccomendedCourses />

          <hr className="md:py-10 py-4" />
          {/* **************************************************************** */}
          <div className="flex items-center justify-center pb-5 md:text-left text-center">
            <h1 className="font-semibold text-2xl">
              Why we are the better than others?
            </h1>
          </div>
          <div className="flex flex-wrap">
            {/* Box 1 */}
            <div className="lg:pt-10 pt-6 w-full md:w-4/12 px-3 text-center">
              <div className=" flex flex-col min-w-0 break-words bg-gray-50 w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <BsFillCalendarCheckFill />
                  </div>
                  <h6 className="text-xl font-semibold">
                    Convenient Study Schedule
                  </h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Choose the available time base on your own convienience.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="lg:pt-10 pt-6 w-full md:w-4/12 px-3 text-center">
              <div className=" flex flex-col min-w-0 break-words bg-gray-50 w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <FaChalkboardTeacher />
                  </div>
                  <h6 className="text-xl font-semibold">Flexibility</h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    You can choose your mentor based on your needs and price
                    that you can afford
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="lg:pt-10 pt-6 w-full md:w-4/12 px-3 text-center">
              <div className=" flex flex-col min-w-0 break-words bg-gray-50 w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <MdComputer />
                  </div>
                  <h6 className="text-xl font-semibold">
                    Modern Internet Platform
                  </h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Book an e-meeting and meet your e-mentor. meet your
                    e-mentor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Stats />
      </section>
    </>
  );
};

export default LandingPage;
