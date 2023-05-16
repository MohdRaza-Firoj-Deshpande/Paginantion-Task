import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination';
import '../App.css';

let PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get('https://mohdraza-firoj-deshpande.github.io/Pagination/uers_data.json')
      .then((response) => setUserData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return userData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, userData]);

  return (
    <>
      <h1 className="heading">A Demo Of Pagination</h1>
      <hr />
      <br />
      <div className="table-wrapper">
        <table className="Table">
          <thead>
            <tr>
              
              <th>ID</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
            </tr>
          </thead>
          <tbody className="Tab">
            {currentTableData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={userData.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
