import patientsData from "../../data/patient.json";
import { Patient, NonSensitivePatient } from "../types";

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id, name, dateOfBirth, gender, occupation
    }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};
