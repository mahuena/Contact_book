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
    IconButton,
    useToast, Textarea,
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {MdOutlineMessage} from "react-icons/md"
import {format} from 'date-fns';

export const Notes = ({user, messages, setMessages, addNoteMutation, updateNoteMutation, deleteNoteMutation}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    let size = "xl";

    const [currentMessage, setCurrentMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const toast = useToast();

    const handleAddMessage = async () => {
        const date = new Date();
        const formattedDate = format(date, "EEEE do MMMM yyyy, h:mm a");

        const newMessage = {
            message: currentMessage,
            date: formattedDate,
            contact_id: user.id
        };
        console.log("new message", newMessage);
        if (editMode) {
            const updatedMessage = {...newMessage, id: editIndex};
            updateNoteMutation.mutate(updatedMessage);
            setMessages(messages.map(message => message.id === editIndex ? updatedMessage : message));
            toast({
                title: "Message Updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            setEditMode(false);
        } else {
            addNoteMutation.mutate(newMessage);
            setMessages(oldMessages => [...oldMessages, newMessage]);
            toast({
                title: "Message Added",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
        setCurrentMessage("");
        setEditIndex(null);
    }

    const handleEditMessage = (id) => {
        const message = messages.find(message => message.id === id);
        setCurrentMessage(message.message);
        setEditMode(true);
        setEditIndex(id);
        onOpen();
    };

    const handleDeleteMessage = async (id) => {
        const updatedMessages = messages.filter((_, i) => i !== id);
        deleteNoteMutation.mutate(id);
        setMessages(updatedMessages);
    };

    return (
        <>
            <IconButton
                variant={"ghost"}
                colorScheme='teal'
                aria-label={"add a message"}
                icon={<MdOutlineMessage size={20}/>}
                size={"sm"}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose} size={size}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{editMode ? "Edit Message" : "Add a new message"}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Textarea value={currentMessage} placeholder="Enter message"
                                  onChange={(e) => setCurrentMessage(e.target.value)}/>

                        <Button colorScheme="blue" onClick={handleAddMessage} mt={6}>Add Message</Button>

                        {messages &&
                            messages.filter(message => message.contact_id === user.id).map((message, id) => (
                                <div key={id} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                    marginTop: "10px"
                                }}>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <p style={{fontSize: "18px"}}>{message.message}</p>
                                        <small style={{fontSize: "12px"}}>{message.date}</small>
                                    </div>
                                    <div>
                                        <IconButton
                                            aria-label="Edit Message"
                                            variant="ghost"
                                            colorScheme="green"
                                            bg="transparent"
                                            size={'lg'}
                                            icon={<EditIcon/>}
                                            onClick={() => handleEditMessage(message.id)}
                                        />
                                        <IconButton
                                            variant="ghost"
                                            colorScheme="red"
                                            bg="transparent"
                                            size={'lg'}
                                            aria-label="Delete Message"
                                            icon={<DeleteIcon/>}
                                            onClick={() => handleDeleteMessage(message.id)}
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
