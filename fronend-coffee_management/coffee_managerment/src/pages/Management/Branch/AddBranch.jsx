import BranchAddForm from "../../../components/Branch/BranchAddForm/BranchAddForm";
import Navbar from "../../../includes/Navbar/Navbar";
import Header from "../../../includes/Header/Header";

export default function AddBranch() {
  return (
    <div className="body__content">
      <Navbar />
      <div className="main">
        <Header />

        <h3 className='separator'>Add new branch</h3>
        <BranchAddForm />
      </div>
    </div>
  )
}
