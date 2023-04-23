import Board from "../pages/Board";
import Log from "../pages/Log";
import Reg from "../pages/Reg";
import Profile from "../pages/Profile";

export const privateRoutes = [
    {path: '/board', component: Board, exact: true},
    {path: '/log', component: Log, exact: true},
    {path: '/reg', component: Reg, exact: true},
    {path: '/profile', component: Profile, exact: true},
]

export const publicRoutes = [
    {path: '/board', component: Board, exact: true},
    {path: '/log', component: Log, exact: true},
    {path: '/reg', component: Reg, exact: true},
    {path: '/profile', component: Profile, exact: true},
]