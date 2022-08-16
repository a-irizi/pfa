import { Field, Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaper } from "../features/papers/papersSlice";
import { updatePreviouslyWorkedWith } from "../features/researchers/researchersSlice";

import "../styles/newPaperModel.css";
import NewPaperCoauthors from "./NewPaperCoauthors";
import NewPaperConfirmation from "./NewPaperConfirmation";
import NewPaperDetails from "./NewPaperDetails";
import NewPaperFileUploads from "./NewPaperFileUploads";

const NewPaperModal = (props) => {
  const userId = useSelector((store) => store.userId);
  const dispatch = useDispatch();
  const researchers = useSelector((store) => store.researchers);
  const [user] = researchers.filter((r) => r.id === userId);
  const [generalPaper, setgeneralPaper] = useState({
    coauthorsId: [],
    title: "",
    index: "",
    type: "",
    paperFile: null,
  });

  const [revue, setRevue] = useState({
    publicationYear: null,
    magazineName: "",
    magazineNumber: null,
    magazineVolume: null,
    startPage: null,
    endPage: null,
  });

  const [chapitre, setChapitre] = useState({
    publicationYear: null,
    bookName: "",
    bookEdition: null,
    chapterName: null,
    startPage: null,
    endPage: null,
  });

  const [communication, setCommunication] = useState({
    date: null,
    conferenceName: "",
    city: null,
    country: null,
    startPage: null,
    endPage: null,
    cummunicationFile: null,
  });

  const [workshop, setWorkshop] = useState({
    date: null,
    conferenceName: "",
    city: null,
    country: null,
    startPage: null,
    endPage: null,
    workshopFile: null,
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
      let newPaper = {
        ...generalPaper,
        ...(generalPaper.type === "revue" && revue),
        ...(generalPaper.type === "chapitre" && chapitre),
        ...(generalPaper.type === "communication" && communication),
        ...(generalPaper.type === "workshop" && workshop),
      };
      newPaper.coauthorsId = [...generalPaper.coauthorsId];

      newPaper.authorId = userId;
      dispatch(addPaper(newPaper));
      for (let i = 0; i < newPaper.coauthorsId.length; i++) {
        if (
          !user.previouslyWorkedWith.includes(
            (id) => id === newPaper.coauthorsId[i]
          )
        ) {
          dispatch(
            updatePreviouslyWorkedWith(
              [...(newPaper.coauthorsId), userId])
          );
          break;
        }
      }

      resetNewPaper();
      props.visibilityToggler();
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
            visibilityToggler={props.visibilityToggler}
            onSubmit={handleSubmit}
          />
        );
      case 2:
        return (
          <NewPaperCoauthors
            generalPaper={generalPaper}
            changePaper={changePaper}
            resetNewPaper={resetNewPaper}
            visibilityToggler={props.visibilityToggler}
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
            visibilityToggler={props.visibilityToggler}
            previousStep={previousStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  }

  return (
    <>
      {props.isModalVisible && (
        <div className="overlay">
          <div className="modal">{renderStep()}</div>
        </div>
      )}
    </>
  );
};

export default NewPaperModal;
