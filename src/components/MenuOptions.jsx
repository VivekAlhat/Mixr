import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { MdSettings, MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "../firebase/auth";

const MenuOptions = ({ displayName }) => {
  const history = useHistory();

  const handleClick = async () => {
    await signOut();
    history.push("/signin");
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar name={displayName} alignSelf="center" size="sm" mx="5" />
      </MenuButton>
      <MenuList>
        <MenuItem
          px="5"
          fontWeight="bold"
          fontSize="xl"
          as={Link}
          to="/profile"
        >
          {displayName}
        </MenuItem>
        <MenuDivider />
        <MenuGroup>
          <MenuItem icon={<MdDashboard />} as={Link} to="/dashboard">
            Dashboard
          </MenuItem>
          <MenuItem icon={<MdSettings />} as={Link} to="/settings">
            Profile Settings
          </MenuItem>
          <MenuItem icon={<FaSignOutAlt />} onClick={handleClick}>
            Sign Out
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default MenuOptions;
