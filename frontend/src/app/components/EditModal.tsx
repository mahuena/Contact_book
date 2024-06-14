import {
    Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, ModalFooter, IconButton
} from "@chakra-ui/react";
import {CiEdit} from "react-icons/ci";

export const EditModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
};