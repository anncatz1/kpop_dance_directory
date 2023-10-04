import React from "react";
import "./index.css";

function Header() {
  return (
    <div className="py-4 px-4 text-slate-600">
      <div className="flex justify-between items-center">
        <p className="text-3xl hover:text-slate-800 text-left p-2">
          Dance Tutorials Directory
        </p>
        {/* <div className="flex items-center space-x-4"> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Header;
