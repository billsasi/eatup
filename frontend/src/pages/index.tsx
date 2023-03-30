import { Box, Flex, Text } from '@chakra-ui/react';
import { NextPageContext } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Chat from '../components/chat';
import Auth from '../components/auth';
import { Session } from 'next-auth';
import RestaurantOperations from '@/graphql/operations/restaurant';
import { useQuery } from '@apollo/client';
import styles from '../styles/restaurants-card.module.css';
import RestaurantCard from '@/components/restaurant/restaurant-card';

export default function Home() {
  const { data: session } = useSession();

  const { data, error, loading } = useQuery(
    RestaurantOperations.Queries.restaurants
  );

  console.log('restaurant data', data);

  const reloadSession = async () => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };

  return (
    <Flex justify="center" py={20} flexDirection="column">
      <div>
        <RestaurantCard restaurants={data?.restaurants} />
      </div>
    </Flex>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
