import React from 'react';

import { TfiEmail } from 'react-icons/tfi';
import { HiBuildingOffice } from 'react-icons/hi2';
import { GoArrowRight } from 'react-icons/go';
import { BsFillTelephoneFill } from 'react-icons/bs';

const Contacts = () => {
  return (
    <section className="mt-5">
      <div className="container mx-auto w-full flex flex-col items-center p-4 ">
        <h1 className="mb-6 w-full bg-gray-50 p-4 text-center">CONTACT US</h1>
        <div className="flex justify-between items-center w-full  md:flex-row flex-col gap-2">
          <div className="md:w-1/2 w-full bg-gray-200 px-2 py-6">
            <div className="mb-4">
              <h3 className="font-bold mb-2 flex items-center gap-4">
                <span>
                  <HiBuildingOffice />
                </span>{' '}
                OUR MAIN OFFICE
              </h3>
              <p className="flex items-center gap-1">
                <span>
                  <GoArrowRight />
                </span>
                Km. 38 Sitio Gulod, Pulong-Buhangin Sta. Maria, Bulacan
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-2 flex items-center gap-4">
                <span>
                  <TfiEmail />
                </span>{' '}
                OUR BUSINESS EMAIL
              </h3>
              <p className="flex items-center gap-1">
                <span>
                  <GoArrowRight />
                </span>
                maven.edu05@gmail.com
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold mb-2 flex items-center gap-4">
                <span>
                  <BsFillTelephoneFill />
                </span>{' '}
                OUR PHONE NUMBER
              </h3>
              <p className="flex items-center gap-1">
                <span>
                  <GoArrowRight />
                </span>
                <span className="font-semibold">SMART:</span> +(63) 987 654 3210
              </p>
              <p className="flex items-center gap-1">
                <span>
                  <GoArrowRight />
                </span>
                <span className="font-semibold">SMART:</span> +(63) 987 654 3210
              </p>
            </div>
          </div>
          <div className="md:w-1/2 w-full bg-gray-200 p-4">
            <div className="mb-4 flex flex-col w-full">
              <h3 className="font-bold text-center pb-6">Keep in touch</h3>
              <div className="w-full">
                <form action="" method="post">
                  <div className="input-control mb-2">
                    <label htmlFor="contacts_name">Name</label>
                    <input
                      type="text"
                      className="p-2 w-full outline-none"
                      id="contacts_name"
                      placeholder="Enter your name"
                      maxLength="50"
                    />
                  </div>
                  <div className="input-control mb-2">
                    <label htmlFor="contacts_email ">Email</label>
                    <input
                      type="text"
                      className="p-2 w-full outline-none"
                      id="contacts_email"
                      placeholder="Enter your email"
                      maxLength="50"
                    />
                  </div>
                  <div className="input-control mb-2">
                    <label htmlFor="contact_textarea">Message</label>
                    <textarea
                      className="p-2 w-full outline-none"
                      id="contact_textarea"
                      placeholder="Enter your concern(s). 200 charater max*"
                      cols="5"
                      rows="5"
                      maxLength="200"
                    />
                  </div>
                </form>
                <button className="rounded-btn-dark">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
