import './list.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch.js';

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  
  const { data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);
  const handleClick = () => {
      reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" value={destination} onChange={(e) => {setDestination(e.target.value)}}/>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MMM/yyyy")} to ${format(dates[0].endDate, "dd/MMM/yyyy")}`}</span>
              {openDate && <DateRange onChange={(item) => { setDates([item.selection]) }} ranges={dates} minDate={new Date()} />}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                <span className="lsOptionText">Min price <small>per night</small></span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Max price <small>per night</small></span>
                <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Adult <small>per night</small></span>
                <input type="number" className="lsOptionInput" min={1} value={options.adult} onChange={(e) => setOptions({ ...options, adult: e.target.value })} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Children <small>per night</small></span>
                <input type="number" className="lsOptionInput" min={0} value={options.children} onChange={(e) => setOptions({ ...options, children: e.target.value })} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Rooms <small>per night</small></span>
                <input type="number" className="lsOptionInput" min={1} value={options.room} onChange={(e) => setOptions({...options, room : e.target.value})} />
              </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading == true ? ("Loading") : (
              <>
                {data.map(item => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;