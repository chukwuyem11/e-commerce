import React,  {useState, createRef} from "react";
import styles from "../styles/Home.module.css";
import { Text, Box, Button, Flex, Spacer, Image,   Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, IconButton, Divider, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider, } from "@chakra-ui/react";
  import { Icon, useDisclosure } from "@chakra-ui/react"
  import {   RiShoppingCartLine, RiDeleteBin5Line } from "react-icons/ri";
  import {   GrAdd, GrSubtract } from "react-icons/gr";
  import {   ImCancelCircle } from "react-icons/im";
  import {   GiHamburgerMenu } from "react-icons/gi";

  import { useRouter } from 'next/router'



import {
  signIn,
  signOut,
  useSession,
  getSession,
  getCsrfToken,
} from "next-auth/client";
import Link from 'next/link'


const Heading = (props) => {
  if (typeof window === "undefined") return 500;

  
    const [scrollPos, setScrollPos] = useState(window.pageYOffset);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const router = useRouter()
    
    

  
    // On Scroll
    const onScroll = () => {
      setScrollPos(window.pageYOffset);
    };
  
    // Add and remove the window listener
    React.useEffect(() => {
      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    });

    console.log(scrollPos > 20 ? "maki" : "kata")
    const [session, loading] = useSession();
    console.log(session)
    console.log(useSession())
    console.log(loading)



  
  return (
    <Box >
        
        <Flex     w="100%"   bg= "#BCE2A6" boxShadow =  "lg" h= "75px">
            <Box p={5} >
            <Link href="/home">
  <Text fontSize="20px" fontWeight="bold" color="#ffffff"> Todo List</Text>
  </Link>

            </Box>
            <Spacer/>
           
            
            
            
           
            <Box p={5}>
            {!session ? (
          <div>
            {/* <Button onPress={() => signIn("github")}>GitHub Connect</Button> */}
            <Button onClick={signIn} colorScheme="green" color="#ffffff" size="sm">
              Sign In
            </Button>
          </div>
        ) : (
          <>
            {/* <span>{session.user.name}</span>
            {session.user.image && (
              <img
                src={session.user.image}
                style={{ width: "25px", borderRadius: "50%" }}
              />
            )} */}
            <Button onClick={signOut} colorScheme="green" color="#ffffff" size="sm">
              Sign Out
            </Button> </> )}
            </Box>

        </Flex>
      <Flex justify="center" mt="50px">{props.children}</Flex>
      
      <Box  mt="50px" position="relative" alignItems="bottom">
        <Flex bg="#BCE2A6
" p={5}>
          <Box><Text color="#ffffff" fontSize="17px">copyright 2020</Text></Box>
          <Spacer/>
          <Box><Text  color="#ffffff" fontSize="17px">Built by TNSOF</Text></Box>
        </Flex>
      </Box>
      </Box>

  );
};


export default Heading;
