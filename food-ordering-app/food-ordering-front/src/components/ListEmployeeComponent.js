import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import Swal from 'sweetalert2';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = () =>{
        UserService.getAllEmployees().then((response) =>{
            setEmployees(response.data);
            console.log(employees);
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) =>{
        console.log("ID EMPLOYEE: " + employeeId);
        UserService.deleteEmployee(employeeId).then((response) =>{
            getAllEmployees();
        }).catch(error => {
            console.log(error);
        })
    }

    const alertAreYouSureDelete = (id) =>{
       
      
          Swal.fire({
            title: 'Are you sure?',
            text: "If you click yes, employee will be deactivated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deactivate it!'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteEmployee(id);
              Swal.fire(
                'Deactivated!',
                'User has been deactivated.',
                'success'
              )
            }
          })
        }
      
    
  return (
    <div className='container'>
        <h2 className='text-center'>Employee list</h2>
        <Link to = "/create-employee" className='btn btn-success mb-2'>Create new employee</Link>
        <table className='table table-bordered table-hover'>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Address</th>
                    <th>Action</th>
                   
                </tr>
            </thead>
            <tbody>
              {
                  employees.map(
                      employee =>
                      <tr key= {employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.firstName}</td>
                          <td>{employee.lastName}</td>
                          <td>{employee.username}</td>
                          <td>{employee.email}</td>
                          <td>{employee.phoneNumber}</td>
                          <td>{employee.address}</td>
                          <td>
                              <Link className='btn btn-info' to={`/edit-employee/${employee.id}`}>Update</Link>
                              <button className='btn btn-danger' onClick={() => alertAreYouSureDelete(employee.id)}
                              style={{marginLeft:"5px"}}>Delete</button>
                          </td>
                          
                      </tr>
                  )
              }
            </tbody>

        </table>

    </div>
  )
}

export default ListEmployeeComponent