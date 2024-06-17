import { BiAddToQueue } from "react-icons/bi";
import { useState, useEffect } from "react";
// @ts-ignore
import {Button, Modal, Spacer, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
    Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Container, ModalFooter, useToast} from "@chakra-ui/react";
import {Profile} from "./Profile.jsx";
// @ts-ignore
export const CreateContactModal = ({getUsers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
    const [image, setImage] = useState(defaultImage);
    const handleChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleDelete = () => {
        setImage(defaultImage);
    };
    const [inputs, setInputs] = useState({
        name: "",
        phoneNumber: "",
        address: "",
        gender: "",
        contactImg_url: defaultImage,
    });
    const toast = useToast()

    const handleCreateContact = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            toast({
                title: "Contact created.",
                status: "success",
            });
            onClose();
            getUsers();
            setInputs({
                name: "",
                role: "",
                description: "",
                gender: "",
                contactImg_url: defaultImage,
            });
        }
        catch (error) {
            toast({
                status: "error",
                title: "An error occurred.",
                description: error.message,
                duration: 4000,

            });
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleCreateContact}>
                    <ModalContent>
                        <ModalHeader>New Contact</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={'6'}>
                            <Container>
                                <Profile image={image} handleChange={handleChange} handleDelete={handleDelete} />
                            </Container>

                            <FormControl mt={6}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    value={inputs.name}
                                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                                    placeholder='Name'
                                />
                            </FormControl>

                            <FormControl mt={'4'}>
                                <FormLabel> Number</FormLabel>
                                <Input
                                    type="number"
                                    value={inputs.phoneNumber}
                                    onChange={(e) => setInputs({...inputs, phoneNumber: e.target.value})}
                                    placeholder='Phone'
                                />
                            </FormControl>

                            <FormControl mt={'4'}>
                                <FormLabel> Email</FormLabel>
                                <Input
                                    type="email"
                                    value={inputs.address}
                                    onChange={(e) => setInputs({...inputs, address: e.target.value})}
                                    placeholder='Email'
                                />
                            </FormControl>

                            <RadioGroup mt={4}>
                                <Flex gap={5}>
                                    <Radio value='Male'>Male</Radio>
                                    <Radio value='Female'>Female</Radio>
                                </Flex>
                            </RadioGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme='blue'
                                mr={3}
                                type="submit"
                                isLoading={isLoading}
                            >
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>

                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};