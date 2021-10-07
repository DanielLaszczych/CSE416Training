import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Center, Container, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  const {
    loading,
    error,
    data: { getQuizzes: quizzes } = {},
  } = useQuery(FETCH_QUIZZES_QUERY);

  if (loading) {
    return null;
  }

  if (error) {
    return `Error! ${error}`;
  }

  return (
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
  );
}

const FETCH_QUIZZES_QUERY = gql`
  {
    getQuizzes {
      id
      title
      questions {
        id
        question
        answer
        answerChoices
      }
    }
  }
`;

export default Home;
