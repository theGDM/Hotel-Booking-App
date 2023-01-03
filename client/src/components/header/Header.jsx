import React from 'react'
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPlane, faTaxi, faCar, faPerson, faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';


function Header(props) {
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]);

    const [openOptions, setOpenOptions] = useState(false);
    const [destination, setDestination] = useState("");
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });

    const navigate = useNavigate(); //Now we can direct our users to any page, and in our case hotels page
    const handleOption = (name, operation) => {
        setOptions((prev) => { //it will take the previous state
            return {
                ...prev, //dereferencing the previous state object
                [name]: operation == "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }
    
    const { dispatch } = useContext(SearchContext);
    const { user } = useContext(AuthContext);

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload :{destination, dates, options}});
        navigate('/hotels', {
            state: {
                destination,
                dates, 
                options
            }
        });
    }

  return (
      <div className="header">
          <div className={props.type == "list" ? "headerContainer listMode" : "headerContainer"}>
              <div className="headerList">
                  <div className="headerListItems active">
                    <FontAwesomeIcon icon={faBed} />
                     <span>Stays</span>
                  </div>
                  <div className="headerListItems">
                      <FontAwesomeIcon icon={faPlane} />
                      <span>Flights</span>
                  </div>
                  <div className="headerListItems">
                      <FontAwesomeIcon icon={faCar} />
                      <span>Car rentals</span>
                  </div>
                  <div className="headerListItems">
                      <FontAwesomeIcon icon={faBed} />
                      <span>Attaractions</span>
                  </div>
                  <div className="headerListItems">
                      <FontAwesomeIcon icon={faTaxi} />
                      <span>Airport taxis</span>
                  </div>
              </div>
              { props.type != "list" &&
                <>
                <h1 className='headerTitle'>A lifetime of discounts? It's Genius.</h1>
              <p className="headerDesc">
                   Get rewarded for your travels - unlock instant savings of 10% or more
                   with a free bookmyhotel account.
              </p>
              {!user && <button className="headerBtn">Sign in / Register</button>}
              <div className="headerSearch">
                  <div className="headerSearchItem">
                      <FontAwesomeIcon icon={faLocationDot} className='headerIcon' />
                      <input type="text" placeholder='Where are you going?' className='headerSearchInput'onChange={(e) => {setDestination(e.target.value)}}/>
                  </div>
                  <div className="headerSearchItem">
                      <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                      <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "dd/MMM/yyyy")} to ${format(dates[0].endDate, "dd/MMM/yyyy")}`}</span>
                      {openDate && <DateRange editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} className='date' minDate={new Date()}/>} 
                  </div>
                  <div className="headerSearchItem">
                      <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                      <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult • ${options.children} children • ${options.room} room`}</span>
                      {openOptions && <div className="options">
                          <div className="optionItem">
                              <span className="optionText">Adult</span>
                              <div className="optionCounter">
                                  <button disabled={options.adult <= 1} className='optionCounterButton' onClick={() => handleOption("adult", "d")}>-</button>
                                  <span className="optionCounterNumber">{options.adult}</span>
                                  <button className='optionCounterButton' onClick={() => handleOption("adult", "i")}>+</button>
                              </div>
                          </div>
                          <div className="optionItem">
                              <span className="optionText">Children</span>
                              <div className="optionCounter">
                                  <button disabled={options.children <= 0} className='optionCounterButton' onClick={() => handleOption("children", "d")}>-</button>
                                  <span className="optionCounterNumber">{options.children}</span>
                                  <button className='optionCounterButton' onClick={() => handleOption("children", "i")}>+</button>
                              </div>
                          </div>
                          <div className="optionItem">
                              <span className="optionText">Room</span>
                              <div className="optionCounter">
                                  <button disabled={options.room <= 1} className='optionCounterButton' onClick={() => handleOption("room", "d")}>-</button>
                                  <span className="optionCounterNumber">{options.room}</span>
                                  <button className='optionCounterButton' onClick={() => handleOption("room", "i")}>+</button>
                              </div>
                          </div>
                      </div>}
                  </div>
                  <div className="headerSearchItem">
                      <button className="headerBtn" onClick={handleSearch}>Search</button>
                  </div>
              </div>
              </>}
          </div>
    </div>
  )
}

export default Header