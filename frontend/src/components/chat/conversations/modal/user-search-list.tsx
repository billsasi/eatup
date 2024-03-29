import { SearchedUser } from '@/util/types';
import { Avatar, Button, Flex, Stack, Text } from '@chakra-ui/react';

interface UserSearchListProps {
  users: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
  removeParticipant: (userId: string) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({ users, addParticipant, removeParticipant }) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.id}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: 'gray.100' }}
            >
              <Avatar />
              <Flex justify="space-between" align="center" width="100%">
                <Text>{user.username}</Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: 'brand.100' }}
                  onClick={() => {addParticipant(user)}}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UserSearchList;
