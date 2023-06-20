import axios from 'axios';
import React, { useState } from 'react';
import Popup from './Popup';
const TableComponent = ({ data, deleteApi, updateApi }) => {
  const [editPopup, setEditPopup] = useState(false)
  const [value2, setValue2] = useState({})


  const getById = (id) => {
    axios.get(`http://localhost:8080/api/byId/${id}`)
      .then(function (response) {
        setValue2(response.data.createdTask)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Domain</th>
            <th scope="col">String</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((list, index) => {
            return (
              <tr key={index}>
                <td>{list.domain}</td>
                <td>{list.string}</td>
                <td><button onClick={() => { deleteApi(list._id) }}>Delete</button></td>
                <td><button onClick={() => {
                  getById(list._id)
                  setEditPopup(true)
                }}
                >
                  Edit</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {editPopup ?
        <Popup value2={value2} updateApi={updateApi}/> : null
      }
    </div >
  );
};

export default TableComponent;