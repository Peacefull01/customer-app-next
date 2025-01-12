import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

// API URL
const API_URL = 'http://localhost:3001'

// Types
interface User {
  id: number
  email: string
  username: string
  password: string
  role: string
}

interface FormValues {
  email: string
  username: string
  password: string
  role: string
}

// Basic validation schema
const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
  role: Yup.string()
    .required('Role is required')
})

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [userSearch, setUserSearch] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    getUsers()
  }, [])

  // Get all users
  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>(`${API_URL}/users`)
      setUsers(response.data)
    } catch (error) {
      alert('Error loading users')
    }
  }

  // Add new user
  const handleAdd = async (values: FormValues) => {
    try {
      await axios.post(`${API_URL}/users`, values)
      await getUsers()
      setShowAddForm(false)
      alert('User added!')
    } catch (error) {
      alert('Error adding user')
    }
  }

  // Update user
  const handleEdit = async (values: User) => {
    try {
      await axios.put(`${API_URL}/users/${values.id}`, values)
      await getUsers()
      setIsEditing(null)
      alert('User updated!')
    } catch (error) {
      alert('Error updating user')
    }
  }

  // Delete user
  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this user?')) {
      try {
        await axios.delete(`${API_URL}/users/${id}`)
        await getUsers()
        alert('User deleted!')
      } catch (error) {
        alert('Error deleting user')
      }
    }
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }
  console.log(userSearch)

  return (
    <div className="container mt-5 position-relative">
      {/* Header */}
      <div className="d-flex justify-content-between mb-4 ">
        <div className="d-flex">
          <img src="./assets/task.png" alt="task-img" style={{ width: '45px', height: '45px' }} />
          <h1 className='custom-h1'>Customer List</h1>
        </div>
        <div className='me-2' style={{ marginTop: '9px' }}>
          <button onClick={handleLogout} className="position-relative py-1 ps-4 btn btn-logOut">
            <span className="position-absolute material-symbols-rounded" style={{ left: '0' }}>
              logout
            </span>
            Logout
          </button>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center my-2' >
        <div className=' position-relative' >
          <input type="search" className='form-control ps-4 mt-1' style={{ marginTop: '5px', borderRadius: '20px', backgroundColor: '#d0cdcd2e' }} placeholder='search...' name="search" id="search-user" onChange={(e) => setUserSearch(e.target.value)} />
          <span className="material-symbols-rounded position-absolute p-1" style={{
            top: '10px',
            right: '15px',
            opacity: ' 1',
            fontSize: '19px',
            borderRadius: '25px',
            cursor: 'pointer'
          }}>
            search
          </span>
        </div>
        <div className=' text-end ' style={{ marginTop: '2px' }}>
          <button onClick={() => setShowAddForm(true)} className="py-1 btn btn-successes me-2">
            Add User
          </button>

        </div>
      </div>
      {/* Add User Form */}
      {showAddForm && (
        <>
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ zIndex: 1040 }} onClick={() => setShowAddForm(false)} />
          <div className="position-fixed top-50 start-50 translate-middle" style={{ zIndex: 1050, width: '90%', maxWidth: '500px' }}>
            <div className="card p-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="m-0">Add New User</h3>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddForm(false)}
                  />
                </div>
                <Formik<FormValues>
                  initialValues={{ email: '', username: '', password: '', role: 'user' }}
                  validationSchema={UserSchema}
                  onSubmit={handleAdd}
                >
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <Field name="username" className="form-control" />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <Field name="email" type="email" className="form-control mail-text" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <Field name="password" type="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <Field name="role" as="select" className="form-control">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="person">Person</option>
                      </Field>
                      <ErrorMessage name="role" component="div" className="text-danger" />
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">Save</button>
                      <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-bordered data-table" style={{ height: 'auto' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} className={`${((user.username.toLocaleLowerCase().includes(userSearch)) || (userSearch.toLocaleLowerCase() === '')) ? '' : 'd-none'}`}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div className='bg-successive '>
                    <span className="">
                      {user.role}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <select
                      className="form-select"
                      style={{ width: 'auto', minWidth: '100px' }}
                      onChange={(e) => {
                        if (e.target.value === 'edit') {
                          setIsEditing(user.id);
                        } else if (e.target.value === 'delete') {
                          handleDelete(user.id);
                        } else if (e.target.value === 'view') {
                          router.push(`/customers/${user.id}`)
                        }
                      }
                      }
                    >
                      <option value="" disabled selected>Actions</option>
                      <option value="view">View Details</option>
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Form */}
      {isEditing !== null && (
        <>
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ zIndex: 1040 }} onClick={() => setIsEditing(null)} />
          <div className="position-fixed top-50 start-50 translate-middle" style={{ zIndex: 1050, width: '90%', maxWidth: '500px' }}>
            <div className="card p-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="m-0">Edit User</h3>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsEditing(null)}
                  />
                </div>
                <Formik<User>
                  initialValues={users.find(u => u.id === isEditing) || users[0]}
                  validationSchema={UserSchema}
                  onSubmit={handleEdit}
                >
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <Field name="username" className="form-control" />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <Field name="email" type="email" className="form-control" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <Field name="password" type="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <Field name="role" as="select" className="form-control">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="person">Person</option>
                      </Field>
                      <ErrorMessage name="role" component="div" className="text-danger" />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">Save</button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(null)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
