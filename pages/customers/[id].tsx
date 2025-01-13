import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface User {
  id: number
  username: string
  email: string
  phone: string
  role: string
  company: string
  department: string
  location: string
  joinDate: string
  status: string
}

const Post: NextPage = () => {
  const [data, setData] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(d => {
        const result = d.find((item: User) => item.id.toString() === id)
        setData(result)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <>
     <div>
      <button className='m-1 btn btn-custom' onClick={() => router.back()}> Previous Page</button>
      </div>
     <div className="container">
      <div className=" min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card" style={{ width: "650px", maxWidth: "95%" }}>
          <div className="card-body">
            <div className="d-flex justify-content-center ">
              <img src="../assets/task.png" alt="task-img" style={{ width: '45px', height: '45px' }} />
              <h1 className=" mb-4 border-bottom custom-h1" style={{ fontSize: '33px' }}>Customer Details</h1>
            </div>
            <div className="d-flex mb-4">
              <div className="w-100">
                <div className="row g-3">
                  <div className="col-md-6">
                    <h5>Name : {data?.username}</h5>
                  </div>
                  <div className="col-md-6">
                    <h5>Email : {data?.email}</h5>
                  </div>
                  <div className="col-md-6">
                    <h5>Phone : {data?.phone}</h5>
                  </div>
                  <div className="col-md-6">
                    <h5>Role : {data?.role}</h5>
                  </div>
                  <div className="col-md-6">
                    <h5>Company : {data?.company}</h5>
                  </div>
                  <div className="col-md-6">
                    <h5>Department : {data?.department}</h5>
                  </div>
                  <div className="col-md-6">
                    <h5>Location : {data?.location}</h5>
                  </div>
                  <div className="col-md-6">
                    <h5>Join Date : {data?.joinDate}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default Post 