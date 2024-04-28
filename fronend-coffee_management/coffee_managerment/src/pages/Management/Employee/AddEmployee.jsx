import Navbar from "../../../includes/Navbar/Navbar"
import Header from "../../../includes/Header/Header"
import EmployeeAddForm from "../../../components/Employee/EmployeeAddForm/EmployeeAddForm"
export default function AddEmployee() {
    return (
        <div className="body__content">
            <Navbar />
            <div className="main">
                <Header />

                <h3 className='separator'>Add new employee</h3>
                <EmployeeAddForm />

            </div>
        </div>
    )
}
