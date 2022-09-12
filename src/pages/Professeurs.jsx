import React, { useState } from "react";
import { useSelector } from "react-redux";
import ResearcherCard from "../components/ResearcherCard";
import "../styles/professeurs.css";

import gridDimmedLogo from "../images/grid-dimmed.svg";
import gridLogo from "../images/grid.svg";
import listDimmedLogo from "../images/list-dimmed.svg";
import listLogo from "../images/list.svg";
import ResearcherTable from "../components/ResearcherTable";
import ReactPaginate from "react-paginate";
import Radio from "../components/Radio";

const Professeurs = () => {
  const user = useSelector((store) => store.userId);
  const professors = useSelector((store) => store.researchers).filter(
    (r) => r.type === "professor" && r.id !== user
  );
  function substring(string, substring) {
    return string
      .replace(/\s\s+/g, " ")
      .trim()
      .toLocaleLowerCase()
      .includes(substring.replace(/\s\s+/g, " ").trim().toLocaleLowerCase());
  }

  const [filters, setFilters] = useState({
    status: "any",
    nameOrEmail: "",
  });

  function changeFilter(event) {
    const { name, value, checked, type } = event.target;
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const [layout, setLayout] = useState({
    style: "grid", // other option is "list"
  });

  function changeLayout(styleParam) {
    if (styleParam !== layout.style) {
      setLayout({ style: styleParam });
    }
  }

  function checkFilter(professor) {
    return (
      (substring(professor.email, filters.nameOrEmail) ||
        substring(
          `${professor.firstName} ${professor.lastName}`,
          filters.nameOrEmail
        )) &&
      (filters.status === "any" || professor.status === filters.status)
    );
  }

  const [pageNumber, setPageNumber] = useState(0);

  const elementsPerPage = 6;
  const elementsVisited = pageNumber * elementsPerPage;
  const elementsOnDisplay = professors.slice(
    elementsVisited,
    elementsVisited + elementsPerPage
  );
  const pageCount = Math.ceil(
    professors.filter(checkFilter).length / elementsPerPage
  );

  function changePage({ selected }) {
    setPageNumber(selected);
  }

  const cards = elementsOnDisplay.map(
    (prof) =>
      checkFilter(prof) && (
        <ResearcherCard key={`${prof.id}`} researcher={prof} />
      )
  );

  const table = <ResearcherTable rows={professors.filter(checkFilter)} />;

  return (
    <main
      style={{
        display: "grid",
        gridTemplateAreas: '"top top" "filters content"',
        gap: "1.25rem",
        gridTemplateColumns: "12.375rem 1fr",
      }}
    >
      <div
        className="container container--center container--space-between"
        style={{ gridArea: "top", position: "relative" }}
      >
        <div className="layout-buttons">
          <button
            onClick={() => changeLayout("grid")}
            className={`layout-button ${
              layout.style === "grid" ? "layout-button--selected" : ""
            }`}
          >
            <img
              src={layout.style === "grid" ? gridLogo : gridDimmedLogo}
              alt="grid"
            />
          </button>
          <button
            value="list"
            onClick={() => changeLayout("list")}
            className={`layout-button ${
              layout.style === "list" ? "layout-button--selected" : ""
            }`}
          >
            <img
              src={layout.style === "list" ? listLogo : listDimmedLogo}
              alt="list"
            />
          </button>
        </div>
        <input
          type="text"
          name="nameOrEmail"
          placeholder="Chercher par nom ou email "
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) =>
            (e.target.placeholder = "Chercher par nom ou par email")
          }
          value={filters.nameOrEmail}
          onChange={changeFilter}
          style={{
            position: "absolute",
            left: "50%",
            transform: `translateX(calc(-50% + 2.2rem))`,
          }}
        />
      </div>
      <div style={{ gridArea: "filters" }}>
        <fieldset className="container container--column container--gap-m">
          <legend>Etat du Professeur</legend>
          <Radio
            key="professorStatusAny"
            id="professor-status-any"
            name="status"
            onChange={changeFilter}
            value="any"
            checkeString={filters.status}
            label="Tous"
          />
          <Radio
            key="professorStatusvalid"
            id="professor-status-valid"
            name="status"
            onChange={changeFilter}
            value="valid"
            checkeString={filters.status}
            label="Validé"
          />
          <Radio
            key="professorStatusPending"
            id="professor-status-pending"
            name="status"
            onChange={changeFilter}
            value="pending"
            checkeString={filters.status}
            label="En attente"
          />
          <Radio
            key="professorStatusRejected"
            id="professor-status-rejected"
            name="status"
            onChange={changeFilter}
            value="rejected"
            checkeString={filters.status}
            label="rejeté"
          />
        </fieldset>
      </div>
      <div
        style={{
          gridArea: "content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {layout.style === "grid" ? (
          <div
            className="papers container  container--gap container--gap-medium "
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            {cards}
          </div>
        ) : (
          <div className="papers">{table}</div>
        )}
        {pageCount > 1 && (
          <ReactPaginate
            previousLabel="précédent"
            nextLabel="suivant"
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="pagination"
            pageClassName="pagination__page"
            activeClassName="pagination__active"
            previousClassName="pagination__previous"
            nextClassName="pagination__next"
            disabledClassName="pagination__disabled"
            breakClassName="pagination__break"
          />
        )}
      </div>
    </main>
  );
};

export default Professeurs;
