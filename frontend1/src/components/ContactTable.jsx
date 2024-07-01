import { Flex, IconButton, Tbody, Td, Tr, Image, Link } from "@chakra-ui/react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { ViewModal } from "./ViewModal.jsx";
import { Notes } from "./Notes.jsx";

export const ContactTable = ({
  handleEdit,
  handleDeleteContact,
  messages,
  isOpen,
  onOpen,
  onClose,
  closeModal,
  filteredUsers,
}) => {
  const filteredUsersList = filteredUsers();

  return (
    <>
      {filteredUsersList.map((user, index) => (
        <Tbody w={"100%"} maxW={"1200px"} key={index}>
          <Tr>
            <Td>
              <Image
                width="50px"
                height="50px"
                objectFit="cover"
                borderRadius={"50%"}
                src={user["contactImg_url"]}
              />
            </Td>
            <Td translate="no">{user.name}</Td>
            <Td translate="no" display={{ base: "none", md: "table-cell" }}>
              {user.phoneNumber}
            </Td>
            <Td
              translate="no"
              display={{ base: "none", md: "table-cell" }}
              cursor={"pointer"}
            >
              <Link href={`mailto:${user.address}`} isExternal>
                {user.address}
              </Link>
            </Td>
            <Td display={{ base: "none", md: "table-cell" }}>{user.gender}</Td>
            <Td>
              <Flex>
                <ViewModal
                  user={user}
                  messages={messages}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  closeModal={closeModal}
                />

                <Notes />

                <IconButton
                  variant="ghost"
                  colorScheme="green"
                  size={"sm"}
                  aria-label={"Edit Contact"}
                  icon={<CiEdit size={20} />}
                  onClick={() => handleEdit(user)}
                />

                <IconButton
                  variant="ghost"
                  colorScheme="red"
                  size={"sm"}
                  aria-label="see menu"
                  onClick={() => handleDeleteContact(user.id)}
                  icon={<CiTrash size={20} />}
                />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      ))}
    </>
  );
};
