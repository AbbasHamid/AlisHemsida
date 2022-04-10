import { useContext } from "react";
import { LoginContext } from "../pages/login";
import Link from "next/Link";

function Header() {
  const { inne, role } = useContext(LoginContext);

  return (
    <header>
      <div className="p-5 text-center header_image">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div>
            <h2 className="mb-3 header-title">Städa AB</h2>
          </div>
        </div>
      </div>

      <nav className=" navigation navbar navbar-expand-md navbar-light">
        <div className="navbar-nav">
          <Link className="header-hem" href="/">
            Hem
          </Link>
        </div>
        <div className="navbar navbar-expand-sm navbar-light w-100 d-flex flex-row-reverse hr-underline">
          {loginRole()}
        </div>
      </nav>
      <hr />
    </header>
  );
}

export default Header;

function loginRole() {
  let rolefromLS;
  if (typeof window !== "undefined") {
    rolefromLS = localStorage.getItem("role");
  }

  switch (rolefromLS) {
    case "Admin":
      return (
        <div className="navbar-nav">
          <Link className="nav-link" href="/newBooking">
            Boka städning
          </Link>
          <Link className="nav-link" href="/admin">
            Registrera
          </Link>
          <Link className="nav-link" href="/my_bookings">
            Mina Städningar
          </Link>
          <Link className="nav-link" href="/allBookings">
            Alla Bokningar
          </Link>
          <Link className="nav-link" href="/all_users">
            Lista Användarna
          </Link>
          <a onClick={handleLogout} href="/login">
            Logga ut
          </a>
        </div>
      );
      break;
    case "Customer":
      return (
        <div className="navbar-nav">
          <Link className="nav-link" href="/newBooking">
            Boka städning
          </Link>
          <Link className="nav-link" href="/my_bookings">
            Mina Städningar
          </Link>
          <a onClick={handleLogout} href="/login">
            Logga ut
          </a>
        </div>
      );
      break;
    case "Cleaner":
      return (
        <div className="navbar-nav">
          <Link className="nav-link" href="/newBooking">
            Boka städning
          </Link>
          <Link className="nav-link" href="/my_bookings">
            Mina Städningar
          </Link>
          <a onClick={handleLogout} href="/login">
            Logga ut
          </a>
        </div>
      );
      break;
    default:
      return (
        <div className="navbar-nav">
          {/*  <Link className="nav-link " href="/register">
            .
          </Link>
          <Link className="nav-link" href="/login">
            Logga in
          </Link> */}
        </div>
      );
      break;
  }

  function handleLogout() {
    localStorage.removeItem("inne");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    console.log("deleteed LS");
  }
}
