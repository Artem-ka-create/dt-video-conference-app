import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ( {allowedRoles} ) => {
    const {auth} = useAuth();
    const location = useLocation();
    console.log(auth);


    function exists(){
        let result = false;
        allowedRoles.forEach(element => {
            console.log(element);
            console.log(auth.roles);
            
            auth.roles.forEach(el2 => {
                console.log(element, "___", el2);
                if(element.name === el2.name){
                    console.log("SAME");
                    result = true;
                }
            })
        });
        console.log("RESULT -->", result);
        return result;
    }

    return (
        exists()
            ? <Outlet />
            : auth?.user 
                ? <Navigate to = "/main" state={{ from: location }} replace />
                : <Navigate to ="/signin" state={{from: location}} replace />

    )
}

export default RequireAuth;