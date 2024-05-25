import React from 'react';

import { TimeNotifier } from './timesEventNotifier.js';

export function Times(props) {

    const [availableTimes, setAvailableTimes] = React.useState(null)
    const [selectedDate, setSelectedDate] = React.useState('')
    const [selectedTime, setSelectedTime] = React.useState('')
    let dateDropdownRef = React.useRef()
    let timeDropdownRef = React.useRef()
    //
    React.useEffect(() => {
        TimeNotifier.addHandler(handleTimeEvent);

        return () => {
            TimeNotifier.removeHandler(handleTimeEvent);
        };
    }, []);

    React.useEffect(() => {
        if (availableTimes) {
            setSelectedDate(availableTimes.days_and_times[0].date)
            setSelectedTime(availableTimes.days_and_times[0].times[0])
        }
        return () => {
        }
    }, [availableTimes])

    function handleTimeEvent(event) {
        setAvailableTimes(event)
        console.log(event)
    }

    function updateSelectedDate(event) {
        console.log(event)
        const newDate = event.target.innerText
        setSelectedDate(newDate)
        showDates()
    }

    function updateSelectedTime(event) {
        const newTime = event.target.innerText
        setSelectedTime(newTime)
        showTimes()
    }

    function createDateSelector() {
        const dateButtonArray = [];
        for (const day of availableTimes.days_and_times) {
            dateButtonArray.push(
                <button key={day.date} className='event' onClick={updateSelectedDate}>
                    {day.date}
                </button>
            );
        }
        return dateButtonArray;
    }

    function createTimeSelector() {
        const timeContainers = [];
        for (const day of availableTimes.days_and_times) {
            timeContainers.push(
                <div key={day.date} className='event'>
                    {day.times.map(time => {
                        return(
                            <button key={day.date+time} onClick={updateSelectedTime}>{time}</button>
                        )
                    })}
                </div>
            );
        }
        return timeContainers;
    }

    function showDates() {
        if (dateDropdownRef.current.style.display === 'flex') {
            dateDropdownRef.current.style.display = 'none'
        } else {
            dateDropdownRef.current.style.display = 'flex'
        }
    }

    function showTimes() {
        if (timeDropdownRef.current.style.display === 'flex') {
            timeDropdownRef.current.style.display = 'none'
        } else {
            timeDropdownRef.current.style.display = 'flex'
        }
    }

    return (
        <div id='time-selection-row'>
            {availableTimes && (
                <>
                    <div>
                        <button id='date-selector' onClick={showDates}>{selectedDate}</button>
                        <div id='date-dropdown' ref={dateDropdownRef}>
                            {createDateSelector()}
                        </div>
                    </div>
                    <div>
                        <button id='time-selector' onClick={showTimes}>{selectedTime}</button>
                        <div id='time-dropdown' ref={timeDropdownRef}>
                            {createTimeSelector()}
                        </div>
                    </div>
                </>
                )}
        </div>
    );
}