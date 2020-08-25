import React, { useState } from 'react'
import UserTable from './containers/UserTable';
import AddUserForm from './containers/AddUserForm';
import EditUserForm from './containers/EditUserForm';

const App = () => {
  const usersData = [
    { id: 1, name: 'Ashutosh dixit', username: 'dixit01' },
    { id: 2, name: 'Ajay Batham', username: 'batham02' },
    { id: 3, name: 'Vishal Rajawat', username: 'rajawat03' },
  ]
  const [users, SetUserData] = useState(usersData)
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const addUser = user => {
    console.log(user)
    user.id = users.length + 1
    SetUserData([...users, user])
  }

  const deleteUser = id=>{
    SetUserData(users.filter(user=>user.id !== id))
  }

  const editRow = userlist => {
    console.log('i am edit',userlist)
    setEditing(true)
  
    setCurrentUser({ id: userlist.id, name: userlist.name, username: userlist.username })
  }
  const updateUser = (id, updatedUser) => {
    setEditing(false)
  
    SetUserData(users.map(user => (user.id === id ? updatedUser : user)))
  }
  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
      <div className="flex-large">
        {editing ? (
          <div>
            <h2>Edit user</h2>
            <EditUserForm
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser}
            />
          </div>
        ) : (
          <div>
            <h2>Add user</h2>
            <AddUserForm addUser={addUser} />
          </div>
        )}
      </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable userList={users} editRow={editRow}  deleteUser={deleteUser}/>
        </div>
      </div>
    </div>
  )
}

export default App