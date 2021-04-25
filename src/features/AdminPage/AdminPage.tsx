import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LoadingScreen from '../../common/UIElements/LoadingScreen';
import { getWithExpiry } from '../../common/util/getWithExpiry';

interface IStudent {
  name: string;
  _id: string;
  dateSubmitted: Date;
}

const StTable = styled.table`
  margin: 3rem;
  font-size: 2rem;
  border: 2px solid black;
`;

const StLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  display: flex;
  gap: 2rem;
`;

const StHead = styled.th`
  text-align: center;
  min-width: 12rem;
  border: 2px solid black;
  padding: 0.2rem;
`;

const StCell = styled.td`
  text-align: center;
  min-width: 12rem;
  border: 2px solid black;
  padding: 0.2rem;
`;

const StRow = styled.tr`
  text-align: center;
  min-width: 12rem;
  border: 2px solid black;
`;

const AdminPage = () => {
  const [students, setStudents] = useState<IStudent[]>();
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const token = getWithExpiry('token');

    if (!token) {
      history.push('/login');
      return;
    }
    setIsLoading(true);
    const getStudentsData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/admin/getStudents`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        );

        const responseData = await response.json();

        setStudents(responseData.students);
      } catch (error) {
        throw new Error(error);
      }
      setIsLoading(false);
    };

    getStudentsData();
  }, [history]);

  let content;
  if (students) {
    content = students.map((el) => {
      const date = new Date(el.dateSubmitted);
      const displayDate = date.toLocaleDateString();
      const displayTime = date.toLocaleTimeString();

      return (
        <StRow key={el.name + displayTime}>
          <StCell>
            <StLink to={`/admin/students/${el.name}`}>{el.name}</StLink>
          </StCell>
          <StCell>{displayDate}</StCell>
          <StCell>{displayTime}</StCell>
        </StRow>
      );
    });
  }

  return isLoading ? (
    <LoadingScreen message="Getting students list, please wait" />
  ) : (
    <div>
      <StTable>
        <tbody>
          <StRow>
            <StHead>Name</StHead>
            <StHead>Date</StHead>
            <StHead>Time</StHead>
          </StRow>
          {content}
        </tbody>
      </StTable>
    </div>
  );
};

export default AdminPage;
