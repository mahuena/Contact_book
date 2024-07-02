import {Table, Thead, Tr, Th, TableContainer} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import {useState} from "react";
import {ContactTable} from "./ContactTable.jsx";

// @ts-ignore
export const ContactGrid = ({
                                users,
                                filteredUsers,
                                handleEdit,
                                handleDeleteContact,
                                messages,
                                setMessages,
                                handleEditMessage,
                                handleDeleteMessage,
                                currentMessage,
                                setCurrentMessage,
                                editMode,
                                handleAddMessage,
                                addNoteMutation,
                                updateNoteMutation,
                                deleteNoteMutation
                            }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <TableContainer
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    marginBottom: "50px",
                }}
            >
                <Table size={"md"} variant="simple">
                    <Thead>
                        <Tr>
                            <Th display={{base: "none", md: "table-cell"}}>profile</Th>
                            <Th display={{base: "none", md: "table-cell"}}>name</Th>
                            <Th display={{base: "none", md: "table-cell"}}>phone</Th>
                            <Th display={{base: "none", md: "table-cell"}}>email</Th>
                            <Th display={{base: "none", md: "table-cell"}}>gender</Th>
                            <Th textAlign={'center'} display={{base: "none", md: "table-cell"}}>action</Th>
                        </Tr>
                    </Thead>

                    <ContactTable
                        handleEdit={handleEdit}
                        handleDeleteContact={handleDeleteContact}
                        filteredUsers={filteredUsers}
                        messages={messages}
                        setMessages={setMessages}
                        handleEditMessage={handleEditMessage}
                        handleDeleteMessage={handleDeleteMessage}
                        currentMessage={currentMessage}
                        setCurrentMessage={setCurrentMessage}
                        editMode={editMode}
                        handleAddMessage={handleAddMessage}
                        addNoteMutation={addNoteMutation}
                        updateNoteMutation={updateNoteMutation}
                        deleteNoteMutation={deleteNoteMutation}
                    />
                </Table>
            </TableContainer>

            {isLoading && users.length === 0 && (
                <Text fontSize={"xl"} textAlign={"center"} mt={4}>
                    {" "}
                    No Contacts
                </Text>
            )}
        </>
    );
};
