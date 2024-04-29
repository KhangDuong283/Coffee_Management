import MenuList from "../../../components/Menu/MenuList"
import "./OrderPost.css"
import Order from '../../../components/Order/Order';

export default function OrderPost() {
  return (
    <div className='row post p-0 m-0'>
      <div className="col-8 menu">
        <MenuList />
      </div>

      <div className="col-3 order">
        <Order />
      </div>
    </div>
  )
}
