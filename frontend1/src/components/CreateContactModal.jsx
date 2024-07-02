import {BiAddToQueue} from "react-icons/bi";
// @ts-ignore
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    ModalFooter,
    Image,
    IconButton,
} from "@chakra-ui/react";
import {CiEdit, CiTrash} from "react-icons/ci";
// @ts-ignore
export const CreateContactModal = ({
                                       image,
                                       name,
                                       setName,
                                       phoneNumber,
                                       setPhoneNumber,
                                       address,
                                       setAddress,
                                       gender,
                                       setGender,
                                       handleEditContact,
                                       handleChangeImg,
                                       handleDeleteImg,
                                       handleCreateContact,
                                       isEditing,
                                       isOpen,
                                       onClose,
                                       handleCreate,
                                       closeModal,
                                   }) => {
    const defaultImage =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
    let size = "xl";

    return (
        <>
            <Button onClick={handleCreate}>
                <BiAddToQueue size={20} key={size}/>
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size={size}
                scrollBehavior={"inside"}
                style={{width: "700px"}}
            >
                <ModalOverlay/>
                <form onSubmit={isEditing ? handleEditContact : handleCreateContact}>
                    <ModalContent>
                        <ModalHeader>
                            {isEditing ? "Contact Update" : "New Contact"}
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={"6"}>
                            <Flex style={{
                                flexDirection: "column",
                                position: "relative",
                                width: "170px",
                                height: "170px",
                                margin: "auto",
                            }}>
                                <Input type="file" id="fileInput" style={{display: "none"}} onChange={handleChangeImg}/>
                                <Image
                                    id="output"
                                    src={image}
                                    alt="Profile"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                        margin: "auto",
                                    }}
                                />
                                <Flex gap={3} m={"auto"}>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="green"
                                        size={"sm"}
                                        aria-label={"See the info"}
                                        icon={<CiEdit size={20}/>}
                                        onClick={() => document.getElementById("fileInput").click()}
                                    />
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="red"
                                        size={"sm"}
                                        aria-label="See menu"
                                        onClick={handleDeleteImg}
                                        icon={<CiTrash size={20}/>}
                                    />
                                </Flex>
                            </Flex>

                            <Flex mt={10} gap={5}>
                                <FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={name}
                                        placeholder="name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Phone</FormLabel>
                                    <Input
                                        type="number"
                                        value={phoneNumber}
                                        placeholder="phoneNumber"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </FormControl>
                            </Flex>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={address}
                                    placeholder="email"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </FormControl>

                            <RadioGroup
                                mt={4}
                                value={gender}
                                onChange={(value) => setGender(value)}
                            >
                                <div style={{display: "flex", gap: "10px"}}>
                                    <Radio value="Male">male</Radio>
                                    <Radio value="Female">female</Radio>
                                </div>
                            </RadioGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                {isEditing ? "Update" : "Save"}
                            </Button>
                            <Button onClick={closeModal}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};
