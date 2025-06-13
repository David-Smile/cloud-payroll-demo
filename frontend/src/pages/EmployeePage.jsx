import { useState, useEffect } from "react";
import API from "../services/api";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await API.post("/employees", { name, position, salary });
      setName("");
      setPosition("");
      setSalary("");
      fetchEmployees();
    } catch (err) {
      alert("Failed to add employee");
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    }
  };

  return (
    <div>
      <h2>Employee Management</h2>

      <form onSubmit={handleAddEmployee}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} required />
        <input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <button type="submit">Add Employee</button>
      </form>

      <h3>Employee List</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td><button onClick={() => handleDeleteEmployee(emp._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeePage;
