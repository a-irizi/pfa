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
import PaperTable from "../components/PaperTable";
import NewPaperModal from "../components/NewPaperModal";
import { useSelector } from "react-redux";

const Papiers = () => {
  const papers = useSelector((store) => store.papers);
  const researchers = useSelector(
    (store) => store.researchers
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  function toggleModel() {
    setIsModalVisible(!isModalVisible);
  }

  const [filters, setFilters] = useState({
    myPapers: false,
    paperStatus: "any",
    rejectedPapers: false,
    inProgressPapers: false,
    authorType: "any",
    nameOrEmailOrTitle: "",
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
    const [ author ] = researchers.filter((r) => (r.id === paper.authorId));
    const coauthors = researchers.filter((r) =>
      paper.coauthorsId.includes(r.id)
    );
    return (
      (substring(author.email, filters.nameOrEmailOrTitle) ||
        substring(
          `${author.firstName} ${author.lastName}`,
          filters.nameOrEmailOrTitle
        ) ||
        substring(paper.title, filters.nameOrEmailOrTitle)) &&
      (!filters.myPapers || author.email === "johndoe@example.com") &&
      (filters.paperStatus === "any" || paper.status === filters.paperStatus) &&
      (filters.authorType === "any" || author.type === filters.authorType) &&
      (filters.paperType === "any" || paper.type === filters.paperType)
    );
  }

  const [pageNumber, setPageNumber] = useState(0);

  const elementsPerPage = 6;
  const elementsVisited = pageNumber * elementsPerPage;
  const elementsOnDisplay = papers.slice(
    elementsVisited,
    elementsVisited + elementsPerPage
  );
  const pageCount = Math.ceil(
    papers.filter(checkFilter).length / elementsPerPage
  );

  function changePage({ selected }) {
    setPageNumber(selected);
  }

  const cards = elementsOnDisplay.map(function (paper) {
    const [author] = researchers.filter((r) => (r.id === paper.authorId));
    const coauthors = researchers.filter((r) =>
      paper.coauthorsId.includes(r.id)
    );
    return (
      checkFilter(paper) && (
        <PaperCard
          key={`${paper.id}-${author.id}`}
          firstName={author.firstName}
          lastName={author.lastName}
          profileImage={author.profile}
          authorPageLink={author.pageLink}
          type={paper.type}
          releaseDate={paper.releaseDate}
          title={paper.title}
          paperPageLink={paper.pageLink}
          coauthors={coauthors}
        />
      )
    );
  });

  const table = (
    <PaperTable
      header={["nom", "type", "auteur", "actions"]}
      rows={elementsOnDisplay.filter(checkFilter)}
    />
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
          name="nameOrEmailOrTitle"
          placeholder="Chercher par nom, email ou par titre"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) =>
            (e.target.placeholder = "Chercher par nom, email ou par titre")
          }
          value={filters.nameOrEmailOrTitle}
          onChange={changeFilter}
        />
        <button onClick={toggleModel} className="new-paper-button">
          +
        </button>
        <NewPaperModal
          isModalVisible={isModalVisible}
          visibilityToggler={toggleModel}
        />
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
          <fieldset className="container container--column container--gap-m">
            <legend>Etat du Papier</legend>
            <Radio
              key="paperStatusAny"
              id="paper-status-any"
              name="paperStatus"
              onChange={changeFilter}
              value="any"
              checkeString={filters.paperStatus}
              label="Tous"
            />
            <Radio
              key="paperStatusValide"
              id="paper-status-valide"
              name="paperStatus"
              onChange={changeFilter}
              value="valide"
              checkeString={filters.paperStatus}
              label="Validé"
            />
            <Radio
              key="paperStatusPending"
              id="paper-status-pending"
              name="paperStatus"
              onChange={changeFilter}
              value="pending"
              checkeString={filters.paperStatus}
              label="En attente"
            />
            <Radio
              key="paperStatusRejected"
              id="paper-status-rejected"
              name="paperStatus"
              onChange={changeFilter}
              value="rejected"
              checkeString={filters.paperStatus}
              label="rejeté"
            />
          </fieldset>
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
        {layout.style === "grid" ? (
          <div className="papers grid grid--2 grid--gap-medium grid--fit-content">
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

export default Papiers;
