import Navbar from "../../../includes/Navbar/Navbar"
import Header from "../../../includes/Header/Header"
import SaleList from "../../../components/Sales/SaleList"

export default function Sales() {
  return (
    <div className="body__content">
      <Navbar />
      <div className="main">
        <Header />

        {/* Sales list */}
        <h3 className='separator'>Order list</h3>
        <SaleList />

      </div>
    </div>
  )
}
