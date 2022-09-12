import React from "react";
import { useSelector } from "react-redux";

import "../styles/table.css";
import Link from "./Link";

const PaperTable = (props) => {
  const researchers = useSelector((store) => store.researchers);

  const tableHeader = (
    <tr>
      {props.header.map((header) => (
        <th>{header}</th>
      ))}
    </tr>
  );

  const tableBody = props.rows.map((row) => {
    const author = researchers.find((r) => r.id === row.authorId);
    return (
      <tr key={row.id}>
        <td>
          {/* TODO: replace Link with react router Link */}
          {/* <Link className="papersTable__link" href="#" text={row.title} /> */}
          {row.title}
        </td>
        <td>{row.type}</td>
        <td>
          {/* <Link */}
          {/*   className="papersTable__link" */}
          {/*   href="#" */}
          {/*   text={`${author.firstName} ${author.lastName}`} */}
          {/* /> */}
          {`${author.firstName} ${author.lastName}`}
        </td>
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

export default PaperTable;
