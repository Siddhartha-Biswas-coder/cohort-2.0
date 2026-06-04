import React from "react";
import { useSelector } from "react-redux";
import UserDropDown from "./UserDropDown";

const SidebarFooter = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="mt-auto border-t border-white/10 pt-4">
      <UserDropDown user={user}/>
    </div>
  );
};

export default SidebarFooter;
