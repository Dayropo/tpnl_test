import axios from "axios"

const baseURL = "https://interviewtst.herokuapp.com/"

export default axios.create({
  baseURL,
})
