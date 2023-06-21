import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TableComponent from "./component/TableComponent";
import FormComponent from "./component/FormComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginForm from "./component/login";

function App() {
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState();
  const token = `Bearer ` + `${localStorage.getItem("Token")}`;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = token;
    setUserType(localStorage.getItem("User_Type"));
    getAllData();
  }, [userType]);
  const loginApi = (value) => {
    axios
      .post("http://localhost:8080/api/login", value)
      .then(function (response) {
        localStorage.setItem("Token", response.data.Token);
        localStorage.setItem("User_Type", response.data.type);
        setUserType(response.data.type);
        alert("Login Succsessfull!");
        getAllData();
      })
      .catch(function (error) {
        alert("Something is wrong!");
      });
  };
  const getAllData = () => {
    axios
      .get("http://localhost:8080/api/list", token)
      .then(function (response) {
        setData(response.data.createdTask);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  };
  const createData = (value) => {
    axios
      .post("http://localhost:8080/api/create", value)
      .then(function (response) {
        getAllData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteApi = (id) => {
    axios
      .delete(`http://localhost:8080/api/delete/${id}`)
      .then(function (response) {
        getAllData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateApi = (value) => {
    axios
      .put(`http://localhost:8080/api/update/${value.id}`, value)
      .then(function (response) {
        getAllData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <div class="d-flex p-5">
        <LoginForm loginApi={loginApi} />
        {userType === "main" ? <FormComponent createData={createData} /> : null}
      </div>
      <h2>Domain list</h2>
      <TableComponent data={data} deleteApi={deleteApi} updateApi={updateApi} />
    </div>
  );
}

export default App;
