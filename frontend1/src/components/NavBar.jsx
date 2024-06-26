import {
  Container,
  Text,
  Flex,
  Box,
  Spacer,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CreateContactModal } from "./CreateContactModal";
import { SearchIcon } from "@chakra-ui/icons";
// import { useState, useEffect } from 'react';

const Navbar = ({
  setUsers,
  handleChangeImg,
  handleDeleteImg,
  image,
  setImage,
  handleCreateContact,
  isLoading,
  setFilteredUserInput,
  handleAddMessage,
  handleDeleteMessage,
  messages,
  setMessages,
  note,
  setNote,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  gender,
  setGender,
  isEditing,
  isOpen,
  onOpen,
  onClose,
  handleCreate,
}) => {
  return (
    <>
      <Container maxW={"12000px"}>
        <Box py={"4"} my={"4"}>
          <Flex h={"16"}>
            <Box>
              <Text fontSize="4xl" color={"#318CE7"}>
                Contacts
              </Text>
            </Box>
            <Spacer />
            <Flex gap={4}>
              <InputGroup>
                <Input
                  type="search-bar"
                  placeholder="Search Contacts"
                  w={"300px"}
                  _focusVisible={{ border: "1px solid #ddd" }}
                  onChange={(e) => setFilteredUserInput(e.target.value)}
                />
                <InputRightElement>
                  <Container bg={"transparent"} mr={"4"}>
                    <SearchIcon />
                  </Container>
                </InputRightElement>
              </InputGroup>

              <Spacer />
              <Box>
                <CreateContactModal
                  name={name}
                  setName={setName}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  address={address}
                  setAddress={setAddress}
                  setUsers={setUsers}
                  handleChangeImg={handleChangeImg}
                  handleDeleteImg={handleDeleteImg}
                  image={image}
                  setImage={setImage}
                  handleCreateContact={handleCreateContact}
                  isLoading={isLoading}
                  handleAddMessage={handleAddMessage}
                  handleDeleteMessage={handleDeleteMessage}
                  messages={messages}
                  setMessages={setMessages}
                  note={note}
                  setNote={setNote}
                  gender={gender}
                  setGender={setGender}
                  isEditing={isEditing}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  handleCreate={handleCreate}
                />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </>
  );
};

export default Navbar;
