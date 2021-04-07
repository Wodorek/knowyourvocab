import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import AnswersTable from '../AnswersTable/AnswersTable';
import Header from '../Header/Header';

interface IProps {
  name: string;
  goodAnswers: string[];
  badAnswers: string[];
  dateSubmitted: number;
}

const StContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(60rem + 14px);
  @media (max-width: 974px) {
    width: calc(40rem + 14px);
  }
`;

const StudentInfo: React.FC<IProps> = (props) => {
  const [studentInfo, setStudentInfo] = useState<IProps>();

  let { username } = useParams<any>();

  console.log(username);

  useEffect(() => {
    const getOneStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3030/admin/students/${username}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const responseData = await response.json();

        setStudentInfo(responseData.student);
      } catch (error) {
        return new Error(error);
      }
    };
    getOneStudent();
  }, [username]);

  console.log(studentInfo);

  return (
    <StContainer>
      <Header heading={`WYNIKI ${username}`} />
      {studentInfo && (
        <AnswersTable
          goodAnswers={studentInfo.goodAnswers}
          badAnswers={studentInfo.badAnswers}
        />
      )}
    </StContainer>
  );
};

export default StudentInfo;
