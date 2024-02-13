import { Outlet, Link } from "react-router-dom";
import Contexte from "./Contexte";

import './App.css'

function App() {


  const dades = {
  }

  return (
    <Contexte.Provider value={dades}>
      <div className="p-[50px] font-['DM_Sans']">

        <div className="flex justify-between mb-10">
          <Link className="border px-4 py-2 bg-blue-700 text-white" to="/" >Inici</Link>
          <Link className="border px-4 py-2 bg-blue-700 text-white" to="/test">Test</Link>
          <Link className="border px-4 py-2 bg-blue-700 text-white" to="/matrix">Matrix</Link>
          <Link className="border px-4 py-2 bg-blue-700 text-white" to="/LuisModel">LuisModel</Link>
        </div>

        <div className="bg-[#161717] p-10">
          <Outlet />
        </div>

      </div>
    </Contexte.Provider>
  )
}

export default App
