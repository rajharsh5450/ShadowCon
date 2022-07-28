import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { FcMenu, FcAbout, FcHome } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

const Navbar = () => (
  <Flex p="2" borderBottom={"1px"} borderColor="gray.200" position={"relative"} bg="gray.50" >
    <Box fontSize={"3xl"} fontWeight="bold" color="blue.400">
      <Link href={"/"} paddingLeft="2">
        ShadowCon
      </Link>
    </Box>
    <Spacer />
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FcMenu />}
          variant="ghost"
          colorScheme="red"
        />
        <MenuList>
          <Link href={"/"} passHref>
            <MenuItem icon={<FcHome />}> Home </MenuItem>
          </Link>

          <Link href={"/search"} passHref>
            <MenuItem icon={<BsSearch />}> Search </MenuItem>
          </Link>

          <Link href={"/search?purpose=for-sale"} passHref>
            <MenuItem icon={<FcAbout />}> Buy </MenuItem>
          </Link>

          <Link href={"/search?purpose=for-rent"} passHref>
            <MenuItem icon={<FiKey />}> Rent </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  </Flex>
);

export default Navbar;
