import axios from 'axios';
import moment, { duration } from 'moment';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { BsInfoCircle } from 'react-icons/bs';

const MentorTimings = () => {
  const [selectedDay, setSelectedDay] = useState('none');
  const [selectedDuration, setSelectedDuration] = useState('none');
  const [meetingLink, setMeetingLink] = useState('To be followed');

  const [selectedStart, setSelectedStart] = useState('none');
  const [selectedEnd, setSelectedEnd] = useState('none');

  const [topic, setTopic] = useState('');

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const [timingStatus, setTimingStatus] = useState('');

  const onChangeDate = (e) => {
    const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    setDate(newDate);
  };

  useEffect(() => {
    setTimeout(() => {
      setTimingStatus('');
    }, 5000);
  }, [timingStatus]);

  const handleSubmitTiming = async (e) => {
    e.preventDefault();
    if (selectedDuration === 'none') {
      setTimingStatus('Please fill up selected DURATION.');
    } else if (selectedEnd === 'none' || selectedStart === 'none') {
      setTimingStatus('Please fill up START or END.');
    } else if (topic === '') {
      setTimingStatus('Please fill up TOPIC.');
    } else if (date <= moment(new Date()).format('YYYY-MM-DD')) {
      setTimingStatus('Choosing CURRENT DAY and below is INVALID.');
    } else if (selectedDay === 'none') {
      setTimingStatus('Please select CORRECT DAY.');
    } else {
      try {
        await axios.post(
          'http://localhost:8000/api/mentor/set-sched-timings',
          {
            duration: selectedDuration,
            start: selectedStart,
            end: selectedEnd,
            topic,
            date,
            meeting_link: meetingLink,
            day: selectedDay
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
        setSelectedDuration('none');
        setSelectedStart('none');
        setSelectedEnd('none');
        setTopic('');
        setSelectedDay('none');
        setTimingStatus('Schedule has been added.');
      } catch (err) {
        setTimingStatus(err.response.data);
        // console.log(err.response.data);
      }
    }
  };

  return (
    <section className="rounded-section">
      <div className="custom-container ">
        <h1 className="mb-4">Schedule Your Free Time</h1>
        <h3 className="mb-10">Create your free time to teach</h3>
        <div className="md:max-w-[600px] w-full mx-auto">
          <div className="flex md:flex-row flex-col gap-x-4 justify-between ">
            <div className="">
              <p className="mt-4 mb-2 font-medium">
                Select how long the meeting
              </p>
              <select
                id="duration"
                className="select-input-timings"
                name="duration"
                // defaultValue={'none'}
                value={selectedDuration}
                onChange={(e) => {
                  setSelectedDuration(e.target.value);
                }}
              >
                <option disabled={true} value="none">
                  Duration
                </option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
              </select>
            </div>
            {/* Start time */}
            <div className="">
              <p className="mt-4 mb-2 font-medium">Select Time</p>
              <div className=" flex  md:flex-row flex-col gap-2 md:items-center items-start">
                <select
                  id="duration"
                  className="select-input-timings"
                  // defaultValue={'none'}
                  value={selectedStart}
                  onChange={(e) => {
                    setSelectedStart(e.target.value);
                  }}
                  name="start"
                >
                  <option disabled={true} value="none">
                    Start
                  </option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                </select>
                <h4 className="">to</h4>
                <select
                  id="duration"
                  className="select-input-timings"
                  // defaultValue={'none'}
                  value={selectedEnd}
                  onChange={(e) => {
                    setSelectedEnd(e.target.value);
                  }}
                  name="end"
                >
                  <option disabled={true} value="none">
                    End
                  </option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className=" flex md:flex-row flex-col gap-x-5 justify-between mt-4 ">
            <div className="w-full">
              <p className="mt-4 mb-2 font-medium">Additional Info of Topic</p>
              <input
                type="text"
                className="select-input-timings cursor-auto"
                placeholder="Type something..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                name="topic"
                maxLength={75}
              />
            </div>
            {/* <div className="">
              <p className="mt-4 mb-2 font-medium">Select Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  console.log(date);
                }}
                className="select-input-timings"
                name="date"
              />
            </div> */}
            <div className="w-full">
              <p className="mt-4 mb-2 font-medium">Enter the date</p>
              <input
                type="date"
                name="date"
                id="sched-date"
                value={date}
                onChange={onChangeDate}
                className="select-input-timings"
              />
            </div>
          </div>

          <div className="w-full">
            <p className="mt-4 mb-2 font-medium">
              Enter meeting link <i className="text-gray-500">(optional)</i>
            </p>
            <input
              type="text"
              className="w-full p-3 outline-none border border-gray-600  rounded-lg cursor-auto"
              placeholder="Type something..."
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              name="meeting_link"
            />
          </div>

          <div className="mt-4 max-w-[700px]  w-full p-4 border border-gray-500 rounded-xl shadow-xl">
            <p className="mb-4 font-medium">Choose selected day</p>
            <div className="flex overflow-y-auto gap-3">
              <button
                className="booking-day-btn"
                onClick={(e) => {
                  setSelectedDay(e.target.value);
                }}
                value="Monday"
                name="day"
              >
                Monday
              </button>
              <button
                className="booking-day-btn"
                onClick={(e) => {
                  setSelectedDay(e.target.value);
                }}
                value="Tuesday"
                name="day"
              >
                Tuesday
              </button>
              <button
                className="booking-day-btn"
                onClick={(e) => {
                  setSelectedDay(e.target.value);
                }}
                value="Wednesday"
                name="day"
              >
                Wednesday
              </button>
              <button
                className="booking-day-btn"
                onClick={(e) => {
                  setSelectedDay(e.target.value);
                }}
                value="Thursday"
                name="day"
              >
                Thursday
              </button>
              <button
                className="booking-day-btn"
                onClick={(e) => {
                  setSelectedDay(e.target.value);
                }}
                value="Friday"
                name="day"
              >
                Friday
              </button>
              <button
                className="booking-day-btn"
                onClick={(e) => {
                  setSelectedDay(e.target.value);
                }}
                value="Saturday"
                name="day"
              >
                Saturday
              </button>
            </div>
            <hr className="my-6 bg-black border" />
            <div className="">
              <div className="flex justify-between">
                <h4 className="font-medium">Schedule Summary</h4>{' '}
              </div>
              <div className="mt-2  flex flex-col">
                {selectedDuration && (
                  <span
                    className="w-full p-2 rounded-2xl bg-gray-500 font-medium text-white flex md:flex-row 
                  flex-col gap-2 my-1"
                  >
                    <span className="flex gap-2 md:flex-row flex-col">
                      {' '}
                      | Duration
                      <p className="font-light"> - {selectedDuration}</p>
                    </span>

                    {selectedStart && (
                      <span className="flex gap-2 md:flex-row flex-col">
                        {' '}
                        | Start-End
                        <p className="font-light">
                          {' '}
                          - {selectedStart} to {selectedEnd}
                        </p>
                      </span>
                    )}
                  </span>
                )}

                {selectedDay && (
                  <span className="w-full p-2 rounded-2xl bg-gray-500 font-medium text-white flex md:flex-row flex-col gap-2 my-1">
                    <span className="flex gap-2 md:flex-row flex-col">
                      {' '}
                      | Date
                      <p className="font-light"> - {date}</p>
                    </span>
                    <span className="flex gap-2 md:flex-row flex-col">
                      {' '}
                      | Day
                      <p className="font-light"> - {selectedDay}</p>
                    </span>
                  </span>
                )}

                {topic && (
                  <span className="w-full p-2 rounded-2xl bg-gray-500 font-medium text-white flex md:flex-row flex-col gap-2 my-1">
                    <p>| topic - {topic}</p>
                  </span>
                )}
                {meetingLink && (
                  <span className="w-full p-2 rounded-2xl bg-gray-500 font-medium text-white flex md:flex-row flex-col gap-2 my-1">
                    <p>| Meeting Link - {meetingLink}</p>
                  </span>
                )}
              </div>
              <p className="text-sm my-4 flex md:items-center items-start  gap-1 md:text-center">
                <BsInfoCircle
                  size={20}
                  title="Be sure to check the schedule summary carefully to avoid
                misunderstanding."
                  className="md:block hidden"
                />
                Be sure to check the schedule summary carefully to avoid
                misunderstanding.
              </p>
            </div>
          </div>
          {timingStatus && (
            <p
              className={
                timingStatus === 'Schedule has been added.'
                  ? 'w-full text-green-600 mt-3'
                  : 'w-full text-red-600 mt-3'
              }
            >
              {timingStatus}
            </p>
          )}

          <div className="mt-4">
            <button className="btn-colored" onClick={handleSubmitTiming}>
              Create Schedule
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorTimings;
