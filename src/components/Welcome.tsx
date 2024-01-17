import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

function Welcome() {
    return (
        <div className="flex flex-col items-center m-5 p-6">
          <img src={Logo}></img>
          <Link to="starships" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">Enter</Link>
        </div>
      );
}
export default Welcome;