import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogisticStatus from "./LogisticStatus";


const Home = () => {
    const usenavigate = useNavigate();



    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            usenavigate('/login');
        }
    }, [usenavigate]);
    return (
        <div>
            <div className="header">
                <Link to={"/"}>Home</Link>
                <Link style={{ float: 'right' }} to={"/login"}>Logout</Link>
            </div>
           <div><h1 className="text-center">Welcome to Home</h1></div> 
            <div><LogisticStatus/></div>

        </div>
    );
}
export default Home;