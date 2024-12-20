import BranchList from './../../../components/Branch/BranchList/BranchList';
import Navbar from "../../../includes/Navbar/Navbar";
import Header from "../../../includes/Header/Header";

export default function Branch() {
  return (
    <div className="body__content">
      <Navbar />
      <div className="main">
        <Header />

        <h3 className='separator'>Branch list</h3>
        <BranchList />

      </div>
    </div>
  )
}
