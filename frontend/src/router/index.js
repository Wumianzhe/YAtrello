import Board from "../pages/Board";
import Log from "../pages/Login";
import Reg from "../pages/Register";
import Profile from "../pages/Profile";
import FullWidthGrid from "../pages/Main";

export const privateRoutes = [
  { path: '/board', component: Board, exact: true },
  { path: '/log', component: Log, exact: true },
  { path: '/reg', component: Reg, exact: true },
  { path: '/profile', component: Profile, exact: true },
  { path: '/', component: FullWidthGrid, exact: true }
]
