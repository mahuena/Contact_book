import {Box, Container, Stack, useDisclosure} from "@chakra-ui/react";
// import GoogleTranslate from "../components/GoogleTranslate.jsx";
import Navbar from "../components/NavBar.jsx";
import {useToast} from "@chakra-ui/react";
import {useState, useEffect, useCallback} from "react";
import {ContactGrid} from "../components/ContactGrid.jsx";
import {useQuery, useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {BASE_URL} from "../api/Request";

export const ContactPage = () => {
    const queryClient = useQueryClient();
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [tempContact, setTempContact] = useState(null);
    const [filteredUserInput, setFilteredUserInput] = useState("");
    const toast = useToast();
    const defaultImage =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
    const [image, setImage] = useState(defaultImage);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const clearFormFields = () => {
        setName("");
        setPhoneNumber("");
        setAddress("");
        setGender("");
        setImage(defaultImage);
    };

    const closeModal = () => {
        onClose();
        setName("");
        setPhoneNumber("");
        setAddress("");
        setGender("");
        setImage(defaultImage);
    };

    useEffect(() => {
        getUsers();
        getNotes();
    }, []);

    // contacts mutation functions
    const getUsers = useCallback(async () => {
        try {
            const res = await fetch(`${BASE_URL}/contacts`);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            setUsers(data);
        } catch (error) {
            console.error("another error", error);
        }
    });
    const {data, status} = useQuery("contacts", getUsers);

    const addContactMutation = useMutation(
        (data, onClose) => axios.post(`${BASE_URL}/contacts`, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("contacts").then((r) => {
                });
                toast({title: "Contact created.", status: "success"});
                onClose();
            },
        },
    );

    const updateContactMutation = useMutation(
        (updatedContact) =>
            axios.put(`${BASE_URL}/contacts/${updatedContact.id}`, updatedContact),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("contacts").then((r) => {
                });
                toast({title: "Contact updated.", status: "success"});
                onClose();
            },
            onError: (error) => {
                console.log("error update", error);
            },
        },
    );

    const deleteContatMutation = useMutation(
        (id) => axios.delete(`${BASE_URL}/contacts/${id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("contacts").then((r) => {
                });
                toast({title: "Contact deleted.", status: "success"});
            },
            onError: (error) => {
                console.log("error delete", error);
            },
        },
    );

    const getNotes = useCallback(async (contactId) => {
        try {
            const res = await fetch(`${BASE_URL}/notes`);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const formattedMessages = data.map(message => ({
                message: message.message,
                date: message.date,
                contact_id: message.contact_id,
                id: message.id
            }));
            setMessages(formattedMessages);
            console.log('data set', formattedMessages)
        } catch (error) {
            console.error("another error", error);
        }
    });
    const {data: notesData, status: notesStatus} = useQuery("notes", getNotes);

    const addNoteMutation = useMutation(
        async (newMessage) => {
            console.log("Sending newMessage to API:", JSON.stringify(newMessage),);
            try {
                const response = await axios.post(`${BASE_URL}/notes`, JSON.stringify(newMessage), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                return response.data; // Assuming API returns the newly created note
            } catch (error) {
                console.error("Error adding note 1:", error);
                throw new Error(`Failed to add note: ${error.message}`);
            }
        },
        {
            onSuccess: (data) => {
                console.log("Note added successfully:", data);
            },
            onError: (error) => {
                console.error("Error adding note:", error);
                toast({
                    title: "Error",
                    description: "Failed to add note.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            },
        }
    );

    const updateNoteMutation = useMutation(
        (updatedNote) =>
            axios.put(`${BASE_URL}/notes/${updatedNote.id}`, updatedNote),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("notes").then((r) => {
                });
                toast({title: "Note updated.", status: "success"});
                onClose();
            },
            onError: (error) => {
                console.log("error update", error);
            },
        },
    );

    const deleteNoteMutation = useMutation(
        (id) => axios.delete(`${BASE_URL}/notes/${id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("notes").then((r) => {
                });
                toast({title: "Note deleted.", status: "success"});
            },
            onError: (error) => {
                console.log("error delete", error);
            },
        },
    );

    const handleCreate = () => {
        setIsEditing(false);
        onOpen();
        clearFormFields();
    };

    const handleCreateContact = async (event) => {
        event.preventDefault();
        setIsEditing(false);
        const data = {
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            gender: gender,
            contactImg_url: image,
        };
        console.log("data", data);
        addContactMutation.mutateAsync(data);
        setUsers([...users, data]);
        onClose();
        clearFormFields();
    };

    const handleEdit = (user) => {
        onOpen();
        setIsEditing(true);
        setTempContact(user);
        setName(user?.name);
        setPhoneNumber(user?.phoneNumber);
        setAddress(user?.address);
        setGender(user?.gender);
        setImage(user?.contactImg_url);
    };

    const handleEditContact = async (event) => {
        event.preventDefault();
        const updatedContact = {
            ...tempContact,
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            gender: gender,
            contactImg_url: image,
        };
        updateContactMutation.mutate(updatedContact);
        onClose();
        clearFormFields();
    };

    const handleDeleteContact = async (id) => {
        deleteContatMutation.mutate(id);
    };

    const handleChangeImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function () {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImg = () => {
        setImage(defaultImage);
    };

    const filteredUsers = () => {
        return users.filter((user) =>
            user.name.toLowerCase().includes(filteredUserInput.toLowerCase()),
        );
    };

    return (
        <>
            <Stack minH={"100vh"} maxW={"1200px"} m={"auto"}>
                {/*<GoogleTranslate />*/}

                <Navbar
                    name={name}
                    setName={setName}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    address={address}
                    setAddress={setAddress}
                    gender={gender}
                    setGender={setGender}
                    handleChangeImg={handleChangeImg}
                    handleDeleteImg={handleDeleteImg}
                    image={image}
                    handleCreateContact={handleCreateContact}
                    handleEditContact={handleEditContact}
                    setFilteredUserInput={setFilteredUserInput}
                    isEditing={isEditing}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    handleCreate={handleCreate}
                    closeModal={closeModal}
                    user={tempContact}
                />

                <Container
                    maxW={{base: "500px", sm: "650px", md: "900px", lg: "1200px"}}
                >
                    <ContactGrid
                        users={users}
                        filteredUsers={filteredUsers}
                        handleEdit={handleEdit}
                        handleDeleteContact={handleDeleteContact}
                        messages={messages}
                        setMessages={setMessages}
                        // handleEditMessage={handleEditMessage}
                        // handleDeleteMessage={handleDeleteMessage}
                        // currentMessage={currentMessage}
                        // setCurrentMessage={setCurrentMessage}
                        // editMode={editMode}
                        // handleAddMessage={handleAddMessage}
                        addNoteMutation={addNoteMutation}
                        updateNoteMutation={updateNoteMutation}
                        deleteNoteMutation={deleteNoteMutation}
                    />
                </Container>
            </Stack>
        </>
    );
};
