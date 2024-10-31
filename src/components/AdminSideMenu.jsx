export default function AdminSideMenu() {

    return (
    <div className="min-w-full h-full">
         <ul className="menu bg-base-200 text-base-content min-h-full w-full p-4 text-lg">
            <h2 className="mt-5 mb-10 text-2xl text-center">Admin Panel</h2>
            
            <li><a>Stores</a></li>
            <li><a>Vehicles</a></li>
            <li><a>Bookings</a></li>
            <li><a>Users</a></li>
            <li><a>...</a></li>
            
        </ul>
    </div>
)
}