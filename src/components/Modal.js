import { useState } from "react"
import axios from "../api/axios"
import { FiX } from "react-icons/fi"

const Modal = ({ setIsOpen, id }) => {
  const [phone, setPhone] = useState("")

  const updatePhone = async event => {
    event.preventDefault()
    const res = await axios
      .put(`update-user-phone_no/${id}`, {
        phone_no: phone,
      })
      .catch(err => console.error(err.response))
    if (res?.status === 200) {
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-50 flex items-center justify-center">
      <div className="relative w-1/2 border shadow-xl rounded-md bg-white text-black">
        <button
          className="bg-white shadow-sm rounded-full p-2.5 absolute -right-4 -top-4"
          onClick={() => setIsOpen(false)}
        >
          <FiX />
        </button>
        <form onSubmit={e => updatePhone(e)} className="p-4 flex flex-col">
          <label htmlFor="phone" className="text-lg font-medium">
            Update Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="py-1.5 px-4 border border-gray-400 rounded mt-2.5"
          />
          <div className="flex justify-end mt-5">
            <button
              className="px-6 py-1.5 bg-blue-500 text-white rounded-lg"
              onClick={e => updatePhone(e)}
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
