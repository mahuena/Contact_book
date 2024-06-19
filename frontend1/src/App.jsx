import { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import { ContactGrid } from './components/ContactGrid.jsx';
import {Stack, Container, useToast, useDisclosure, Box} from '@chakra-ui/react';
import {useTranslation} from "react-i18next";
import {LanguageSelector} from "./components/LanguageSelector.jsx";

export const BASE_URL = 'http://127.0.0.1:5000/api';

function App() {
    const [users, setUsers] = useState([]);
    const [filteredUserInput, setFilteredUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast()
    const { t, i18n } = useTranslation();
    const [description, setDescription] = useState(t('description'));

    // useEffect(() => {
    //     // This will run whenever the language changes
    //     setDescription(t('description'));
    // }, [i18n.language]);
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
    const [image, setImage] = useState(defaultImage);
    const [inputs, setInputs] = useState({
        name: "",
        phoneNumber: "",
        address: "",
        gender: "",
        contactImg_url: image,
    });

    const handleChangeImg = (event) => {
        const newImage = URL.createObjectURL(event.target.files[0]);
        setImage(newImage);
        setInputs({...inputs, contactImg_url: newImage});
    };

    const handleDeleteImg = () => {
        setImage(defaultImage);
        setInputs({...inputs, contactImg_url: defaultImage});
    };

    const getUsers = async () => {
        try {
            const res = await fetch(`${BASE_URL}/contacts`);
            const data = await res.json()

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            setUsers(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
        setDescription(t('description'));
    }, [i18n.language]);

    const handleCreateContact = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/contacts`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(inputs)
            });

            const data = await response.json();
            if (!response.ok) {throw new Error(data.error);}
            toast({title: "Contact created.", status: "success",});
            onClose();
            getUsers();
            setInputs({name: "", phoneNumber: "", address: "", gender: "", contactImg_url: defaultImage});
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }

    const filteredUsers = () => {
        return users.filter(user =>
            user.name.toLowerCase().includes(filteredUserInput.toLowerCase())
        );
    };

    return (
        <Stack minH={'100vh'} maxW={'1200px'} m={'auto'}>
            <Box mt={'25px'} align={'end'}><LanguageSelector /></Box>

            <Navbar
                users={users}
                setUsers={setUsers}
                getUsers={getUsers}
                handleChangeImg={handleChangeImg}
                handleDeleteImg={handleDeleteImg}
                image={image}
                handleCreateContact={handleCreateContact}
                isLoading={isLoading}
                inputs={inputs}
                setInputs={setInputs}
                filteredUserInput={filteredUserInput}
                setFilteredUserInput={setFilteredUserInput}
            />
            <Container maxW={{base: '500px', sm: '650px', md: '900px', lg: '1200px'}}>
                <ContactGrid
                    users={users}
                     setUsers={setUsers}
                     getUsers={getUsers}
                    filteredUsers={filteredUsers}
                />
            </Container>



            <h2 mt={'20px'}>{t("description")}</h2>
        </Stack>
    )
}

export default App