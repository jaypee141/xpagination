// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(1);

  useEffect(()=>{
    const fetchData = async(start) => {
      // try{
        axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then((response)=> {
          setLength(response.data.length);
          let jp = response.data.slice(start, start+10);
          setUser(jp);
          setPage(Math.floor(start/10) +1);
        })
        // setUser(response.data);
        // setLength(response.data.length);
        // let jp = response.data.slice(start, start+10);
        // setUser(jp);
        // setPage(Math.floor(start/10) +1);
      .catch(()=> alert("failed to fetch data"));
      // }
    }
    fetchData(start);
  }, [start]);


  const handlePrev=(e)=>{
    if (start >= 10){
      setStart(start-10);

    }
  }
  const handleNext=(e) =>{
    if (page !== (Math.floor(length/10)+1)){
      setStart(start +10);
    }

  }
  // yyyyyy




  return (
    <div className='App'>
      <h1>Employee Data Table</h1>
      <div>
      <table className='table'>
        <tr className='heading'>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        <tbody className='tbody'>
          {user.map((item)=>
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
          </tr>
          )}
        </tbody>
      </table>
      </div>
      <div className='button'>
        <button onClick={handlePrev}>Previous</button>
        <button>{page}</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}
export default App;
