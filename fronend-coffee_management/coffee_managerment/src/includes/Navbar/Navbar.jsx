import { NavLink } from "react-router-dom";
import "./NavBar.css"

export default function Navbar() {
  return (
    <div className="left-section">
      <div className="sidebar">
        <h2>Coffee Shop</h2>
        <NavLink className="item" to="/management/dashboard">
          <i className="ri-apps-line" />
          <h3>
            Dashboard
          </h3>
        </NavLink>

        <NavLink className="item" to="/management/sales">
          <i className="ri-shopping-cart-line"></i>
          <h3>
            Sales
          </h3>
        </NavLink>

        <NavLink className="item" to="/management/product">
          <i className="ri-drinks-2-fill"></i>
          <h3>
            Product
          </h3>
        </NavLink>

        <NavLink className="item" to="/management/employee">
          <i className="ri-group-fill"></i>
          <h3>
            Employee
          </h3>
        </NavLink>

        <NavLink className="item" to="/management/branch">
          <i className="ri-git-branch-line"></i>
          <h3>
            Branch
          </h3>
        </NavLink>
      </div>
    </div>

  )
}
