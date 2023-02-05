import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Patient, Gender } from "../types";

import { Male, Female, Transgender } from "@mui/icons-material";

import { addPatientDetail, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

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
  const [{ patientDetails }, dispatch] = useStateValue();
  const [patientDetail, setPatientDetail] = React.useState<Patient>();

  const fetchPatientDetail = async (patientId: string) => {
    const { data: patient } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${patientId}`
    );
    dispatch(addPatientDetail(patient));
    setPatientDetail(patient);
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
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};

export default PatientDetailPage;
