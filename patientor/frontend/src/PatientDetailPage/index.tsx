import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Patient, Gender, Diagnosis } from "../types";

import { Button } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";

import { addPatientDetail, setDiagnosisList, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import DiagnosisCard from "./DiagnosisCard";

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
          }}
        >
          {patientDetail.entries.map((entry) => (
            <DiagnosisCard key={entry.id} diagnoses={diagnoses} entry={entry} />
          ))}
        </div>
        <div>
          <Button variant="contained" style={{ marginTop: "20px" }}>
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
