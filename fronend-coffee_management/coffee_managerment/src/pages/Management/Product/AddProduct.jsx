import Navbar from "../../../includes/Navbar/Navbar"
import Header from "../../../includes/Header/Header"
import ProductAddForm from "../../../components/Product/ProductAddForm/ProductAddForm"
export default function AddProduct() {
    return (
        <div className="body__content">
            <Navbar />
            <div className="main">
                <Header />

                <h3 className='separator'>Add new product</h3>
                <ProductAddForm />

            </div>
        </div>
    )
}
