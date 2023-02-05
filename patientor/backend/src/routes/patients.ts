import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";
import { NewPatientFields } from "./../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(400).send(`patient with ${id} not found`);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body as NewPatientFields);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
