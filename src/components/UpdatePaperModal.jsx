import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaper, updatePaper } from "../features/papers/papersSlice";
import {
  updateLastWork,
  updatePreviouslyWorkedWith,
} from "../features/researchers/researchersSlice";
import "../styles/newPaperModel.css";
import NewPaperCoauthors from "./NewPaperCoauthors";
import NewPaperConfirmation from "./NewPaperConfirmation";
import NewPaperDetails from "./NewPaperDetails";
import NewPaperFileUploads from "./NewPaperFileUploads";

const UpdatePaperModal = ({ paperId, closeFunction }) => {
  const dispatch = useDispatch();
  let paperToUpdate = useSelector((store) =>
    store.papers.find((p) => p.id === paperId)
  );
  const userId = useSelector((store) => store.userId);
  const user = useSelector((store) =>
    store.researchers.find((r) => r.id === userId)
  );
  const [generalPaper, setgeneralPaper] = useState({
    coauthorsId: paperToUpdate.coauthorsId,
    title: paperToUpdate.title,
    index: paperToUpdate.index,
    type: paperToUpdate.type,
    paperFile: paperToUpdate.paperFile,
  });

  const [revue, setRevue] = useState({
    publicationYear: paperToUpdate.publicationYear,
    magazineName: paperToUpdate.magazineName,
    magazineNumber: paperToUpdate.magazineNumber,
    magazineVolume: paperToUpdate.magazineVolume,
    startPage: paperToUpdate.startPage,
    endPage: paperToUpdate.endPage,
  });

  const [chapitre, setChapitre] = useState({
    publicationYear: paperToUpdate.publicationYear,
    bookName: paperToUpdate.bookName,
    bookEdition: paperToUpdate.bookEdition,
    chapterName: paperToUpdate.chapterName,
    startPage: paperToUpdate.startPage,
    endPage: paperToUpdate.endPage,
  });

  const [communication, setCommunication] = useState({
    date: paperToUpdate.date,
    conferenceName: paperToUpdate.conferenceName,
    city: paperToUpdate.city,
    country: paperToUpdate.country,
    startPage: paperToUpdate.startPage,
    endPage: paperToUpdate.endPage,
    cummunicationFile: null,
  });

  const [workshop, setWorkshop] = useState({
    date: paperToUpdate.date,
    conferenceName: paperToUpdate.conferenceName,
    city: paperToUpdate.city,
    country: paperToUpdate.country,
    startPage: paperToUpdate.startPage,
    endPage: paperToUpdate.endPage,
    workshopFile: paperToUpdate.workshopFile,
  });

  function resetNewPaper() {
    setgeneralPaper({
      coauthorsId: [],
      title: "",
      index: "",
      type: "",
      paperFile: null,
    });
    setRevue({
      publicationYear: null,
      magazineName: "",
      magazineNumber: null,
      magazineVolume: null,
      startPage: null,
      endPage: null,
    });
    setChapitre({
      publicationYear: null,
      bookName: "",
      bookEdition: null,
      chapterName: "",
      startPage: null,
      endPage: null,
    });
    setCommunication({
      date: null,
      conferenceName: "",
      city: null,
      country: null,
      startPage: null,
      endPage: null,
      cummunicationFile: null,
    });
    setWorkshop({
      date: null,
      conferenceName: "",
      city: null,
      country: null,
      startPage: null,
      endPage: null,
      workshopFile: null,
    });

    setCurrentStep(1);
  }

  function changePaper(param) {
    if (currentStep === 1 || currentStep === 3) {
      const { name, value, checked, type, files } = param.target;
      if (name in generalPaper)
        setgeneralPaper((old) => ({
          ...old,
          [name]:
            type === "checkbox" ? checked : type === "file" ? files[0] : value,
        }));
      else if (generalPaper.type === "revue" && name in revue)
        setRevue((old) => ({
          ...old,
          [name]: type === "checkbox" ? checked : value,
        }));
      else if (generalPaper.type === "chapitre" && name in chapitre)
        setChapitre((old) => ({
          ...old,
          [name]: type === "checkbox" ? checked : value,
        }));
      else if (generalPaper.type === "communication" && name in communication)
        setCommunication((old) => ({
          ...old,
          [name]:
            type === "checkbox" ? checked : type === "file" ? files[0] : value,
        }));
      else if (generalPaper.type === "workshop" && name in workshop)
        setWorkshop((old) => ({
          ...old,
          [name]:
            type === "checkbox" ? checked : type === "file" ? files[0] : value,
        }));
    } else if (currentStep === 2) {
      if (generalPaper.coauthorsId.includes(param)) {
        setgeneralPaper(function (old) {
          const newPaper = { ...old };
          newPaper.coauthorsId = [...old.coauthorsId];
          newPaper.coauthorsId.splice(newPaper.coauthorsId.indexOf(param), 1);
          return newPaper;
        });
      } else
        setgeneralPaper(function (old) {
          const newPaper = { ...old };
          newPaper.coauthorsId = [...old.coauthorsId];
          newPaper.coauthorsId.push(param);
          return newPaper;
        });
    }
  }

  const [steps, setSteps] = useState([1, 2, 3]);
  const [currentStep, setCurrentStep] = useState(1);

  function nextStep() {
    if (currentStep < steps.length)
      setCurrentStep((old) => {
        return old + 1;
      });
  }

  function previousStep() {
    if (currentStep > 1)
      setCurrentStep((old) => {
        return old - 1;
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentStep < steps.length) nextStep();
    else {
      paperToUpdate = {
        ...paperToUpdate,
        ...generalPaper,
        ...(generalPaper.type === "revue" && revue),
        ...(generalPaper.type === "chapitre" && chapitre),
        ...(generalPaper.type === "communication" && communication),
        ...(generalPaper.type === "workshop" && workshop),
      };
      paperToUpdate.coauthorsId = [...generalPaper.coauthorsId];

      dispatch(updatePaper(paperToUpdate));
      dispatch(
        updateLastWork({ researcherId: userId, lastWorkId: paperToUpdate.id })
      );
      for (let i = 0; i < paperToUpdate.coauthorsId.length; i++) {
        if (
          !user.previouslyWorkedWith.includes(
            (id) => id === paperToUpdate.coauthorsId[i]
          )
        ) {
          dispatch(
            updatePreviouslyWorkedWith([...paperToUpdate.coauthorsId, userId])
          );
          break;
        }
      }

      resetNewPaper();
      closeFunction();
    }
  }

  function renderStep() {
    switch (currentStep) {
      case 1:
        return (
          <NewPaperDetails
            generalPaper={generalPaper}
            revue={revue}
            chapitre={chapitre}
            communication={communication}
            workshop={workshop}
            changePaper={changePaper}
            resetNewPaper={resetNewPaper}
            visibilityToggler={closeFunction}
            onSubmit={handleSubmit}
          />
        );
      case 2:
        return (
          <NewPaperCoauthors
            generalPaper={generalPaper}
            changePaper={changePaper}
            resetNewPaper={resetNewPaper}
            visibilityToggler={closeFunction}
            previousStep={previousStep}
            onSubmit={handleSubmit}
          />
        );

      case 3:
        return (
          <NewPaperFileUploads
            generalPaper={generalPaper}
            communication={communication}
            workshop={workshop}
            changePaper={changePaper}
            resetNewPaper={resetNewPaper}
            visibilityToggler={closeFunction}
            previousStep={previousStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="overlay">
      <div className="modal">{renderStep()}</div>
    </div>
  );
};

export default UpdatePaperModal;
