import {Box, Container, Stack, useDisclosure} from "@chakra-ui/react";
import GoogleTranslate from "../components/GoogleTranslate.jsx";
import Navbar from "../components/NavBar.jsx";
import {useToast} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {ContactGrid} from "../components/ContactGrid.jsx";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import {BASE_URL} from "../api/Request";

export const ContactPage = () => {
    const queryClient = useQueryClient();
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState(null);
    const {isOpen, onOpen, onClose } = useDisclosure();
    const [tempContact, setTempContact] = useState(null);
    const [filteredUserInput, setFilteredUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
    const [image, setImage] = useState(defaultImage);
    const [messages, setMessages] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {

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
    };
    const { data, status } = useQuery("contacts", getUsers);

    // function showForm() {
    //     setIsCreating(true);
    // }

    // function closeForm() {
    //     setIsEditing(false);
    //     setIsCreating(false);
    //     setName("");
    //     setPhoneNumber("");
    //     setAddress("");
    //     setNote("");
    //     setGender("");
    //     setImage(defaultImage);
    // }

    const addContactMutation = useMutation(
            (data, onClose) => axios.post(`${BASE_URL}/contacts`, data),
            {
                onSuccess: () => {
                    queryClient.invalidateQueries("contacts").then(r => {});
                    toast({ title: "Contact created.", status: "success" });
                    onClose();
                },
            }
        );

    const handleCreate = () => {
        setIsEditing(false)
        onOpen()
        setName("");
        setPhoneNumber("");
        setAddress("");
        setGender("");
        setImage(defaultImage);
        setMessages([])
    }

    const handleCreateContact = async () => {
        // event.preventDefault();
        setIsEditing(false);
        const data = {
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            notes: messages.toString(),
            gender: gender,
            contactImg_url: image,
        };
        console.log("data", data)
        try {
            await addContactMutation.mutateAsync(data);
            onClose()
            // Reset the form fields
            setName("");
            setPhoneNumber("");
            setAddress("");
            setGender("");
            setImage(defaultImage);
            setMessages([]);
        } catch (error) {
            setError(error.message);
        }

    };

    const handleEdit = (user) => {
        setIsEditing(true);
        onOpen()
        setTempContact(user)
        setName(user?.name)
        setPhoneNumber(user?.phoneNumber)
        setAddress(user?.address)
        console.log("Raw notes:", user.notes);
        const parsedMessages = user.notes ? user.notes.split(",").map(note => {
            return {
                text: note.trim(),
                date: new Date().toISOString() // Use current date/time for simplicity
            };
        }) : [];
        console.log("Parsed messages:", parsedMessages);
        setMessages(parsedMessages);
        setGender(user?.gender)
        setImage(user?.contactImg_url)
    }


    const updateContactMutation = useMutation(
        (updatedContact) =>
            axios.put(`${BASE_URL}/contacts/${updatedContact.id}`, updatedContact), {
            onSuccess: () => {
                queryClient.invalidateQueries("contacts").then(r => {});
                toast({ title: "Contact updated", status: "success" });
                onClose();
            },
            onError: (error) => {
                toast({ title: "errorOccurred", description: error.message, status: "error" });
            }
        }
    );

    const handleEditContact = async () => {
        // event.preventDefault();
        const updatedContact = {
            id: tempContact.id,
            name,
            phoneNumber,
            address,
            notes: messages.toString(),
            gender,
            contactImg_url: image,
        }
        try {
            await updateContactMutation.mutateAsync(updatedContact);
            onClose();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleAddMessage = () => {
        if (note.trim() !== "" && !messages.includes(note.trim())) {
            const newMessage = {
                text: note.trim(),
                date: new Date().toISOString()
            };
            setMessages([...messages, newMessage]);
            setNote("");
        }
    };

    const handleDeleteMessage = (index) => {
        const newMessages = messages.filter((_, i) => i !== index);
        setMessages(newMessages);
    };

    const handleChangeImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a new FileReader object
            const reader = new FileReader();
            // Define the onload function
            reader.onload = function(e) {
                // The result contains the data URL
                const dataUrl = e.target.result;
                // Set the data URL in the state
                setImage(dataUrl);
            };
            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImg = () => {
        setImage(defaultImage);
    };


    const filteredUsers = () => {
        return users.filter(user =>
            user.name.toLowerCase().includes(filteredUserInput.toLowerCase())
        );
    };

    return (
        <>
            <Stack minH={'100vh'} maxW={'1200px'} m={'auto'}>
                <Box mt={'20px'} align={'end'}><GoogleTranslate /></Box>
                <Navbar
                    name={name}
                    setName={setName}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    address={address}
                    setAddress={setAddress}
                    gender={gender}
                    setGender={setGender}
                    users={users}
                    setUsers={setUsers}
                    getUsers={getUsers}
                    handleChangeImg={handleChangeImg}
                    handleDeleteImg={handleDeleteImg}
                    image={image}
                    setImage={setImage}
                    handleCreateContact={handleCreateContact}
                    isLoading={isLoading}
                    filteredUserInput={filteredUserInput}
                    setFilteredUserInput={setFilteredUserInput}
                    handleAddMessage={handleAddMessage}
                    handleDeleteMessage={handleDeleteMessage}
                    messages={messages}
                    setMessages={setMessages}
                    note={note}
                    setNote={setNote}
                    isCreating={isCreating}
                    isEditing={isEditing}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    handleCreate={handleCreate}
                />
                <Container maxW={{ base: '500px', sm: '650px', md: '900px', lg: '1200px' }}>
                    <ContactGrid
                        onOpen={onOpen}
                        setIsEditing={setIsEditing}
                        users={users}
                        setUsers={setUsers}
                        getUsers={getUsers}
                        filteredUsers={filteredUsers}
                        handleAddMessage={handleAddMessage}
                        handleDeleteMessage={handleDeleteMessage}
                        messages={messages}
                        setMessages={setMessages}
                        name={name}
                        setName={setName}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        address={address}
                        setAddress={setAddress}
                        gender={gender}
                        setGender={setGender}
                        note={note}
                        setNote={setNote}
                        image={image}
                        setImage={setImage}
                        tempContact={tempContact}
                        handleEdit={handleEdit}
                        handleEditContact={handleEditContact}
                        handleChangeImg={handleChangeImg}
                        handleDeleteImg={handleDeleteImg}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                </Container>
            </Stack>
        </>
    )
}