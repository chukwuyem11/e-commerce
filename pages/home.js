import React, {useState, createRef} from "react"
import { Text, Box, Button, ButtonGroup, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,Input,  Stack, HStack, VStack, Flex, Spacer, Grid, GridItem, Center, Divider, Image , Container, Wrap, WrapItem, IconButton, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import Nav from "./nav"
import swr, { mutate } from "swr";
import axios from "axios";
import useSWR from "swr";
import {
  signIn,
  signOut,
  useSession,
  getSession,
  getCsrfToken,
} from "next-auth/client";
import {   AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {   RiDeleteBin6Line } from "react-icons/ri";
import {    BiEdit } from "react-icons/bi";





  const Home = () => {
    const { data, error } = useSWR("/api/todo", axios);
    const [session] = useSession();
    console.log("data")
    console.log(data)

    console.log("data")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [uptitle, setUptitle] = React.useState("");
    const [upbody, setUpbody] = React.useState("");

    const addTodo = async() => {
    
      await axios
        .post("/api/todo", {
          title: title,
          body: body,
         
        })
        .then((response) => {
          console.log(response);
          setTitle("");
          setBody("");
          mutate("/api/todo");

         
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const updateTodo = async(id) => {
      if (uptitle === "") {
        await axios
        .put(`/api/todo/${id}`, {
         
          body: upbody,
         
        })
       
        .then((response) => {
          console.log(response);
          setUptitle("");
          setUpbody("");
          mutate("/api/todo");

         
        })
        .catch((error) => {
          console.log(error);
        });
      } else if (upbody === "") {
        await axios
        .put(`/api/todo/${id}`, {
          title: uptitle,
         
         
        })
       
        .then((response) => {
          console.log(response);
          setUptitle("");
          setUpbody("");
          mutate("/api/todo");

         
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        await axios
        .put(`/api/todo/${id}`, {
          title: uptitle,
          body: upbody,
         
        })
       
        .then((response) => {
          console.log(response);
          setUptitle("");
          setUpbody("");
          mutate("/api/todo");

         
        })
        .catch((error) => {
          console.log(error);
        });
      }
      
    }

    const deleteTodo = async(id) => {
     
     await axios
      .delete(`/api/todo/${id}`)
      .then((response) => {
        console.log(response);
        mutate("/api/todo");
      })
        .catch((error) => {
          console.log(error);
        });
    }

    const getData = (body, title) => {
      setUptitle(title)
      setUpbody(body)
    }
      return(
          <Nav>
            <Flex>
              {!session ? (<Box><Text fontSize="20px" fontWeight="bold">Please Sign In To View Your Todos</Text></Box>): (<Box>
              <Text fontSize="20px" fontWeight="bold">Create New Todo</Text>

              <Box border="1px" borderRadius="5px" borderColor="#f5f5f5" padding="10px"><Flex justifyContent="space-between"> <Button   colorScheme="green" size="sm" mr="5px" p="20px" onClick={addTodo}>
              Add
            </Button><Input border="0px" placeholder="Title" mr="5px" _focus={{
    border : "1px",  borderColor : "#f5f5f5"
  }} type="email" onChange={(e) => setTitle(e.target.value)}
          
          value={title}/> <Input border="0px" placeholder="Body" _focus={{
            border : "1px",  borderColor : "#f5f5f5"
          }} type="email" onChange={(e) => setBody(e.target.value)}
                  
                  value={body}/></Flex>  </Box>
                  {data?.data?.names.length === 0 ? (<Box mt="50px"><Center><Text fontSize="20px" fontWeight="bold"> No Todos, Add some</Text></Center></Box>) : (   <Box mt="30px" > 
{data?.data?.names.map((name ) => (   <Flex key={name.id}><Box mt="20px" w="100%">
<Box w="100%">
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box
         h="30%"
          color="white"
         
          bg="#BCE2A6"
          rounded="md"
          shadow="md"
          p="5px"
        >
          <Box border="1px" borderRadius="5px" borderColor="#f5f5f5" padding="10px"><Flex justifyContent="space-between"> <Button   colorScheme="green" size="sm" mr="5px" p="20px" onClick={() => updateTodo(name.id)}>
              Edit
            </Button><Input border="0px" placeholder="Title" color="#000000" mr="5px" _focus={{
    border : "1px",  borderColor : "#f5f5f5"
  }} type="email" onChange={(e) => setUptitle(e.target.value)}
          
          value={uptitle}/> <Input border="0px" placeholder="Body" color="#000000" _focus={{
            border : "1px",  borderColor : "#f5f5f5"
          }} type="email" onChange={(e) => setUpbody(e.target.value)}
                  
                  value={upbody}/></Flex>  </Box>
        </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal> </Box>
                    <Accordion allowMultiple allowToggle>
 

  <AccordionItem>
    {({ isExpanded }) => (
      <>
        
          <AccordionButton _hover={{
    background: "#BCE2A6"
  }}>
            <Box flex="1" textAlign="left" >
            <Text fontSize="20px" fontWeight="bold">
              {name.title}
              </Text>
            </Box>
            {isExpanded ? (
             
              <AiOutlineMinus fontSize="12px" />
            ) : (
              <AiOutlinePlus fontSize="12px" />
            )}
          </AccordionButton>
       
        <AccordionPanel pb={4}>
          {name.body}
        </AccordionPanel>
      </>
    )}
  </AccordionItem>
</Accordion> </Box> <Flex justify="center" mt="25px"><IconButton mx="10px" aria-label="Search database" colorScheme="blue" icon={<BiEdit onClick={onOpen}/>} /><IconButton mx="10px"  aria-label="Search database" colorScheme="red" icon={<RiDeleteBin6Line onClick={() => deleteTodo(name.id)} />} /></Flex>
</Flex> ))}
</Box>   )}

             
          </Box>)}
          
          </Flex>
          </Nav>
      )
  }

  export default Home