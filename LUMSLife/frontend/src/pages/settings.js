import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { UserState } from "../UserState";

const Settings = () => {

    const userState = useContext(UserState)

    const navigate = useNavigate()

    useEffect(() => {
        
        let accountType = userState.accountType

        if (accountType == 'society') {navigate('/societySettings')}
        else if (accountType == 'student') {navigate('/studentSettings')}
        else if (accountType == 'admin') {navigate('/adminSettings')}
    }, [])

    return ( 
        <h1>Settings</h1>
    );
}
 
export default Settings;
