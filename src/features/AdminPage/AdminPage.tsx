import React, { useEffect, useState } from 'react';

interface IStudent {
  name: string;
  goodAnswers: string[];
  badAnswers: string[];
}

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

  const content = students?.map((el) => {
    return (
      <div>
        <p>{el.name}</p>
        <p>{el.goodAnswers}</p>
        <p>{el.badAnswers}</p>
      </div>
    );
  });

  return <div>{content}</div>;
};

export default AdminPage;
