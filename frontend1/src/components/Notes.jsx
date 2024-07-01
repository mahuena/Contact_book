import React, {useState} from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {MdOutlineMessage} from "react-icons/md";

export const Notes = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const toast = useToast();

    const handleAddMessage = () => {
        const messageWithDate = {
            content: currentMessage,
            date: new Date().toISOString()
        };
        if (editMode) {
            const updatedMessages = [...messages];
            updatedMessages[editIndex] = messageWithDate;
            setMessages(updatedMessages);
            setEditMode(false);
            setEditIndex(null);
            toast({
                title: "Message updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            setMessages(oldMessages => [...oldMessages, messageWithDate]);
            toast({
                title: "Message added.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
        setCurrentMessage("");
    };

    const handleEditMessage = (index) => {
        setCurrentMessage(messages[index].content);
        setEditMode(true);
        setEditIndex(index);
        onOpen();
    };

    const handleDeleteMessage = (index) => {
        const updatedMessages = messages.filter((_, i) => i !== index);
        setMessages(updatedMessages);
    };

    return (
        <>
            <IconButton
                variant={"ghost"}
                colorScheme={"grey"}
                aria-label={"add a message"}
                icon={<MdOutlineMessage size={20}/>}
                size={"sm"}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        {editMode ? "Edit Message" : "Add a new message"}
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Input
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Enter message"
                        />

                        <Button colorScheme="blue" onClick={handleAddMessage} mt={6}>
                            Add Message
                        </Button>

                        {messages.map((message, index) => (
                            <div key={index}
                                 style={{
                                     display: "flex",
                                     flexDirection: "row",
                                     justifyContent: "space-between",
                                     alignItems: 'center',
                                     marginTop: "10px"
                                 }}>
                                <p>{message.content}</p>
                                <small>{new Date(message.date).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</small>
                                <div>
                                    <IconButton
                                        aria-label="Edit Message"
                                        variant="ghost"
                                        colorScheme="green"
                                        bg="transparent"
                                        size={'lg'}
                                        icon={<EditIcon/>}
                                        onClick={() => handleEditMessage(index)}
                                    />
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="red"
                                        bg="transparent"
                                        size={'lg'}
                                        aria-label="Delete Message"
                                        icon={<DeleteIcon/>}
                                        onClick={() => handleDeleteMessage(index)}
                                    />
                                </div>
                            </div>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="green" onClick={onClose}>
                            Done
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
