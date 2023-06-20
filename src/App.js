import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableComponent from './component/TableComponent';
import FormComponent from './component/FormComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    getAllData()
  }, [])
  const getAllData = () => {
    axios.get('http://localhost:8080/api/list')
      .then(function (response) {
        setData(response.data.createdTask)
        console.log('response', response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });

  }
  const createData = (value) => {
    axios.post('http://localhost:8080/api/create', value)
      .then(function (response) {
        getAllData()
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  const deleteApi = (id) => {
    axios.delete(`http://localhost:8080/api/delete/${id}`)
      .then(function (response) {
        getAllData()
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  const updateApi = (value) => {
    // debugger
    axios.put(`http://localhost:8080/api/update/${value.id}`, value)
      .then(function (response) {
        getAllData()
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  console.log('datadata', data)
  return (
    <div className="App">
      <FormComponent createData={createData} />
      <h2>Domain list</h2>
      <TableComponent data={data} deleteApi={deleteApi} updateApi={updateApi} />
    </div>
  );
}

export default App;
