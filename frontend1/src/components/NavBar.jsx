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

const Navbar = ({
  handleChangeImg,
  handleDeleteImg,
  image,
  handleCreateContact,
  setFilteredUserInput,
  handleAddMessage,
  messages,
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
  handleEditContact,
  closeModal,
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
                  handleChangeImg={handleChangeImg}
                  handleDeleteImg={handleDeleteImg}
                  image={image}
                  handleCreateContact={handleCreateContact}
                  handleEditContact={handleEditContact}
                  handleAddMessage={handleAddMessage}
                  // handleDeleteMessage={handleDeleteMessage}
                  messages={messages}
                  note={note}
                  setNote={setNote}
                  gender={gender}
                  setGender={setGender}
                  isEditing={isEditing}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  handleCreate={handleCreate}
                  closeModal={closeModal}
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
