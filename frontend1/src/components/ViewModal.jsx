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
} from "@chakra-ui/react";
import { GrView } from "react-icons/gr";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

export const ViewModal = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
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

  let size = "xl";

  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="blue"
        size={"sm"}
        key={size}
        aria-label={"See the info"}
        icon={<GrView size={20} onClick={onOpen} />}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={size}
        scrollBehavior={"inside"}
      >
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
                  src={user ? user.contactImg_url : ""}
                />
                <Text style={{ marginTop: "15px", fontSize: "22px" }}>
                  {user ? user.name : ""}
                </Text>
              </Flex>

              <Card style={{ padding: "15px", backgroundColor: "#ffffff" }}>
                <Stack spacing={4}>
                  <Text
                    style={{
                      color: "#0066b2",
                      fontSize: "22px",
                    }}
                  >
                    Contact info
                  </Text>
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

              <Card style={{ padding: "15px", backgroundColor: "#ffffff" }}>
                <Stack spacing={4}>
                  <Flex style={{ margin: "auto", width: "100%" }}>
                    <Text style={{ color: "#006A4E", fontSize: "22px" }}>
                      Messages
                    </Text>
                  </Flex>
                </Stack>
              </Card>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Ok</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
