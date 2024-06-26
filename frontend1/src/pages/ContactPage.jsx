import { Box, Container, Stack, useDisclosure } from "@chakra-ui/react";
import GoogleTranslate from "../components/GoogleTranslate.jsx";
import Navbar from "../components/NavBar.jsx";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { ContactGrid } from "../components/ContactGrid.jsx";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { BASE_URL } from "../api/Request";

export const ContactPage = () => {
  const queryClient = useQueryClient();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tempContact, setTempContact] = useState(null);
  const [filteredUserInput, setFilteredUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  const [image, setImage] = useState(defaultImage);
  const [messages, setMessages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUsers();
    getNotes();
  }, []);

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
  }, []);
  // const { data, status } = useQuery("contacts", getUsers);

  const getNotes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/notes`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setMessages(data);
    } catch (error) {
      console.error("another error", error);
    }
  };
  // const { data: notesData, status: notesStatus } = useQuery("notes", getNotes);

  const addContactMutation = useMutation(
    (data, onClose) => axios.post(`${BASE_URL}/contacts`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts").then((r) => {});
        toast({ title: "Contact created.", status: "success" });
        onClose();
      },
    },
  );

  const addNoteMutation = useMutation(
    (data) => axios.post(`${BASE_URL}/notes`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notes").then((r) => {});
        toast({ title: "Note created.", status: "success" });
      },
    },
  );

  const handleCreate = () => {
    setIsEditing(false);
    onOpen();
    setName("");
    setPhoneNumber("");
    setAddress("");
    setGender("");
    setImage(defaultImage);
    setMessages([]);
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
    const noteData = messages.map((message) => ({
      text: message.text,
      date: message.date,
      contact_id: user.id,
    }));

    console.log("noteNata", noteData);
    try {
      addContactMutation.mutate(data);
      addNoteMutation.mutate(noteData);
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
    onOpen();
    setIsEditing(true);
    setTempContact(user);
    setName(user?.name);
    setPhoneNumber(user?.phoneNumber);
    setAddress(user?.address);
    console.log("Raw notes:", user.notes);
    setMessages(user?.notes.split(","));
    setGender(user?.gender);
    console.log("Editing user gender:", user?.gender);
    setImage(user?.contactImg_url);
  };
  // console.log("Current gender state:", gender);

  const updateContactMutation = useMutation(
    (updatedContact) =>
      axios.put(`${BASE_URL}/contacts/${updatedContact.id}`, updatedContact),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts").then((r) => {});
        toast({ title: "Contact updated.", status: "success" });
        onClose();
      },
      onError: (error) => {
        console.log("error update", error);
      },
    },
  );

  // handleEditContact
  const handleEditContact = async (event) => {
    event.preventDefault();
    const updatedContact = {
      ...tempContact,
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      notes: messages.map((message) => ({
        text: message.text,
        date: message.date,
        contact_id: message.contact_id,
      })),
      gender: gender,
      contactImg_url: image,
    };
    try {
      updateContactMutation.mutate(updatedContact);
      // onClose();
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

  const handleAddMessage = (contactId) => {
    if (note.trim() !== "" && !messages.includes(note.trim())) {
      const newMessage = {
        text: note.trim(),
        date: new Date().toISOString(),
        contactId: contactId,
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
      reader.onload = function (e) {
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
    return users.filter((user) =>
      user.name.toLowerCase().includes(filteredUserInput.toLowerCase()),
    );
  };

  return (
    <>
      <Stack minH={"100vh"} maxW={"1200px"} m={"auto"}>
        <Box mt={"20px"} align={"end"}>
          <GoogleTranslate />
        </Box>
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
          isEditing={isEditing}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          handleCreate={handleCreate}
        />
        <Container
          maxW={{ base: "500px", sm: "650px", md: "900px", lg: "1200px" }}
        >
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
  );
};
