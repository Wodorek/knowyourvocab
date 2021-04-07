import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StudentInfo from '../StudentInfo/StudentInfo';

interface IStudent {
  name: string;
  _id: string;
  dateSubmitted: Date;
}

const StContainer = styled.div`
  margin: 2rem;
  width: 60vw;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const StLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
`;

const AdminPage = () => {
  const [students, setStudents] = useState<IStudent[]>();

  useEffect(() => {
    const getStudentsData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3030/admin/getStudents',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const responseData = await response.json();

        console.log(responseData);

        setStudents(responseData.students);
      } catch (error) {
        throw new Error(error);
      }
    };
    getStudentsData();
  }, []);

  console.log('totu');
  let content;
  if (students) {
    content = students.map((el) => {
      const date = new Date(el.dateSubmitted);

      const displayDate = date.toLocaleDateString();
      const time = date.toLocaleTimeString();

      return (
        <StLink key={el._id} to={`/admin/students/${el.name}`}>
          {el.name}: {displayDate} {time}
        </StLink>
      );
    });
  }

  return <StContainer>{content}</StContainer>;
};

export default AdminPage;
