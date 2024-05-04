import React from "react";
import Admin_SideBar from "./Admin_SideBar";
import Main_Dashboard from "./Dashboard/Main_Dashboard";

const AdminDashboard = () => {
  return (
    <div className="flex w-[100%]">
     <div className="w-[18.5%]">
     <Admin_SideBar />
     
     </div>
    <div className="w-[81.5%]  bg-[#F2FCFF]">
    <Main_Dashboard/>
    </div>
    </div>
  );
};

export default AdminDashboard;
