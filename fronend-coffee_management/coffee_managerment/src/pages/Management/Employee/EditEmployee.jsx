import Navbar from "../../../includes/Navbar/Navbar"
import Header from "../../../includes/Header/Header"
import EmployeeEditForm from "../../../components/Employee/EmployeeEditForm/EmployeeEditForm"
export default function EditEmployee() {
    return (
        <div className="body__content">
            <Navbar />
            <div className="main">
                <Header />

                <h3 className='separator'>Add new employee</h3>
                <EmployeeEditForm />

            </div>
        </div>
    )
}
