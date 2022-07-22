import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import GetSelectedUser from "./pages/GetSelectedUser"
import GetUsers from "./pages/GetUsers"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<GetUsers />} />
        <Route path="/:id" element={<GetSelectedUser />} />
      </Route>
    </Routes>
  )
}

export default App
