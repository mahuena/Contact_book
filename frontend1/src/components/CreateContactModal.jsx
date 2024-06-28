import { BiAddToQueue } from "react-icons/bi";
import { useState } from "react";
// @ts-ignore
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  ModalFooter,
  Image,
  IconButton,
  Textarea,
  Tag,
  // Editable,
  // EditablePreview,
  // EditableTextarea,
} from "@chakra-ui/react";
import { CiEdit, CiTrash } from "react-icons/ci";
// @ts-ignore
export const CreateContactModal = ({
  handleAddMessage,
  // handleDeleteMessage,
  messages,
  note,
  setNote,
  image,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  gender,
  setGender,
  handleEditContact,
  handleChangeImg,
  handleDeleteImg,
  handleCreateContact,
  isEditing,
  isOpen,
  onClose,
  handleCreate,
  closeModal,
}) => {
  const [isLoading, s] = useState(false);
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  let size = "xl";

  return (
    <>
      <Button onClick={handleCreate}>
        <BiAddToQueue size={20} key={size} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={size}
        scrollBehavior={"inside"}
        style={{ width: "700px" }}
      >
        <ModalOverlay />
        <form onSubmit={isEditing ? handleEditContact : handleCreateContact}>
          <ModalContent>
            <ModalHeader>
              {isEditing ? "Contact Update" : "New Contact"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={"6"}>
              <Flex
                style={{
                  flexDirection: "column",
                  position: "relative",
                  width: "150px",
                  height: "150px",
                  margin: "auto",
                }}
              >
                <Input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleChangeImg}
                />
                <Image
                  id="output"
                  src={image}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                />
                <Flex gap={3} my={"10px"} m={"auto"}>
                  <IconButton
                    variant="ghost"
                    colorScheme="green"
                    size={"sm"}
                    aria-label={"See the info"}
                    icon={<CiEdit size={20} />}
                    onClick={() => document.getElementById("fileInput").click()}
                  />
                  <IconButton
                    variant="ghost"
                    colorScheme="red"
                    size={"sm"}
                    aria-label="See menu"
                    onClick={handleDeleteImg}
                    icon={<CiTrash size={20} />}
                  />
                </Flex>
              </Flex>

              <Flex mt={10} gap={5}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="number"
                    value={phoneNumber}
                    placeholder="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
              </Flex>

              <FormControl isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={address}
                  placeholder="email"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>

              {isEditing && (
                <>
                  <Flex style={{ flexDirection: "column" }}>
                    <FormControl mt={4}>
                      <FormLabel>Note</FormLabel>
                      <Textarea
                        placeholder="Hello here!"
                        value={note}
                        h={"10px"}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </FormControl>

                    <Button
                      mt={2}
                      onClick={handleAddMessage}
                      style={{ float: "right" }}
                    >
                      Add Message
                    </Button>
                  </Flex>

                  {messages &&
                    messages.map((message, index) => (
                      <Tag key={index} mt={2} mr={3} px={4} py={3}>
                        {/*<EditablePreview />*/}
                        <Flex style={{ flexDirection: "column" }}>
                          {/*<EditableTextarea />*/}
                          <Flex
                            style={{
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span style={{ color: "#0066b2" }}>
                              {message.message}
                            </span>
                            {/*<span*/}
                            {/*  onClick={() => handleDeleteMessage(index)}*/}
                            {/*  style={{*/}
                            {/*    marginLeft: "10px",*/}
                            {/*    fontSize: "18px",*/}
                            {/*    cursor: "pointer",*/}
                            {/*    textAlign: "end",*/}
                            {/*    color: "red",*/}
                            {/*  }}*/}
                            {/*>*/}
                            {/*  &times;*/}
                            {/*</span>*/}
                          </Flex>
                          <p
                            style={{
                              fontSize: "10px",
                              textAlign: "end",
                              marginTop: "4px",
                            }}
                          >
                            {new Date(message.date).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </Flex>
                      </Tag>
                    ))}
                </>
              )}

              <RadioGroup
                mt={4}
                value={gender}
                onChange={(value) => setGender(value)}
              >
                <Flex gap={5}>
                  <Radio value="Male">male</Radio>
                  <Radio value="Female">female</Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                {isEditing ? "Update" : "Save"}
              </Button>
              <Button onClick={closeModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
