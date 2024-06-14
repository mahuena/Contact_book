import { BiAddToQueue } from "react-icons/bi";
// @ts-ignore
import {Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
    Flex, FormControl, FormLabel, Input, Radio, RadioGroup, ModalFooter} from "@chakra-ui/react";

export const CreateContactModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Contact</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={'6'}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                placeholder='Name'
                            />
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel> Number</FormLabel>
                            <Input
                                type="number"
                                id="name"
                                placeholder='Phone'
                            />
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel> Email</FormLabel>
                            <Input
                                type="email"
                                id="email"
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
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
};