import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Error: NextPage = () => {
  const { query } = useRouter()
  const { code, desc } = query

  return (
    <div className='error' style={{ textAlign: 'center' }}>
      <div>
        { code && (
          <>
            <b>Error: </b>
            {code}
          </>
        )}
      </div>
      <div>
        { desc && (
          <>
            <b>Description: </b>
            {desc}
          </>
        )}
      </div>
      <div style={{ marginTop: 25 + 'px', color: 'blue' }}>
        <Link href="/">
          <a>Go to login</a>
        </Link>
      </div>
    </div>
  )
}

export default Error

