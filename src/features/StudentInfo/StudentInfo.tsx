import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { getWithExpiry } from '../../common/util/getWithExpiry';
import AnswersTable from '../AnswersTable/AnswersTable';
import Header from '../Header/Header';
import InformationBox from '../InformationBox/InformationBox';
import SuggestedLvl from '../SuggestedLvl/SuggestedLvl';

interface Answers {
  yellow: string[];
  orange: string[];
  green: string[];
  blue: string[];
}

interface IProps {
  name: string;
  goodAnswers: Answers;
  badAnswers: Answers;
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

const StInfo = styled.div`
  display: flex;
  gap: 2rem;
`;

const StudentInfo: React.FC<IProps> = (props) => {
  const [studentInfo, setStudentInfo] = useState<IProps>();
  const history = useHistory();

  let { username } = useParams<any>();

  useEffect(() => {
    const getOneStudent = async () => {
      try {
        const token = getWithExpiry('token');

        if (!token) {
          history.push('/login');
          return;
        }

        const response = await fetch(
          `http://localhost:3030/admin/students/${username}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
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
  }, [history, username]);

  let info;
  if (studentInfo) {
    info = Object.keys(studentInfo.badAnswers).map((el) => {
      return <InformationBox key={el} color={el} />;
    });
  }

  return (
    <StContainer>
      <Header heading={`WYNIKI ${username}`} />
      {studentInfo && (
        <>
          <AnswersTable
            goodAnswers={studentInfo.goodAnswers}
            badAnswers={studentInfo.badAnswers}
          />
          <StInfo>{info}</StInfo>
          <SuggestedLvl />
        </>
      )}
    </StContainer>
  );
};

export default StudentInfo;
