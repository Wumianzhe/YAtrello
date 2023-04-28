import {Outlet, Link} from "react-router-dom"
export default function Root() {
  return (
    <>
    <nav>
      <Link to={`users/1`}>
        To user1
      </Link>
    </nav>
      <Outlet/>
    </>
  )
}
