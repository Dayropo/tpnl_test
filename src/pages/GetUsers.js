import { useState, useEffect } from "react"
import axios from "../api/axios"
import { Link } from "react-router-dom"

const GetUsers = () => {
  const [data, setData] = useState()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getData = async () => {
      const res = await axios
        .get("get-all-users")
        .catch(err => console.error(err?.response))
      if (res?.data?.User_Details) {
        isMounted && setData(res?.data?.User_Details)
      }
    }

    getData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div className="px-16 py-16 flex justify-center items-center">
      <div className="w-3/4">
        <div className="flex w-full">
          <div className="w-1/2 py-4 border bg-slate-400 text-white text-center">
            First Name
          </div>
          <div className="w-1/2 py-4 border bg-slate-400 text-white text-center">
            Email
          </div>
        </div>
        {data?.map(user => (
          <Link to={`/${user?.user_id}`}>
            <div key={user?.user_id} className="flex w-full">
              <div className="w-1/2 py-4 border bg-slate-50 text-slate-700 text-center">
                {user?.firstname}
              </div>
              <div className="w-1/2 py-4 border bg-slate-50 text-slate-700 text-center">
                {user?.email}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GetUsers
