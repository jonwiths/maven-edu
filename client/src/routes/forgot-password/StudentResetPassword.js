import React, { useEffect, useState } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentResetPassword = () => {
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setErrMsg('');
    }, 4000);
  }, [errMsg]);

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [done, setDone] = useState([]);

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    const getBookedMentors = async () => {
      if (email.trim() === '' || newPassword.trim() === '') {
        setErrMsg('Insert value in both input');
      } else {
        const response = await axios.put(
          'http://localhost:8000/api/student/get-recovery-code',
          {
            email: email,
            password: newPassword
          },
          {
            headers: {
              Authorization: localStorage.getItem('jwt'),
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              withCredentials: true
            }
          }
        );
        setDone(response.data);
        setEmail('');
        setNewPassword('');
      }
    };
    getBookedMentors();
  };

  return (
    <section className="bg-gray-100 h-screen">
      <div className="custom-container flex items-center flex-col h-full">
        <div className="flex items-start justify-start max-w-[400px] w-full mt-5">
          <button
            onClick={() => navigate(-1)}
            className="flex gap-1 items-center jus px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded-full"
          >
            <AiOutlineLeft />
            <span>Back</span>
          </button>
        </div>
        <h1 className="text-center mt-20">Change password</h1>
        <form action="" method="POST" className="mt-10 max-w-[400px] w-full">
          <div className="flex flex-col  ">
            <label htmlFor="" className="mb-1">
              Please enter your email address and new password.
            </label>

            <label htmlFor="email" className="font-medium my-2">
              Enter email
            </label>
            <input
              id="email"
              type="text"
              className="p-2 bg-white border-2 border-blue-900 focus:border-blue-700 outline-none rounded-xl"
              placeholder="example@email.com"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              maxLength={45}
            />

            <label htmlFor="password" className="font-medium my-2">
              Enter Password
            </label>
            <input
              id="password"
              type="password"
              className="p-2 bg-white border-2 border-blue-900 focus:border-blue-700 outline-none rounded-xl"
              placeholder="example@email.com"
              value={newPassword}
              name="recovery_code"
              onChange={(e) => setNewPassword(e.target.value)}
              maxLength={75}
            />
            {errMsg && <p className="text-red-600">{errMsg}</p>}
            <button
              onClick={handleSubmitBtn}
              className="p-2 mt-6 bg-blue-600 rounded-full font-medium text-white hover:bg-blue-700"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentResetPassword;
