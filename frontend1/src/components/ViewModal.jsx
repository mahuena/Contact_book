import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, Stack, Text,
    Flex, IconButton, useDisclosure, Image, Card, ModalFooter
} from "@chakra-ui/react";
import {GrView} from "react-icons/gr";
import {MdOutlinePhone} from "react-icons/md";
import {MdOutlineMail} from "react-icons/md";
import React from "react";

export const ViewModal = ({user, messages}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const defaultImage =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";

    let size = "xl";

    return (
        <>
            <IconButton
                variant="ghost"
                colorScheme="blue"
                size={"sm"}
                key={size}
                aria-label={"See the info"}
                icon={<GrView size={20} onClick={onOpen}/>}
            />

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size={size}
                scrollBehavior={"inside"}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>View Contact</ModalHeader>
                    <ModalCloseButton/>
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
                                <Text style={{marginTop: "15px", fontSize: "22px"}}>
                                    {user ? user.name : ""}
                                </Text>
                            </Flex>

                            <Card style={{padding: "15px", backgroundColor: "#ffffff"}}>
                                <Stack spacing={4}>
                                    <Text textColor={'#0066b2'} fontSize={'22px'}>
                                        Contact info
                                    </Text>
                                    <Flex alignItems={"center"} gap={4}>
                                        <MdOutlinePhone/>
                                        <Text>{user ? user.phoneNumber : ""}</Text>
                                    </Flex>
                                    <Flex alignItems={"center"} gap={4}>
                                        <MdOutlineMail/>
                                        <Text>{user ? user.address : ""}</Text>
                                    </Flex>
                                </Stack>
                            </Card>

                            <Card style={{padding: "15px", backgroundColor: "#ffffff"}}>
                                <Stack spacing={4}>
                                    <Text textColor={'green'} fontSize={'22px'}>Messages</Text>
                                    {messages &&
                                        messages.filter(message => message.contact_id === user.id).map((message, index) => (
                                            <div key={index} style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: 'center',
                                            }}>
                                                <p style={{fontSize: "18px"}}>{message.message}</p>
                                                <small style={{fontSize: "12px"}}>{message.date}</small>
                                            </div>
                                        ))}
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
