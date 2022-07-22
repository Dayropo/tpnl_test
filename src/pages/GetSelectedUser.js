import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "../api/axios"
import { FiEdit3 } from "react-icons/fi"
import Modal from "../components/Modal"

const GetSelectedUser = () => {
  const [data, setData] = useState({})
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getData = async () => {
      const res = await axios
        .get(`get-selected-user-details/${params?.id}`)
        .catch(err => console.error(err?.response))
      console.log(res?.data)
      if (res?.data) {
        isMounted && setData(res?.data)
      }
    }

    getData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  if (data?.User_Details)
    return (
      <div className="p-16 relative">
        {isOpen && <Modal id={params.id} setIsOpen={setIsOpen} />}
        <span className="text-lg font-medium">Profile</span>
        <div>
          <p>{`Fullname: ${data?.User_Details[0]?.firstname} ${data?.User_Details[0]?.lastname}`}</p>
          <p>Email: {data?.User_Details[0]?.email}</p>
          <p>Job Area: {data?.User_Details[0]?.job_area}</p>
          <p>Job Title: {data?.User_Details[0]?.job_title}</p>
          <span className="flex justify-between items-center">
            <p>Phone Number: {data?.User_Details[0]?.phone_no}</p>
            <FiEdit3 onClick={() => setIsOpen(true)} />
          </span>

          <p>Picture Count: {data?.Related_Pictures_Count[0]?.picture_count}</p>
          <span>Picture List</span>
          <div className="flex flex-wrap">
            {data?.Related_Pictures.map((item, index) => (
              <div className="flex w-1/3 px-2.5 py-2.5" key={index}>
                <img src={item?.related_pictures} alt="related pictures" />
              </div>
            ))}
          </div>
          <p>Vehicle Count: {data?.Vehicles_Count[0]?.vehicle_counts}</p>
          <span className="font-medium">Vehicle Details</span>
          <div className="w-full flex mt-2.5">
            <div className="w-1/3 py-4 border bg-slate-400 text-white text-center">
              Vehicle Make
            </div>
            <div className="w-1/3 py-4 border bg-slate-400 text-white text-center">
              Vehicle Vin
            </div>
            <div className="w-1/3 py-4 border bg-slate-400 text-white text-center">
              Vehicle Fuel Type
            </div>
          </div>
          {data?.Vehicles_Details.map((item, index) => (
            <div className="w-full flex" key={index}>
              <div className="w-1/3 py-4 border bg-slate-50 text-slate-700 text-center">
                {item?.vehicle_make}
              </div>
              <div className="w-1/3 py-4 border bg-slate-50 text-slate-700 text-center">
                {item?.vehicle_vin}
              </div>
              <div className="w-1/3 py-4 border bg-slate-50 text-slate-700 text-center">
                {item?.fuel_type}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default GetSelectedUser
