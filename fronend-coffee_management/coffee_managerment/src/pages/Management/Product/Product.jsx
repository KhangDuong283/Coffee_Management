import Navbar from "../../../includes/Navbar/Navbar";
import Header from "../../../includes/Header/Header";
import ProductList from "../../../components/Product/ProductList/ProductList";

function Product() {
  return (
    <div className="body__content">
      <Navbar />
      <div className="main">
        <Header />

        <h3 className='separator'>Product list</h3>
        <ProductList />

      </div>
    </div>
  )
}
export default Product;