import { useAuthStore } from "@/store/auth.store";
import { AppBar, Avatar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { PiTrendUpDuotone } from "react-icons/pi";

interface Props {
  isTab: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export const Navbar = ({ isTab, setIsOpen, isOpen }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ background: "white", color: "#6B7280" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          <MdMenu size={30} className="" />
        </div>
        <Avatar onClick={handleMenu}>
          <FaUserCircle className="text-3xl" />
        </Avatar>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem disabled={true} onClick={handleClose}>
            Perfil
          </MenuItem>
          <MenuItem disabled={true} onClick={handleClose}>
            Configuraciones
          </MenuItem>
          <MenuItem onClick={logoutUser}>Cerrar Sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
