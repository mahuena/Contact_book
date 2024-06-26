import { BiAddToQueue } from "react-icons/bi";
import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { CiEdit, CiTrash } from "react-icons/ci";
// @ts-ignore
export const CreateContactModal = ({
  handleAddMessage,
  handleDeleteMessage,
  messages,
  setMessages,
  note,
  setNote,
  image,
  setImage,
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
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  const handleSubmit = () => {
    // event.preventDefault();
    if (isEditing) {
      handleEditContact();
    } else {
      handleCreateContact();
    }
  };

  return (
    <>
      <Button onClick={handleCreate}>
        <BiAddToQueue size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        style={{ width: "700px" }}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
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
                  <Tag key={index} mt={2} mr={3} px={2} py={1}>
                    <Flex style={{ flexDirection: "column" }}>
                      <Flex style={{ align: "center" }}>
                        <span style={{ color: "#0066b2" }}>{message.text}</span>
                        <span
                          onClick={() => handleDeleteMessage(index)}
                          style={{
                            marginLeft: "10px",
                            fontSize: "18px",
                            cursor: "pointer",
                            textAlign: "end",
                            color: "#0066b2",
                          }}
                        >
                          &times;
                        </span>
                      </Flex>
                      <p
                        style={{
                          fontSize: "10px",
                          textAlign: "start",
                          marginTop: "4px",
                        }}
                      >
                        {new Date(message.date).toLocaleTimeString([], {
                          weekday: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </Flex>
                  </Tag>
                ))}

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
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                {isEditing ? "Update" : "Save"}
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  setName("");
                  setPhoneNumber("");
                  setAddress("");
                  setGender("");
                  setImage(defaultImage);
                  setMessages([]);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
