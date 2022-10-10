import React, { useState } from 'react'
import { useEffect } from 'react'
// import data from '../../data/db.json'
import axios from 'axios'

const Weather = () => {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    useEffect( () => {
        async function getCountryData() {
      const response = await  axios ('http://localhost:8000/DUMMY_DATA')
            .then(response => {
                console.log(response.data)
                setAllData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.log('Error: ' + error);
            })
        }
        getCountryData();
    }, []);


    const handleSearch = (event) => {
        let value = event.target.value;
        // console.log("value>>>", value);
        let result = []
        result = allData.filter((data) => {
            return data.name.search(value) !== -1
        })
        // console.log(result);

        setFilteredData(result)
    } 

    return (
        <div>
            <div >
                <label>Search:</label>
                <input type="text" onChange={(e) => handleSearch(e)} />
            </div>
            <div>
                {filteredData.map((weather) => {
                    return (
                        <div key={weather.id}>
                            {weather.name}
                        </div>
                    )
                })}
            </div>
        </div >

    )
}

export default Weather