import { Box, Container, Stack, useDisclosure } from "@chakra-ui/react";
// import GoogleTranslate from "../components/GoogleTranslate.jsx";
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
  });

  const { data, status } = useQuery("contacts", getUsers);

  const getNotes = useCallback(async (contactId) => {
    try {
      const res = await fetch(`${BASE_URL}/notes?contact_id=${contactId}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setMessages(data);
    } catch (error) {
      console.error("another error", error);
    }
  });

  const { data: notesData, status: notesStatus } = useQuery("notes", getNotes);

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
      onError: (error) => {
        console.log("error creating note", error);
      },
    },
  );

  const handleCreate = useCallback(() => {
    setIsEditing(false);
    onOpen();
    setName("");
    setPhoneNumber("");
    setAddress("");
    setGender("");
    setImage(defaultImage);
    setMessages([]);
  });

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
    const newContact = await addContactMutation.mutateAsync(data);

    // pass contactId to noteData
    // const noteData = {
    //   text: note,
    //   date: new Date().toISOString(),
    //   contact_id: id,
    // };

    const noteData = messages.map((message) => ({
      text: message.message,
      date: message.date,
      contact_id: newContact.id, // Use the id of the new contact
    }));
    console.log("noteData", noteData);
    addNoteMutation.mutate(noteData);

    setUsers([...users, data]);
    onClose();
    setName("");
    setPhoneNumber("");
    setAddress("");
    setGender("");
    setImage(defaultImage);
    setMessages([]);
  };

  const handleEdit = (user) => {
    onOpen();
    setIsEditing(true);
    setTempContact(user);
    setName(user?.name);
    setPhoneNumber(user?.phoneNumber);
    setAddress(user?.address);
    // console.log("Raw notes:", user.notes);
    // setMessages(user?.notes.split(","));
    setGender(user?.gender);
    setImage(user?.contactImg_url);
  };

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

  const handleEditContact = async (event) => {
    event.preventDefault();
    console.log("handleEditContact called");
    const updatedContact = {
      ...tempContact,
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      // notes: messages.map((message) => ({
      //   text: message.text,
      //   date: message.date,
      //   contact_id: message.contact_id,
      // })),
      gender: gender,
      contactImg_url: image,
    };
    try {
      updateContactMutation.mutate(updatedContact);

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

  const deleteContatMutation = useMutation(
    (id) => axios.delete(`${BASE_URL}/contacts/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts").then((r) => {});
        toast({ title: "Contact deleted.", status: "success" });
      },
      onError: (error) => {
        console.log("error delete", error);
      },
    },
  );

  const handleDeleteContact = async (id) => {
    deleteContatMutation.mutate(id);
  };

  const handleAddMessage = (contact_id) => {
    if (note.trim() !== "" && !messages.includes(note.trim())) {
      const newMessage = {
        message: note.trim(),
        date: new Date().toISOString(),
        contact_id: contact_id,
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
        {/*<Box mt={"20px"} align={"end"}>*/}
        {/*  <GoogleTranslate />*/}
        {/*</Box>*/}

        {messages.map((message, user) => (
          <p key={user.id}>
            {message.message}, {message.date},{/*{message.contact_id}*/}
          </p>
        ))}

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
          handleChangeImg={handleChangeImg}
          handleDeleteImg={handleDeleteImg}
          image={image}
          setImage={setImage}
          handleCreateContact={handleCreateContact}
          handleEditContact={handleEditContact}
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
            users={users}
            filteredUsers={filteredUsers}
            image={image}
            tempContact={tempContact}
            name={name}
            handleEdit={handleEdit}
            handleDeleteContact={handleDeleteContact}
          />
        </Container>

        <p>{name}</p>
      </Stack>
    </>
  );
};
