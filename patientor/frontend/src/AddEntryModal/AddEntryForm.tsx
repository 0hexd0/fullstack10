import React from "react";
import { Grid, Button } from "@mui/material";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  SelectField,
  SelectFieldOption,
  DiagnosisSelection,
} from "./FormField";
import { EntryType } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = {
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: Array<string>;
  healthCheckRating?: number;
  employerName?: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
  discharge?: {
    date: string;
    criteria: string;
  };
  dischargeDate?: string;
  dischargeCriteria?: string;
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: SelectFieldOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

const healthCheckRatingOptions: SelectFieldOption[] = [
  { value: 0, label: "The patient is in great shape" },
  { value: 1, label: "The patient has a low risk of getting sick" },
  { value: 2, label: "The patient has a high risk of getting sick" },
  { value: 3, label: "The patient has a diagnosed condition" },
];

export const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        date: "2015-01-02",
        specialist: "",
        diagnosisCodes: [],
        description: "",
        // for HealthCheckEntry
        healthCheckRating: 0,
        // for OccupationalHealthcareEntry
        employerName: "",
        sickLeaveStartDate: "",
        sickLeaveEndDate: "",
        // for HospitalEntry
        dischargeDate: "",
        dischargeCriteria: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.Hospital) {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values.sickLeaveStartDate && values.sickLeaveEndDate) {
            errors.sickLeaveStartDate = requiredError;
          }
          if (!values.sickLeaveEndDate && values.sickLeaveStartDate) {
            errors.sickLeaveEndDate = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        const isHealthCheck = values.type === EntryType.HealthCheck;
        const isHospital = values.type === EntryType.Hospital;
        const isOccupationalHealthcare =
          values.type === EntryType.OccupationalHealthcare;

        return (
          <Form className="form ui">
            <SelectField
              label="EntryType"
              name="type"
              options={entryTypeOptions}
            />

            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              name="diagnosisCodes"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            {isHealthCheck && (
              <SelectField
                label="HealthCheckRating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />
            )}

            {isHospital && (
              <>
                <Field
                  label="DischargeDate"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />

                <Field
                  label="DischargeCriteria"
                  placeholder="DischargeCriteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            )}

            {isOccupationalHealthcare && (
              <>
                <Field
                  label="EmployerName"
                  placeholder="EmployerName"
                  name="employerName"
                  component={TextField}
                />

                <Field
                  label="SickLeaveStartDate"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveStartDate"
                  component={TextField}
                />

                <Field
                  label="SickLeaveEndDate"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveEndDate"
                  component={TextField}
                />
              </>
            )}

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
