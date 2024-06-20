import { BiAddToQueue } from "react-icons/bi";
import { useState, useEffect } from "react";
// @ts-ignore
import {Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
    Flex, FormControl, FormLabel, Input, Radio, RadioGroup, ModalFooter, useToast, Image, IconButton} from "@chakra-ui/react";
import {CiEdit, CiTrash} from "react-icons/ci";
// @ts-ignore
export const CreateContactModal = ({
   handleChangeImg,
   handleDeleteImg,
   image,
   handleCreateContact,
   isLoading,
    inputs,
    setInputs
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20}/>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <form onSubmit={handleCreateContact}>
                    <ModalContent>
                        <ModalHeader>New Contact</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={'6'}>
                            <Flex style={{flexDirection: 'column', position: 'relative', width: '150px', height: '150px', margin: 'auto',}}>
                                <Input type="file" id="fileInput" style={{display: 'none'}} onChange={handleChangeImg}/>
                                <Image id="output" src={image} alt="Profile"
                                       style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', margin: 'auto'
                                }}/>
                                <Flex gap={3} my={'10px'} m={'auto'}>
                                    <IconButton variant='ghost' colorScheme='green' size={'sm'} aria-label={'See the info'} icon={<CiEdit size={20}/>}
                                        onClick={() => document.getElementById('fileInput').click()}
                                    />
                                    <IconButton variant='ghost' colorScheme='red' size={'sm'} aria-label='See menu' onClick={handleDeleteImg} icon={<CiTrash size={20}/>}/>
                                </Flex>
                            </Flex>

                            <FormControl isRequired mt={6}>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" value={inputs.name} placeholder='name'
                                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                                />
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Phone</FormLabel>
                                <Input type="number" value={inputs.phoneNumber} placeholder='phoneNumber'
                                    onChange={(e) => setInputs({...inputs, phoneNumber: e.target.value})}
                                />
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input type='email' value={inputs.address} placeholder='email'
                                       onChange={(e) => setInputs({...inputs, address: e.target.value})}
                                />
                            </FormControl>

                            <RadioGroup mt={4} onChange={(value) => setInputs({...inputs, gender: value})}>
                                <Flex gap={5}>
                                    <Radio value='Male'>male</Radio>
                                    <Radio value='Female'>female</Radio>
                                </Flex>
                            </RadioGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type="submit" isLoading={isLoading}>Save</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>

                    </ModalContent>
                </form>
            </Modal>
        </>
    );
    }