import {ConversationPopulated, MessagePopulated} from '../../../backend/src/util/types';

// USERS
export interface CreateUserNameData {
  createUsername: { success: boolean; error: string };
}

export interface CreateUserNameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}

// CONVERSATIONS
export interface ConversationsData {
  conversations: Array<ConversationPopulated>;
}

export interface CreateConversationData {
  createConversation: { conversationId: string };
}

export interface CreateConversationInput {
  participantIds: Array<string>;
}

export interface ConversationUpdatedData {
  conversationUpdated: {
    conversation: ConversationPopulated;
  }
}

export interface ConversationDeletedData {
  conversationDeleted: ConversationPopulated;
}

/**
 * Messages
 */
export interface MessagesData {
  messages: Array<MessagePopulated>
}

export interface MessagesVariables {
  conversationId: string;
}

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    }
  }
}