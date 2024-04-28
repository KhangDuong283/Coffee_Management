
import BranchEditForm from "../../../components/Branch/BranchEditForm/BranchEditForm";
import Header from "../../../includes/Header/Header";
import Navbar from "../../../includes/Navbar/Navbar";


export default function EditBranch() {
  return (
    <div className="body__content">
      <Navbar />
      <div className="main">
        <Header />

        <h3 className='separator'>Edit branch</h3>
        <BranchEditForm />
      </div>
    </div>
  )
}
