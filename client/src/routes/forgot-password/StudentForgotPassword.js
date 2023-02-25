import React, { useEffect, useState } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentForgotPassword = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    try {
      const getBookedMentors = async () => {
        if (emailInput.trim() === '' || recoveryCode.trim() === '') {
          window.alert('Please fill up all input');
        } else {
          const response = await axios.get(
            'http://localhost:8000/api/student/get-recovery-code',
            {
              email: emailInput,
              recovery_code: recoveryCode
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                withCredentials: true
              }
            }
          );
          setDone(response.data);
          setEmailInput('');
          setRecoveryCode('');
          navigate('/student-reset-password');
        }
      };
      getBookedMentors();
    } catch (err) {
      setErrMsg(err.response.data[0]);
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrMsg('');
    }, 4000);
  }, [errMsg]);

  const [emailInput, setEmailInput] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');

  const [done, setDone] = useState([]);

  useEffect(() => {}, []);

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
        <h1 className="text-center mt-20">Reset password</h1>
        <form action="" method="POST" className="mt-10 max-w-[400px] w-full">
          <div className="flex flex-col  ">
            <label htmlFor="" className="mb-1">
              Please enter your email address. You will receive a link to create
              a new password via email.
            </label>

            <label htmlFor="email" className="font-medium my-2">
              Enter email
            </label>
            <input
              id="email"
              type="text"
              className="p-2 bg-white border-2 border-blue-900 focus:border-blue-700 outline-none rounded-xl"
              placeholder="example@email.com"
              value={emailInput}
              name="email"
              onChange={(e) => setEmailInput(e.target.value)}
              maxLength={45}
            />

            <label htmlFor="recovery_code" className="font-medium my-2">
              Enter Recovery Code
            </label>
            <input
              id="recovery_code"
              type="text"
              className="p-2 bg-white border-2 border-blue-900 focus:border-blue-700 outline-none rounded-xl"
              placeholder="example@email.com"
              value={recoveryCode}
              name="recovery_code"
              onChange={(e) => setRecoveryCode(e.target.value)}
              maxLength={75}
            />
            {errMsg && <p className="text-red-600">{errMsg}</p>}
            <button
              onClick={handleSubmitBtn}
              className="p-2 mt-6 bg-blue-600 rounded-full font-medium text-white hover:bg-blue-700"
            >
              Check Code
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentForgotPassword;
