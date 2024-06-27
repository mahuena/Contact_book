import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Stack,
  Text,
  Flex,
  IconButton,
  useDisclosure,
  Image,
  Card,
  ModalFooter,
  Spacer,
  Tag,
} from "@chakra-ui/react";
import { GrView } from "react-icons/gr";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

export const ViewModal = ({ user, image, userMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const defaultImage =
  //   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  const formatDate = (dateString) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${dayName}, ${day} ${monthName} ${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="blue"
        size={"sm"}
        aria-label={"See the info"}
        icon={<GrView size={20} onClick={onOpen} />}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Flex
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Image
                  width="150px"
                  height="150px"
                  objectFit="cover"
                  borderRadius={"50%"}
                  src={image}
                />
                <Text style={{ marginTop: "10px", fontSize: "20px" }}>
                  {user ? user.name : ""}
                </Text>
              </Flex>

              <Card style={{ padding: "15px", backgroundColor: "#ffffff" }}>
                <Stack spacing={4}>
                  <Text style={{ color: "#0066b2" }}>Contact info</Text>
                  <Flex style={{ align: "center", gap: "10px" }}>
                    <MdOutlinePhone />
                    <Text>{user ? user.phoneNumber : ""}</Text>
                  </Flex>
                  <Flex style={{ align: "center", gap: "10px" }}>
                    <MdOutlineMail />
                    <Text>{user ? user.address : ""}</Text>
                  </Flex>
                </Stack>
              </Card>
              <Card style={{ backgroundColor: "#ffffff" }}>
                <Stack spacing={4}>
                  <Text style={{ padding: "15px", color: "#0066b2" }}>
                    Messages
                  </Text>
                  {/*{messages && messages.map((message, index) => (*/}
                  {/*    <Flex>*/}
                  {/*        <Text key={index} style={{color: '#0066b2'}}>{message.text}</Text>*/}
                  {/*        <Text style={{*/}
                  {/*            fontSize: "10px",*/}
                  {/*            textAlign: "start",*/}
                  {/*            marginTop: "4px"*/}
                  {/*        }}>{message.date}</Text>*/}
                  {/*    </Flex>*/}
                  {/*))}*/}

                  {userMessages.map((message, index) => (
                    <Tag
                      key={index}
                      style={{
                        backgroundColor: "transparent",
                        padding: "0px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Flex
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "30px",
                          margin: "auto",
                        }}
                      >
                        <Text style={{ width: "200px" }}>
                          {message.message}
                        </Text>
                        <Spacer />
                        <Text style={{ fontSize: "11px" }}>
                          {formatDate(message.date)}
                        </Text>
                      </Flex>
                    </Tag>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
                // setName("");
                // setPhoneNumber("");
                // setAddress("");
                // setGender("");
                // setImage(defaultImage);
                // setMessages([...messages, ...newMessages]);
                // setNewMessages([]);
              }}
            >
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
