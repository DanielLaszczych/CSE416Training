import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Center,
  Container,
  Box,
  Spinner,
  ChakraProvider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  const {
    loading,
    error,
    data: { getQuizzes: quizzes } = {},
  } = useQuery(FETCH_QUIZZES_QUERY);

  if (loading) {
    console.log(process.env.API_URI);
    return (
      <ChakraProvider>
        <Center>
          <Spinner marginTop='50px' size='xl' />
        </Center>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider>
        <Center>
          <Spinner marginTop='50px' size='xl' />
        </Center>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <div>
        <Container centerContent>
          <Box marginBottom='40px' fontSize='80px' textDecoration='underline'>
            Quizzes
          </Box>
          {quizzes.map((quiz) => (
            <Center
              as={Link}
              color='black'
              fontSize='50px'
              textDecoration='none'
              key={quiz.id}
              to={`/quiz/${quiz.id}`}
              _hover={{ color: 'purple' }}
            >
              {quiz.title}
            </Center>
          ))}
        </Container>
      </div>
    </ChakraProvider>
  );
}

const FETCH_QUIZZES_QUERY = gql`
  {
    getQuizzes {
      id
      title
    }
  }
`;

export default Home;
