import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_DETAIL";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        patientId: string;
        entry: Entry;
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      const patient = state.patientDetails[action.payload.patientId];
      if (patient.entries) {
        patient.entries.push(action.payload.entry);
      } else {
        patient.entries = [action.payload.entry];
      }

      return {
        ...state,
        patientDetails: {
          ...state.patients,
          [action.payload.patientId]: patient,
        },
      };
    case "ADD_PATIENT_DETAIL":
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patients };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS_LIST", payload: diagnoses };
};

export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
};

export const addPatientDetail = (patient: Patient): Action => {
  return { type: "ADD_PATIENT_DETAIL", payload: patient };
};

export const addEntry = (patientId: string, entry: Entry): Action => {
  return { type: "ADD_ENTRY", payload: { patientId, entry } };
};
