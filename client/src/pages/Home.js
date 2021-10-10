import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Center, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  const {
    loading,
    error,
    data: { getQuizzes: quizzes } = {},
  } = useQuery(FETCH_QUIZZES_QUERY, { fetchPolicy: 'cache-and-network' });

  if (loading) {
    return (
      <Center>
        <Spinner marginTop='50px' size='xl' />
      </Center>
    );
  }

  if (error) {
    return `Error! ${error}`;
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '33.33333%' }} />
        <div
          style={{
            marginBottom: '40px',
            width: '33.33333%',
            fontSize: '80px',
            textAlign: 'center',
            textDecoration: 'underline',
          }}
        >
          Quizzes
        </div>
        <div style={{ textAlign: 'right', width: '33.33333%' }}>
          <Link
            className='homeLink'
            style={{ fontSize: '30px', marginRight: '10px' }}
            to='/createQuiz'
          >
            Create Quiz
          </Link>
        </div>
      </div>
      {quizzes.map((quiz) => (
        <Center color='black' textDecoration='none' key={quiz.id}>
          <Link
            className='homeLink'
            style={{ fontSize: '50px', marginRight: '10px' }}
            to={`/quiz/${quiz.id}`}
          >
            {quiz.title}
          </Link>
        </Center>
      ))}
    </div>
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
