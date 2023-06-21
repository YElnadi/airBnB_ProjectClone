import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import DatePicker from "react-date-picker"
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useModal } from "../../context/Modal";
import { getSingleSpotDetails } from "../../store/spots";
import DisplayDate from "../DisplayDate";



// DATE PICKER COMPONENT
const SearchDate = () => {
    const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { closeModal } = useModal();


  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const confirm = async (e) =>{
    closeModal() 
    
    // history.push('/')
  }
  
  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    <DisplayDate startDate={ranges.selection.startDate} endDate={ranges.selection.endDate} />
  }

//   const startDate_day = startDate.getUTCDate()
//   const endDate_day = endDate.getUTCDate()

  console.log('start date', startDate)
  console.log('end date', endDate)

  

  return (
    <>
    <div>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
    </div>
    <div> <button onClick={confirm}>Confirm</button> </div>
    </>
  );
};

export default SearchDate;
