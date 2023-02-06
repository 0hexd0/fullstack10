import {
  NewEntry,
  EntryType,
  EntryFields,
  BaseEntry,
  Discharge,
  SickLeave,
} from "../types";
import { isDate, isString, isArray, isNumber, isTObject } from "./checker";

const isType = (type: string): type is EntryType => {
  return Object.keys(EntryType).includes(type);
};

const parseType = (type: unknown) => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error("Incorrect or missing type");
  }

  return type;
};

const parseDescription = (desc: unknown) => {
  if (!desc || !isString(desc)) {
    throw new Error("Incorrect or missing description");
  }

  return desc;
};

const parseEmployerName = (employerName: unknown) => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }

  return employerName;
};

const parseSpecialist = (specialist: unknown) => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown) => {
  if (!diagnosisCodes || !isArray<string>(diagnosisCodes, isString)) {
    throw new Error("Incorrect or missing diagnosisCodes");
  }
  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: unknown) => {
  if (!healthCheckRating || !isNumber(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown) => {
  if (!discharge || !isTObject<Discharge>(discharge, ["date", "criteria"])) {
    throw new Error("Incorrect or missing discharge");
  }
  return discharge;
};

const parseSickLeave = (sickLeave: unknown) => {
  if (
    !sickLeave ||
    !isTObject<SickLeave>(sickLeave, ["startDate", "endDate"])
  ) {
    throw new Error("Incorrect or missing sickLeave");
  }
  return sickLeave;
};

const toNewEntry = (object: EntryFields): NewEntry => {
  const type = parseType(object.type);
  const entry: Omit<BaseEntry, "id"> = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    specialist: parseSpecialist(object.specialist),
  };
  switch (type) {
    case EntryType.HealthCheck:
      return {
        type,
        ...entry,
        healthCheckRating: parseHealthCheckRating(
          object.parseHealthCheckRating
        ),
      };
    case EntryType.Hospital:
      return {
        type,
        ...entry,
        discharge: parseDischarge(object.discharge),
      };
    case EntryType.OccupationalHealthcare:
      return {
        type,
        ...entry,
        employerName: parseEmployerName(object.employerName),
        sickLeave: object.sickLeave
          ? parseSickLeave(object.sickLeave)
          : undefined,
      };
    default:
      throw new Error("Incorrect type");
  }
};

export default toNewEntry;
