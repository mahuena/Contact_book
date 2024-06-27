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

export const ViewModal = ({ user, image }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <Card style={{ padding: "15px", backgroundColor: "#ffffff" }}>
                <Stack spacing={4}>
                  <Text style={{ color: "#0066b2" }}>Messages</Text>
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
                </Stack>
              </Card>
            </Stack>
          </ModalBody>

          {/*<ModalFooter>/!*<Button onClick={onClose}>Ok</Button>*!/</ModalFooter>*/}
        </ModalContent>
      </Modal>
    </>
  );
};
