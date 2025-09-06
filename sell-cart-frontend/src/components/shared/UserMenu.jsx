import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import React from "react";
import BackDrop from "./BackDrop";
import { logOutUser } from "../../store/actions";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logOutUser(navigate));
  };

  return (
    <div>
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="Menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
            sx: { width: 160 },
          },
        }}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose} className="flex items-center gap-2">
            <BiUser className="text-xl" />
            <span className="font-bold text-[16px] mt-1">Profile</span>
          </MenuItem>
        </Link>
        <Link to="/profile/order">
          <MenuItem onClick={handleClose} className="flex items-center gap-2">
            <FiShoppingCart className="text-xl" />
            <span className="font-bold text-[16px] mt-1">Order</span>
          </MenuItem>
        </Link>

        <MenuItem onClick={handleLogout} className="flex items-center gap-2">
          <FiLogOut className="text-xl" />
          <span className="font-bold text-[16px] mt-1">Logout</span>
        </MenuItem>
      </Menu>
      {open && <BackDrop />}
    </div>
  );
};

export default UserMenu;
