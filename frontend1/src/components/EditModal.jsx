import {Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, ModalFooter, IconButton, useToast, RadioGroup, Flex, Radio, Image} from "@chakra-ui/react";
import {CiEdit, CiTrash} from "react-icons/ci";
import {useState} from "react";
import {BASE_URL} from "../App.jsx";

export const EditModal = ({user, getUsers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
    const [image, setImage] = useState(defaultImage);
    const toast = useToast();
    const [inputs, setInputs] = useState({
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
        gender: user.gender,
        contactImg_url: user.contactImg_url
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

    const handleEditContact = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/contacts/${user.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(inputs)
            });

            const data = await res.json();
            if (!res.ok) {throw new Error(data.error);}
            toast({title: 'Contact updated', status: 'success',});
            onClose();
            getUsers();
        }
        catch (error) {}
        finally {setIsLoading(false);}
    }

    return (
        <>
            <IconButton variant='ghost' colorScheme='green' size={'sm'} aria-label={'See the info'} icon={<CiEdit size={20} />} onClick={onOpen}/>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleEditContact}>
                    <ModalContent>
                        <ModalHeader>Contact update</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={'6'}>
                            <Flex style={{flexDirection: 'column', position: 'relative', width: '150px', height: '150px', margin: 'auto',}}>
                                <Input type="file" id="fileInput" style={{display: 'none'}} onChange={handleChangeImg}/>
                                <Image id="output" src={inputs.contactImg_url} alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', margin: 'auto'}}/>
                                <Flex gap={3} my={'10px'} m={'auto'}>
                                    <IconButton variant='ghost' colorScheme='green' size={'sm'} aria-label={'See the info'} icon={<CiEdit size={20} />}
                                        onClick={() => document.getElementById('fileInput').click()}
                                    />
                                    <IconButton variant='ghost' colorScheme='red' size={'sm'} aria-label='See menu' onClick={handleDeleteImg} icon={<CiTrash size={20}/>}/>
                                </Flex>
                            </Flex>

                            <FormControl isRequired mt={6}>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" placeholder='Name' value={inputs.name}
                                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                                />
                            </FormControl>

                            <FormControl isRequired mt={'4'}>
                                <FormLabel> Number</FormLabel>
                                <Input type="number" id="name" placeholder='Phone' value={inputs.phoneNumber}
                                    onChange={(e) => setInputs({...inputs, phoneNumber: e.target.value})}
                                />
                            </FormControl>

                            <FormControl isRequired mt={'4'}>
                                <FormLabel> Email</FormLabel>
                                <Input type="email" id="email" placeholder='Email' value={inputs.address}
                                    onChange={(e) => setInputs({...inputs, address: e.target.value})}
                                />
                            </FormControl>

                            <RadioGroup mt={4} onChange={(value) => setInputs({...inputs, gender: value})}>
                                <Flex gap={5}>
                                    <Radio value='Male'>Male</Radio>
                                    <Radio value='Female'>Female</Radio>
                                </Flex>
                            </RadioGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type={'submit'} isLoading={isLoading}>Update</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>

                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};