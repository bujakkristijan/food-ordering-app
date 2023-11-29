import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import Swal from 'sweetalert2';
import './ListEmployeeComponent.css';

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
        <table className='table table-hover tableElement'>
            <thead className='thead-name'>
                <tr>
                    <th className='theadth'>User ID</th>
                    <th className='theadth'>First name</th>
                    <th className='theadth'>Last name</th>
                    <th className='theadth'>Username</th>
                    <th className='theadth'>Email</th>
                    <th className='theadth'>Phone number</th>
                    <th className='theadth'>Address</th>
                    <th className='theadth'>Action</th>                  
                </tr>
            </thead>
            <tbody>
              {
                  employees.map(
                      employee =>
                      <tr key= {employee.id}>
                          <td className="td-content">{employee.id}</td>
                          <td className="td-content">{employee.firstName}</td>
                          <td className="td-content">{employee.lastName}</td>
                          <td className="td-content">{employee.username}</td>
                          <td className="td-content">{employee.email}</td>
                          <td className="td-content">{employee.phoneNumber}</td>
                          <td className="td-content">{employee.address}</td>
                          <td>
                              <Link className='btn btn-success' to={`/edit-employee/${employee.id}`}>Update</Link>
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