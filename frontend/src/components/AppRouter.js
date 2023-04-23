import React from 'react';
import {Route} from "react-router-dom";
import {privateRoutes} from "../router";

const AppRouter = () => {
    return (
        <div>
            {privateRoutes.map(route =>
                 <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                 />
            )}
        </div>
    );
};

export default AppRouter;