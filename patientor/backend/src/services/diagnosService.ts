import diagnosData from "../../data/diagnoses.json";
import {Diagnos}from '../types';

const getEntries = () : Diagnos[]=> {
  return diagnosData;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};