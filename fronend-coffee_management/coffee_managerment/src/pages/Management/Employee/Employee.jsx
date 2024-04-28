import Navbar from "../../../includes/Navbar/Navbar"
import Header from "../../../includes/Header/Header"
import EmployeeList from "../../../components/Employee/EmployeeList/EmployeeList"
export default function Employee() {
  return (
    <div className="body__content">
      <Navbar />
      <div className="main">
        <Header />

        <h3 className='separator'>Employee list</h3>
        <EmployeeList />

      </div>
    </div>
  )
}
