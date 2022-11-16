// import FirstMenu from "./components/firstmenu/FirstMenu";
import { useState } from 'react';
import contactlist from './components/contactlist'
import {
  Button, Heading, Text, Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
} from '@chakra-ui/react'


import './App.css'
import axios from 'axios';

function App() {
  const [MsgToSend, setMsgToSend] = useState("");
  const [listOfMsgSent, setlistOfMsgSent] = useState([]);


  function userToSendMsg(userdata) {

    if (MsgToSend) {

      userdata.message = MsgToSend;
      userdata.timestamp = new Date().toUTCString()
      // console.log(userdata);

      axios.post("http://localhost:3000/send", {
        userdata
      })
        .then(function (response) {
          // console.log(response.data)
          setlistOfMsgSent([response.data, ...listOfMsgSent])

        })
        .catch(function (error) {
          console.log(error);
        });
    }

    else alert("enter message")
  }
  return (
    <div className='App'>
      <div className='contactLists'>      <Heading size='sm'>Contact List</Heading>
        {contactlist.map(person => {
          return (
            <div key={person.id}>
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>

                      <Box flex='1' textAlign='left'>
                        {person.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text>  <b>Name :</b>  {person.name}</Text>
                    <Text> <b>Email :</b> {person.email} </Text>
                    <Text><b>Contact Number : </b>{person.phone}</Text>
                    <Input placeholder='Enter message to send' onChange={((e) => setMsgToSend(e.target.value))} />
                    <Button onClick={() => userToSendMsg(person)}>Send Message</Button>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          )
        })}
      </div>

      <div>
        <div>
          <Text fontSize='2xl'>List of Messages sent</Text>
          <TableContainer>
            <Table variant='striped'>

              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th >Contact Number</Th>
                  <Th >Message & OTP</Th>
                  <Th >Timestamp</Th>
                </Tr>
              </Thead>
            </Table>
          </TableContainer>
        </div>

        {listOfMsgSent.map((ele) => {
          return (
            <div>
              <TableContainer>
                <Table variant='striped'>

                  <Tbody>
                    <Tr>
                      <Td>{ele.name}</Td>
                      <Td> {ele.email}</Td>
                      <Td>{ele.phone}</Td>
                      <Td> {ele.message}</Td>
                      <Td >{ele.timestamp}</Td>
                    </Tr>

                  </Tbody>

                </Table>
              </TableContainer>

            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
