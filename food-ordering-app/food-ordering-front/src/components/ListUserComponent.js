import React, {useState, useEffect} from 'react'
import UserService from '../services/UserService';

const ListUserComponent = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService.getAllUsers().then((response) =>{
            setUsers(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }, [])
    
  return (
    <div className='container'>
        <h2 className='text-center'>User list</h2>
        <table className='table table-bordered table-hover'>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone number</th>
                </tr>
            </thead>
            <tbody>
              {
                  users.map(
                      user =>
                      <tr key= {user.id}>
                          <td>{user.id}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.address}</td>
                          <td>{user.phoneNumber}</td>
                      </tr>
                  )
              }
            </tbody>

        </table>

    </div>
  )
}

export default ListUserComponent