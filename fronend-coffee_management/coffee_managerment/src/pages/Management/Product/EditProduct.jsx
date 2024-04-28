import Navbar from "../../../includes/Navbar/Navbar"
import Header from "../../../includes/Header/Header"
import ProductEditForm from "../../../components/Product/ProductEditForm/ProductEditForm"
export default function EditProduct() {
    return (
        <div className="body__content">
            <Navbar />
            <div className="main">
                <Header />

                <h3 className='separator'>Edit product</h3>
                <ProductEditForm />

            </div>
        </div>
    )
}
