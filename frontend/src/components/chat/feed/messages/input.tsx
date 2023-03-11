import { ObjectId } from 'bson';
import { useMutation } from '@apollo/client';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { Session } from 'next-auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import MessageOperations from '@/graphql/operations/message';
import { SendMessageArguments } from '../../../../../../backend/src/util/types';
import { MessagesData } from '@/util/types';

interface MessageInputProps {
  session: Session;
  conversationId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  session,
  conversationId,
}) => {
  const [messageBody, setMessageBody] = useState<string>('');
  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    SendMessageArguments
  >(MessageOperations.Mutation.sendMessage);

  const onSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Send message to backend
    // 2. Clear message input
    try {
      // call send message mutation
      const { id: senderId } = session.user;
      const messageId = new ObjectId().toString();
      const newMessage: SendMessageArguments = {
        id: messageId,
        senderId,
        conversationId,
        body: messageBody,
      };

      setMessageBody('');

      const { data, errors } = await sendMessage({
        variables: {
          ...newMessage,
        },
        optimisticResponse: {
          sendMessage: true,
        },
        update: (cache) => {
          const existing = cache.readQuery<MessagesData>({
            query: MessageOperations.Query.messages,
            variables: { conversationId },
          }) as MessagesData;

          cache.writeQuery<MessagesData, { conversationId: string }>({
            query: MessageOperations.Query.messages,
            variables: { conversationId },
            data: {
              ...existing,
              messages: [
                {
                  id: messageId,
                  body: messageBody,
                  senderId: session.user.id,
                  conversationId,
                  sender: {
                    id: session.user.id,
                    username: session.user.username,
                  },
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                },
                ...existing?.messages,
              ],
            },
          });
        },
      });

      if (!data?.sendMessage || errors) {
        throw new Error('Failed to send message');
      }
    } catch (error: any) {
      console.error('onSendMessageError', error);
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={6} width="100%">
      <form onSubmit={onSendMessage}>
        <Input
          placeholder="Type a message"
          value={messageBody}
          size="md"
          resize="none"
          onChange={(e) => setMessageBody(e.target.value)}
          _focus={{ boxShadow: 'none', borderColor: 'blue.500' }}
        />
      </form>
    </Box>
  );
};

export default MessageInput;
