import {useAuth} from "./AuthProvider";
import {Navigate, useLocation} from "react-router";
import React, {PropsWithChildren} from "react";


interface AuthenticatedRouteProps {
    redirectTo?: string;
    inverse?: boolean;
}

export const  AuthenticatedRoute: React.FC<PropsWithChildren<AuthenticatedRouteProps>> = ({ children , inverse , redirectTo= "/login" }) =>{
    let auth = useAuth();
    let location = useLocation();


    console.log(auth.user)



    if(inverse && auth.user){
        console.log(auth.user)
        return <Navigate to={`${redirectTo}`} state={{ from: location }} replace />;

    }
    else if (!inverse && !auth.user) {
        return <Navigate to={`${redirectTo}`} state={{ from: location }} replace />;
    }

    return <>{children}</>;
}