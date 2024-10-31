import { Link } from "react-router-dom";

export default function AdminSideMenu() {

    return (
    <div className="min-w-full h-full">
         <ul className="menu bg-base-200 text-base-content min-h-full w-full p-4 text-lg">
            <h2 className="mt-5 mb-10 text-2xl text-center">Admin Panel</h2>
           
            <li><Link to="/admin-panel/stores">Stores</Link></li>
            <li><Link to="/admin-panel/vehicles">Vehicles</Link></li>
            <li><Link to="/admin-panel/bookings">Bookings</Link></li>
            <li><Link to="/admin-panel/users">Users</Link></li>
            <li><Link to="/admin-panel">...</Link></li>
            
        </ul>
    </div>
)
}