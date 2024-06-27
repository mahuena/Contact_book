import { Table, Thead, Tr, Th, TableContainer } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { ContactTable } from "./ContactTable.jsx";

// @ts-ignore
export const ContactGrid = ({
  users,
  filteredUsers,
  tempContact,
  image,
  handleEdit,
  setName,
  name,
  setPhoneNumber,
  phoneNumber,
  setAddress,
  address,
  handleDeleteContact,
  handleView,
  isReviewing,
  setImage,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const filteredUsersList = filteredUsers();

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
              <Th display={{ base: "none", md: "table-cell" }}>profile</Th>
              <Th display={{ base: "none", md: "table-cell" }}>name</Th>
              <Th display={{ base: "none", md: "table-cell" }}>phone</Th>
              <Th display={{ base: "none", md: "table-cell" }}>email</Th>
              <Th display={{ base: "none", md: "table-cell" }}>gender</Th>
              <Th display={{ base: "none", md: "table-cell" }}>action</Th>
            </Tr>
          </Thead>

          {filteredUsersList.map((user) => (
            <ContactTable
              key={user.id}
              user={user}
              image={image}
              tempContact={tempContact}
              handleEdit={handleEdit}
              handleDeleteContact={handleDeleteContact}
              name={name}
              phoneNumber={phoneNumber}
              address={address}
              handleView={handleView}
              isReviewing={isReviewing}
              setName={setName}
              setPhoneNumber={setPhoneNumber}
              setAddress={setAddress}
              setImage={setImage}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
          ))}
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
