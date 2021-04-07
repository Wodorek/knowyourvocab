import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Diagnosis from '../diagnosis/Diagnosis';
import QuestionsSheet from '../QuestionBox/QuestionsSheet';
import Answers from './Answers';

interface IProps {
  name: string;
  goodAnswers: string[];
  badAnswers: string[];
  dateSubmitted: number;
}

const StContainer = styled.div`
  display: flex;
  gap: 5rem;
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

  return <Diagnosis />;
};

export default StudentInfo;
