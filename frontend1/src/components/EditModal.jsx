import {
    Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, ModalFooter, IconButton, useToast, RadioGroup, Flex, Radio, Image, Textarea, Tag
} from "@chakra-ui/react";
import {CiEdit, CiTrash} from "react-icons/ci";
import {useState, useEffect} from "react";
import {BASE_URL} from "../api/Request";

export const EditModal = ({user, getUsers, handleAddMessage, handleDeleteMessage,
                              messages, setMessages, note, setNote, image, setImage,
                                name, setName, phoneNumber, setPhoneNumber, address, setAddress, gender, setGender,
                                handleEditContact, handleEdit, handleChangeImg, handleDeleteImg, tempContact
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    // const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
    // const [image, setImage] = useState(defaultImage);
    // const toast = useToast();
    //
    // const handleChangeImg = (event) => {
    //     const newImage = URL.createObjectURL(event.target.files[0]);
    //     setImage(newImage);
    //     setInputs({...inputs, contactImg_url: newImage});
    // };
    //
    // const handleDeleteImg = () => {
    //     setImage(defaultImage);
    //     setInputs({...inputs, contactImg_url: defaultImage});
    // };


    return (
        <>
            <IconButton variant='ghost' colorScheme='green' size={'sm'} aria-label={'See the info'} icon={<CiEdit size={20} />} onClick={() => {
               console.log("handleEdit")
                handleEdit(user, onOpen);
            }}/>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <form onSubmit={handleEditContact}>
                    <ModalContent>
                        <ModalHeader>Contact Update</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={'6'}>
                            <Flex style={{flexDirection: 'column', position: 'relative', width: '150px', height: '150px', margin: 'auto',}}>
                                <Input type="file" id="fileInput" style={{display: 'none'}} onChange={handleChangeImg}/>
                                <Image id="output" src={image} alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', margin: 'auto'}}/>
                                <Flex gap={3} my={'10px'} m={'auto'}>
                                    <IconButton variant='ghost' colorScheme='green' size={'sm'} aria-label={'See the info'} icon={<CiEdit size={20} />}
                                        onClick={() => document.getElementById('fileInput').click()}
                                    />
                                    <IconButton variant='ghost' colorScheme='red' size={'sm'} aria-label='See menu' onClick={handleDeleteImg} icon={<CiTrash size={20}/>}/>
                                </Flex>
                            </Flex>

                            <Flex mt={10} gap={5}>
                                <FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" placeholder='name' value={name}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Phone</FormLabel>
                                    <Input type="number" id="name" placeholder='phoneNumber' value={phoneNumber}
                                           onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </FormControl>
                            </Flex>

                            <FormControl isRequired mt={'4'}>
                                <FormLabel> Email</FormLabel>
                                <Input type="email" id="email" placeholder='email' value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </FormControl>

                            {/*<FormControl mt={4}>*/}
                            {/*    <FormLabel>Note</FormLabel>*/}
                            {/*    <Textarea placeholder='Write a message' value={note} h={'10px'}*/}
                            {/*              onChange={(e)=> setNote(e.target.value)}*/}
                            {/*    />*/}
                            {/*    <Button mt={2} onClick={handleAddMessage}>Add Message</Button>*/}
                            {/*</FormControl>*/}

                            {/*{tempContact && tempContact.notes && tempContact.notes.split(",").map((message, index) => (*/}
                            {/*    <Tag key={index} mt={2} mr={3} px={2} py={1}>*/}
                            {/*        <Flex style={{flexDirection: 'column'}} >*/}
                            {/*            <Flex style={{align: 'center'}}>*/}
                            {/*                <span style={{color: '#0066b2'}}>{message.text}</span>*/}
                            {/*                <span onClick={() => handleDeleteMessage(index)}*/}
                            {/*                      style={{*/}
                            {/*                          marginLeft: '10px',*/}
                            {/*                          fontSize: '18px',*/}
                            {/*                          cursor: 'pointer',*/}
                            {/*                          textAlign: 'end',*/}
                            {/*                          color: '#0066b2'*/}
                            {/*                      }}>&times;</span>*/}
                            {/*            </Flex>*/}
                            {/*            <p style={{*/}
                            {/*                fontSize: "10px",*/}
                            {/*                textAlign: "start",*/}
                            {/*                marginTop: "4px"*/}
                            {/*            }}>{new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>*/}
                            {/*        </Flex>*/}
                            {/*    </Tag>*/}
                            {/*))}*/}

                            <RadioGroup mt={4} onChange={(value) => setGender(value)}>
                                <Flex gap={5}>
                                    <Radio value='Male'>male</Radio>
                                    <Radio value='Female'>female</Radio>
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