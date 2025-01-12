import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Post: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Post {id}</h1>
      <p>This is a dynamic route example. Post ID: {id}</p>
      <div style={{ marginTop: '20px' }}>
        <Link href="/">Back to Home</Link>
      </div>
    </div>
  )
}

export default Post 