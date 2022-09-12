import React from "react";
import { useSelector } from "react-redux";

import "../styles/table.css";
import Link from "./Link";

const ResearcherTable = ({ rows }) => {
  const researchers = useSelector((store) => store.researchers);
  const papers = useSelector((store) => store.papers);

  const tableHeader = (
    <tr>
      <th>nom</th>
      <th>prenom</th>
      <th>email</th>
      <th>dernier travail</th>
    </tr>
  );

  const tableBody = rows.map((row) => {
    return (
      <tr key={row.id}>
        <td>{row.firstName}</td>
        <td>{row.lastName}</td>
        <td>{row.email}</td>
        <td>{papers.find((paper) => paper.id === row.lastWorkId).title}</td>
      </tr>
    );
  });

  return (
    <table className="papersTable">
      <thead className="papersTable__header">{tableHeader}</thead>
      <tbody className="papersTable__body">{tableBody}</tbody>
    </table>
  );
};

export default ResearcherTable;
