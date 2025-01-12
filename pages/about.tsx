import { NextPage } from 'next'
import Link from 'next/link'

const About: NextPage = () => {
  return (
    <div>
      <h1>About Page</h1>
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </div>
  )
}

export default About 