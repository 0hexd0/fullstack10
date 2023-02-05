import patientsData from "../../data/patient.json";
import { Patient, PublicPatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
import toNewPatient from "../utils/toNewPatient";

const patientsEntries: Patient[] = patientsData.map((obj) => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  object.entries = [];
  return object;
});

const getEntries = (): Patient[] => {
  return patientsEntries;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientsEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (newPatient: NewPatient) => {
  const addedPatient = {
    id: uuid(),
    ...newPatient,
  };
  patientsEntries.push(addedPatient);
  return addedPatient;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patientsEntries.find((patient) => patient.id === id);
  return patient;
};

export default {
  getEntries,
  addPatient,
  getPatient,
  getNonSensitiveEntries,
};
