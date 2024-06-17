import {
    Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, ModalFooter, IconButton, useToast
} from "@chakra-ui/react";
import {CiEdit} from "react-icons/ci";
import {useState} from "react";
import {BASE_URL} from "../App.jsx";

export const EditModal = ({user, getUsers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const [inputs, setInputs] = useState({
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
    });

    const handleEditContact = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/contacts/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            getUsers();
            toast({
                title: 'Contact updated',
                status: 'success',
            });
            onClose();
        }
        catch (error) {
            toast({
                status: "error",
                title: "An error occurred.",
                description: error.message,
                duration: 4000,
            })
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <IconButton
                variant='ghost'
                colorScheme='green'
                size={'sm'}
                aria-label={'See the info'}
                icon={<CiEdit size={20} />}
                onClick={onOpen}
            />

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <form onSubmit={handleEditContact}>
                    <ModalContent>
                        <ModalHeader>New Contact</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={'6'}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder='Name'
                                    value={inputs.name}
                                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                                />
                            </FormControl>

                            <FormControl mt={'4'}>
                                <FormLabel> Number</FormLabel>
                                <Input
                                    type="number"
                                    id="name"
                                    placeholder='Phone'
                                    value={inputs.phoneNumber}
                                    onChange={(e) => setInputs({...inputs, phoneNumber: e.target.value})}
                                />
                            </FormControl>

                            <FormControl mt={'4'}>
                                <FormLabel> Email</FormLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder='Email'
                                    value={inputs.address}
                                    onChange={(e) => setInputs({...inputs, address: e.target.value})}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme='blue'
                                mr={3}
                                type={'submit'}
                                isLoading={isLoading}
                            >
                                Update
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>

                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};