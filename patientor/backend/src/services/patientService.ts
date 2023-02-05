import patientsData from "../../data/patient.json";
import { Patient, NonSensitivePatient ,NewPatient} from "../types";
import { v1 as uuid } from 'uuid';
import toNewPatient from "../utils/toNewPatient";

const patientsEntries: Patient [] = patientsData.map(obj => {
  const object = toNewPatient(obj)  as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Patient[] => {
  return patientsEntries;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patientsEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (newPatient:NewPatient) => {
  patientsEntries.push({
    id: uuid(),
    ...newPatient
  });
  return null;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries
};
