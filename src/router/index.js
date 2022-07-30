import Home from '../pages/home';
import Login from '../pages/login';


export const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    }, {
        path: '/login',
        component: Login,
    }
];