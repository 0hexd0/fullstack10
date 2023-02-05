import patients from "../../data/patients";
import { Patient, PublicPatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatient: NewPatient) => {
  const addedPatient = {
    id: uuid(),
    ...newPatient,
  };
  patients.push(addedPatient);
  return addedPatient;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

export default {
  getEntries,
  addPatient,
  getPatient,
  getNonSensitiveEntries,
};
