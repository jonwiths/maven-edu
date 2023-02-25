import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { HiExclamationCircle } from 'react-icons/hi';

const Register = () => {
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const s_fnameRef = useRef();
  const s_lnameRef = useRef();
  const s_emailRef = useRef();
  const s_phoneRef = useRef();
  const s_passwordRef = useRef();
  const s_cpasswordRef = useRef();

  const [s_fname, setS_fname] = useState('');
  const [s_lname, setS_lname] = useState('');
  const [s_email, setS_email] = useState('');
  const [s_phone, setS_phone] = useState('');
  const [s_password, setS_password] = useState('');
  const [s_cpassword, setS_cpassword] = useState('');

  const [registerStatus, setRegisterStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [phoneStatus, setPhoneStatus] = useState('');

  const clearInput = () => {
    setS_fname('');
    setS_lname('');
    setS_email('');
    setS_phone('');
    setS_password('');
    setS_cpassword('');

    s_fnameRef.current.focus();
  };

  // TO RUN REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (
        s_fname.trim() === '' &&
        s_lname.trim() === '' &&
        s_email.trim() === '' &&
        s_phone.trim() === '' &&
        s_password.trim() === '' &&
        s_cpassword.trim() === ''
      ) {
        setRegisterStatus('Please fill up all the input.');
      } else if (
        !s_fname ||
        !s_lname ||
        !s_email ||
        !s_phone ||
        !s_password ||
        !s_cpassword
      ) {
        setRegisterStatus('Please fill up all the input.');
      } else if (
        s_phone.trim().length < 11 ||
        !s_phone.trim().startsWith('09')
      ) {
        setPhoneStatus(`Phone number format is: 09XXXXXXXXX.`);
        setRegisterStatus('Invalid Phone number format.');
        s_phoneRef.current.focus();
      } else if (!EMAIL_REGEX.test(s_email)) {
        setRegisterStatus('Invalid Email');
        setS_email('');
        setS_password('');
        setS_cpassword('');
        s_emailRef().current.focus();
      } else if (s_password !== s_cpassword) {
        setRegisterStatus(`Password didn't match.`);
        setS_password('');
        setS_cpassword('');
        s_passwordRef.current.focus();
      } else if (s_password.length <= 7) {
        setRegisterStatus('Invalid password.');
        setPasswordStatus('Password must be 8 characters or more.');
        setS_password('');
        setS_cpassword('');
        s_passwordRef.current.focus();
      } else {
        await axios.post('http://localhost:8000/api/student/auth/register', {
          s_fname,
          s_lname,
          s_email,
          s_phone,
          s_password,
          s_cpassword
        });
        setRegisterStatus('Account creation successful!');
        clearInput();
      }
    } catch (err) {
      setRegisterStatus(err.response.data);
      console.log(err);
    }
  };

  useEffect(() => {
    s_fnameRef.current.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRegisterStatus('');
    }, 4000);
  }, [registerStatus]);

  useEffect(() => {
    setTimeout(() => {
      setPasswordStatus('');
    }, 5000);
  }, [passwordStatus]);

  useEffect(() => {
    setTimeout(() => {
      setPhoneStatus('');
    }, 5000);
  }, [phoneStatus]);

  return (
    <section className="  " id="register">
      <div className="custom-container flex flex-col md:flex-row lg:justify-around justify-center">
        <div className="left-register w-full h-full hidden md:block  bg-center">
          {/*bg-homepage-bg */}
          <div className="flex flex-col p-4 items-center justify-center mt-32">
            <div className="text-left">
              <h1 className="font-semibold text-7xl pb-10 leading-tight">
                Sign Up and <br /> Start Learning
              </h1>
              <h3 className="leading-normal">
                Already have an account? <br />
                You can{' '}
                <Link to="/login" className="text-blue-700 font-semibold">
                  Login here.
                </Link>
              </h3>
            </div>
          </div>
        </div>
        <div className="right-register w-full py-10 px-4 md:h-screen ">
          <div className="max-w-[400px] mx-auto p-4">
            <h2 className="pb-2">New here? Let's get started.</h2>
            <p className="font-semibold pb-4 pt-2">
              Please enter your details.
            </p>
            <form
              action=""
              id="register-form"
              className="register-form w-full"
              method="POST"
            >
              <div className="input-container w-full max-w-[400px] ">
                {/* <p>{registerStatus && registerStatus}</p> */}
                {registerStatus && (
                  <p
                    className={
                      registerStatus !== 'Account creation successful!'
                        ? 'px-1 py-2 text-red-700 bg-red-100 text-center mb-2 rounded-lg'
                        : 'px-1 py-2 text-green-700 bg-green-100 text-center mb-2 rounded-lg'
                    }
                  >
                    <HiExclamationCircle
                      className={registerStatus !== null ? 'inline' : 'hidden'}
                      size={19}
                      style={{ marginRight: '3px' }}
                    />
                    {registerStatus}
                  </p>
                )}

                <div className="flex gap-1 justify-between w-full flex-col md:flex-row mb-0">
                  <span className="md:w-1/2 sm:w-full flex items-center justify-center p-4 bg-white rounded-xl mb-2">
                    <input
                      ref={s_fnameRef}
                      type="text"
                      className="outline-none border-none w-full  bg-transparent"
                      placeholder="First Name"
                      autoComplete="off"
                      name="s_fname"
                      onChange={(e) => setS_fname(e.target.value)}
                      value={s_fname}
                      required={true}
                    />
                  </span>
                  <span className="md:w-1/2 sm:w-full flex items-center justify-center p-4 bg-white rounded-xl mb-2">
                    <input
                      ref={s_lnameRef}
                      type="text"
                      className="outline-none border-none w-full bg-transparent"
                      placeholder="Last Name"
                      autoComplete="off"
                      name="s_lname"
                      onChange={(e) => setS_lname(e.target.value)}
                      value={s_lname}
                    />
                  </span>
                </div>
                <span className="w-full flex items-center justify-center p-4 gap-1 bg-white rounded-xl mb-2">
                  <input
                    ref={s_emailRef}
                    type="email"
                    className="outline-none border-none w-full  bg-transparent"
                    placeholder="Email"
                    autoComplete="off"
                    name="s_email"
                    onChange={(e) => setS_email(e.target.value)}
                    value={s_email}
                  />
                </span>
                {/* PASSWORD STATUS */}
                {phoneStatus && (
                  <p className="text-red-700 text-sm p-2">{phoneStatus}</p>
                )}
                <span className="w-full flex items-center justify-center p-4 bg-white rounded-xl mb-2">
                  <input
                    ref={s_phoneRef}
                    type="number"
                    className="outline-none border-none w-full  bg-transparent"
                    placeholder="Phone Number (11 digits only)"
                    autoComplete="off"
                    // maxLength={11}
                    name="s_phone"
                    onChange={(e) => setS_phone(e.target.value.slice(0, 11))}
                    value={s_phone}
                  />
                </span>
                {/* PASSWORD STATUS */}
                {passwordStatus && (
                  <p className="text-red-700 text-sm p-2">{passwordStatus}</p>
                )}
                <span className="w-full flex items-center justify-center p-4 gap-1 bg-white rounded-xl mb-2">
                  <input
                    ref={s_passwordRef}
                    type="password"
                    className="outline-none border-none w-full  bg-transparent"
                    placeholder="Password"
                    autoComplete="off"
                    name="s_password"
                    onChange={(e) => setS_password(e.target.value)}
                    value={s_password}
                  />
                </span>
                <span className="w-full flex items-center justify-center p-4 gap-1 bg-white rounded-xl mb-4">
                  <input
                    ref={s_cpasswordRef}
                    type="password"
                    className="outline-none border-none w-full bg-transparent"
                    placeholder="Confirm Password"
                    autoComplete="off"
                    name="s_cpassword"
                    onChange={(e) => setS_cpassword(e.target.value)}
                    value={s_cpassword}
                  />
                </span>
              </div>
              <div className=" mb-4">
                <p className="text-sm">
                  By clicking the Create Account button you already read and
                  agree to our{' '}
                  <Link
                    to="/terms-and-conditions"
                    className="underline hover:font-medium"
                    target="_blank"
                  >
                    Terms and conditions
                  </Link>
                  .
                </p>
              </div>

              <button
                onClick={handleRegister}
                type="submit"
                className="main-btn-large"
              >
                CREATE ACCOUNT
              </button>
            </form>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">OR</p>
            </div>
            <Link
              className="px-7 py-3 bg-blue-50 text-gray-800 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
              // style={{ backgroundColor: '#3b5998' }}
              to="/become-a-mentor/#step-1"
              role="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign up as a MENTOR
            </Link>

            <div className="md:hidden block mt-10">
              <p className="leading-normal">
                If don't have an account <br />
                You can{' '}
                <Link to="/login" className="text-blue-700 font-semibold">
                  Login here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
