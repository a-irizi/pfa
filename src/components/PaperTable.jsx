import React from "react";

import "../styles/paperTable.css"
import Link from "./Link"

const PaperTable = (props) => {
  const tableHeader = (
    <tr>
      {props.header.map((header) => (
        <th>{header}</th>
      ))}
    </tr>
  );

  const tableBody = props.rows.map((row) => (
    <tr key={row.id}>
      <td><Link className="papersTable__link" href="#" text={row.title}/></td>
      <td>{row.type}</td>
      <td><Link className="papersTable__link" href="#" text={`${row.author.firstName} ${row.author.lastName}`}/></td>
    </tr>
  ));


  return (
    <table className="papersTable">
      <thead className="papersTable__header">{tableHeader}</thead>
      <tbody className="papersTable__body">
        {tableBody}
      </tbody>
    </table>
  );
};

export default PaperTable;
