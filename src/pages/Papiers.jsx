import React, { useState, useRef } from "react";
import ReactPaginate from "react-paginate";

import "../styles/papiers.css";
import data from "../papersData";

import gridDimmedLogo from "../images/grid-dimmed.svg";
import gridLogo from "../images/grid.svg";
import listDimmedLogo from "../images/list-dimmed.svg";
import listLogo from "../images/list.svg";
import editLogo from "../images/edit.svg";
import deleteLogo from "../images/delete.svg";
import rejectLogo from "../images/reject.svg";
import validateLogo from "../images/validate.svg";

import Checkbox from "../components/Checkbox";
import PaperCard from "../components/PaperCard";
import Radio from "../components/Radio";

const Papiers = () => {
  const [papers, setPapers] = useState(data);
  const [pageNumber, setPageNumber] = useState(0);

  const elementsPerPage = 5;
  const elementsVisited = pageNumber * elementsPerPage;
  const elementsOnDisplay = papers.slice(elementsVisited, elementsVisited + elementsPerPage)
  const pageCount = Math.ceil(papers.length / elementsPerPage)
  function changePage({selected}) {
    setPageNumber(selected)
  }

  const [filters, setFilters] = useState({
    myPapers: false,
    validePapers: false,
    authorType: "any",
    nameOrEmail: "",
    paperType: "any",
  });

  const [layout, setLayout] = useState({
    style: "grid", // other option is "list"
  });

  function substring(string, substring) {
    return string
      .replace(/\s\s+/g, " ")
      .trim()
      .toLocaleLowerCase()
      .includes(substring.replace(/\s\s+/g, " ").trim().toLocaleLowerCase());
  }

  function checkFilter(paper) {
    return (
      (substring(paper.author.email, filters.nameOrEmail) ||
        substring(
          `${paper.author.firstName} ${paper.author.lastName}`,
          filters.nameOrEmail
        )) &&
      (!filters.myPapers || paper.author.email === "johndoe@example.com") &&
      (!filters.validePapers || paper.status === "valide") &&
      (filters.authorType === "any" ||
        paper.author.type === filters.authorType) &&
      (filters.paperType === "any" || paper.type === filters.paperType)
    );
  }

  const cards = elementsOnDisplay.map(
    (paper) =>
      checkFilter(paper) && (
        <PaperCard
          key={paper.id}
          firstName={paper.author.firstName}
          lastName={paper.author.lastName}
          profileImage={paper.author.profile}
          authorPageLink={paper.author.pageLink}
          type={paper.type}
          releaseDate={paper.releaseDate}
          title={paper.title}
          paperPageLink={paper.pageLink}
          coauthors={paper.coauthors ? paper.coauthors : []}
        />
      )
  );

  function changeFilter(event) {
    const { name, value, checked, type } = event.target;
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function changeLayout(styleParam) {
    if (styleParam !== layout.style) {
      setLayout({ style: styleParam });
    }
  }

  console.log(filters);
  return (
    <main>
      <div className="top container container--center container--space-between">
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
          placeholder="Chercher par nom ou par email"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) =>
            (e.target.placeholder = "Chercher par nom ou par email")
          }
          value={filters.nameOrEmail}
          onChange={changeFilter}
        />
        <button className="new-paper-button">+</button>
      </div>
      <div className="filters container container--top container--space-between">
        <div className="container container--column container--gap">
          <Checkbox
            key={`myPapers${filters.myPapers}`}
            id="myPapers"
            name="myPapers"
            onChange={changeFilter}
            checked={filters.myPapers}
            label="mes papiers"
          />
          <Checkbox
            key={`validePapers${filters.validePapers}`}
            id="validePapers"
            name="validePapers"
            onChange={changeFilter}
            checked={filters.validePapers}
            label="validé"
          />
          <fieldset className="container container--column container--gap-m">
            <legend>Type d'auteur</legend>
            <Radio
              key="authorTypeAny"
              id="author-type-any"
              name="authorType"
              onChange={changeFilter}
              value="any"
              checkeString={filters.authorType}
              label="Tous"
            />
            <Radio
              key="authorTypeProfessor"
              id="author-type-professor"
              name="authorType"
              onChange={changeFilter}
              value="professor"
              checkeString={filters.authorType}
              label="professeur"
            />
            <Radio
              key="authorType"
              id="author-type-student"
              name="authorType"
              onChange={changeFilter}
              value="student"
              checkeString={filters.authorType}
              label="thésard"
            />
          </fieldset>
          <fieldset className="container container--column container--gap-m">
            <legend>Type de papier</legend>
            <Radio
              key="paperTypeAny"
              id="paper-type-any"
              name="paperType"
              onChange={changeFilter}
              value="any"
              checkeString={filters.paperType}
              label="Tous"
            />
            <Radio
              key="paperTypeRevue"
              id="paper-type-revue"
              name="paperType"
              onChange={changeFilter}
              value="revue international"
              checkeString={filters.paperType}
              label="Revue"
            />
            <Radio
              key="paperTypeRevue"
              id="paper-type-chapitre"
              name="paperType"
              onChange={changeFilter}
              value="chapitre d'ouvrage"
              checkeString={filters.paperType}
              label="chapitre"
            />
            <Radio
              key="paperTypeCommunication"
              id="paper-type-communication"
              name="paperType"
              onChange={changeFilter}
              value="communication internationalle"
              checkeString={filters.paperType}
              label="communication"
            />
            <Radio
              key="paperTypeWorkshop"
              id="paper-type-workshop"
              name="paperType"
              onChange={changeFilter}
              value="workshop internationalle"
              checkeString={filters.paperType}
              label="workshop"
            />
          </fieldset>
        </div>
      </div>
      <div className="content container container--column container--center container--gap">
      <div className="grid grid--2 grid--gap-medium grdi--fit-content">
        {cards}
      </div>
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
      </div>

    </main>
  );
};

export default Papiers;
