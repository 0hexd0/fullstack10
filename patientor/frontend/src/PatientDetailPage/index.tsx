import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Patient, Gender, Diagnosis, Entry } from "../types";

import { Button } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";

import {
  addEntry,
  addPatientDetail,
  setDiagnosisList,
  useStateValue,
} from "../state";
import { apiBaseUrl } from "../constants";

import DiagnosisCard from "./DiagnosisCard";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Male:
      return <Male />;
    case Gender.Female:
      return <Female />;
    default:
      return <Transgender />;
  }
};

const PatientDetailPage = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patientDetails, diagnoses }, dispatch] = useStateValue();
  const [patientDetail, setPatientDetail] = React.useState<Patient>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patientId) {
      return;
    }
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry(patientId, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const fetchPatientDetail = async (patientId: string) => {
    await fetchDiagnosisList();
    const { data: patient } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${patientId}`
    );
    dispatch(addPatientDetail(patient));
    setPatientDetail(patient);
  };

  const fetchDiagnosisList = async () => {
    try {
      if (Object.keys(diagnoses).length === 0) {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    if (patientId) {
      const patient = patientDetails[patientId];
      if (patient) {
        setPatientDetail(patient);
      } else {
        try {
          void fetchPatientDetail(patientId);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [patientId]);

  if (patientDetail) {
    return (
      <div>
        <h3>
          {patientDetail.name}
          <GenderIcon gender={patientDetail.gender} />
        </h3>
        <div>ssh: {patientDetail.ssn}</div>
        <div>occupation: {patientDetail.occupation}</div>
        <h4>entries</h4>
        <div
          style={{
            background: "rgb(231, 235, 240)",
            display: "flex",
            justifyContent: "flex-start",
            paddingTop: "20px",
            flexWrap: "wrap",
          }}
        >
          {patientDetail.entries.map((entry) => (
            <DiagnosisCard key={entry.id} diagnoses={diagnoses} entry={entry} />
          ))}
        </div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <div>
          <Button
            variant="contained"
            style={{ marginTop: "20px" }}
            onClick={() => openModal()}
          >
            ADD NEW ENTRY
          </Button>
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};

export default PatientDetailPage;
