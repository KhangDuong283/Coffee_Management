import Navbar from './../../../includes/Navbar/Navbar';
import Header from './../../../includes/Header/Header';
import QuickAccess from '../../../components/Dashboard/QuickAccess/QuickAccess';
import NewOrders from "../../../components/Dashboard/NewOrders/NewOrders";
import { useSelector } from 'react-redux';
import LineChart from '../../../components/Dashboard/LineChart/LineChart';
import BarChartComponent from '../../../components/Dashboard/LineChart/BarChart';

function Dashboard() {

  return (
    <div className="body__content">
      <Navbar />
      <div className="main">
        <Header />

        {/* Dashboard content */}
        <h3 className='separator'>Overview</h3>
        <QuickAccess />
        <h3 className='separator'>Profit branch chart</h3>
        <LineChart />
        <h3 className='separator'>Profit branch chart</h3>
        <BarChartComponent />
      </div>
    </div>
  )
}

export default Dashboard;
