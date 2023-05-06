import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import Swal from 'sweetalert2';
import './ListUserComponent.css';

const ListUserComponent = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = () =>{
        UserService.getAllUsers().then((response) =>{
            setUsers(response.data);
            
        }).catch(error =>{
            console.log(error);
        })
    }

    // const deleteUser = (userId) =>{
    //     console.log("ID EMPLOYEE: " + employeeId);
    //     UserService.deleteEmployee(employeeId).then((response) =>{
    //         getAllEmployees();
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }

    // const alertAreYouSureDelete = (id) =>{
       
      
    //       Swal.fire({
    //         title: 'Are you sure?',
    //         text: "If you click yes, employee will be deactivated!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, deactivate it!'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           deleteEmployee(id);
    //           Swal.fire(
    //             'Deactivated!',
    //             'User has been deactivated.',
    //             'success'
    //           )
    //         }
    //       })
    //     }
       
  return (
    <div className='container'>
        <h2 className='text-center'>User list</h2>
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
                </tr>
            </thead>
            <tbody>
              {
                  users.map(
                      user =>
                      <tr key= {user.id}>
                          <td className="td-content">{user.id}</td>
                          <td className="td-content">{user.firstName}</td>
                          <td className="td-content">{user.lastName}</td>
                          <td className="td-content">{user.username}</td>
                          <td className="td-content">{user.email}</td>
                          <td className="td-content">{user.phoneNumber}</td>
                          <td className="td-content">{user.address}</td>   
                      </tr>
                  )
              }
            </tbody>
        </table>
    </div>
  )
}

export default ListUserComponent