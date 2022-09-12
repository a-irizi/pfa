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
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ConfirmActionModal from "../components/ConfirmActionModal";
import UpdatePaperModal from "../components/UpdatePaperModal";

const Papiers = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedUser = useSelector((store) =>
    store.researchers.find((r) => r.id === Number(searchParams.get("userId")))
  );

  const researchers = useSelector((store) => store.researchers);

  const [isNewPaperModalVisible, setIsNewPaperModalVisible] = useState(false);

  function toggleNewPaperModel() {
    setIsNewPaperModalVisible((prev) => !prev);
  }

  const [filters, setFilters] = useState({
    myPapers: false,
    paperStatus: "any",
    authorType: "any",
    nameOrEmailOrTitle: searchParams.get("userId") ? requestedUser.email : "",
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
    const author = researchers.find((r) => r.id === paper.authorId);
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

  const papers = useSelector((store) => store.papers.filter(checkFilter));

  const [pageNumber, setPageNumber] = useState(0);

  const elementsPerPage = 12;
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

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  function toggleConfirmationModal() {
    setShowConfirmationModal((prev) => !prev);
  }

  const [confirmActionModal, setConfirmActionModal] = useState({});

  function confirmAction(action, func, objectId) {
    toggleConfirmationModal();

    setConfirmActionModal(
      <ConfirmActionModal
        action={action}
        cancelFunc={() => {
          toggleConfirmationModal();
          setConfirmActionModal({});
        }}
        confirmFunc={() => {
          dispatch(func(objectId));
          toggleConfirmationModal();
          setConfirmActionModal({});
        }}
      />
    );
  }

  const [isUpdatePaperModalVisible, setIsUpdatePaperModalVisible] =
    useState(false);
  const [updatePaperModal, setUpdatePaperModal] = useState(<></>);
  function toggleUpdatePaperModel() {
    setIsUpdatePaperModalVisible((prev) => !prev);
  }

  function updatePaper(paperId) {
    toggleUpdatePaperModel();
    setUpdatePaperModal(
      <UpdatePaperModal
        paperId={paperId}
        closeFunction={() => {
          toggleUpdatePaperModel();
          setUpdatePaperModal(<></>);
        }}
      />
    );
  }

  const cards = elementsOnDisplay.map(function (paper) {
    return (
      checkFilter(paper) && (
        <PaperCard
          key={`${paper.id}-${paper.authorId}`}
          paper={paper}
          confirmationFunction={confirmAction}
          updateFunction={updatePaper}
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
    <main
      style={{
        display: "grid",
        gridTemplateAreas: '"top top" "filters content"',
        gap: "1.25rem",
        gridTemplateColumns: "12.375rem 1fr",
      }}
    >
      {isUpdatePaperModalVisible && updatePaperModal}
      {showConfirmationModal && confirmActionModal}
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
        <button onClick={toggleNewPaperModel} className="new-paper-button">
          +
        </button>
        <NewPaperModal
          isModalVisible={isNewPaperModalVisible}
          visibilityToggler={toggleNewPaperModel}
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
              key="paperStatusvalid"
              id="paper-status-valid"
              name="paperStatus"
              onChange={changeFilter}
              value="valid"
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
              key="paperTypeChapitre"
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
