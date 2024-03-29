import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { split } from '@apollo/client/link/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { getSession } from 'next-auth/react';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:4000/graphql/subscriptions',
          connectionParams: async () => ({
            session: await getSession(),
          }),
        })
      )
    : null;

const link =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }: { query: any }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
