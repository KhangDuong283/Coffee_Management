import Navbar from './../../../includes/Navbar/Navbar';
import Header from './../../../includes/Header/Header';
import QuickAccess from '../../../components/Dashboard/QuickAccess/QuickAccess';
import NewOrders from "../../../components/Dashboard/NewOrders/NewOrders";
import { useSelector } from 'react-redux';
import LineChart from '../../../components/Dashboard/LineChart/LineChart';

function Dashboard() {

  return (
    <div className="body__content">
      <Navbar />
      <div className="main">
        <Header />

        {/* Dashboard content */}
        <h3 className='separator'>Overview</h3>
        <QuickAccess />
        <h3 className='separator'>Line chart</h3>
        <LineChart />
      </div>
    </div>
  )
}

export default Dashboard;
