import { Diagnosis, Entry } from "../types";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import HealthRatingBar from "../components/HealthRatingBar";
import BadgeIcon from "@mui/icons-material/Badge";

const CardMain = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <HealthRatingBar showText={true} rating={entry.healthCheckRating} />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <BadgeIcon />
          {entry.employerName}
        </div>
      );
    default:
      return <div></div>;
  }
};

const DiagnosisCard = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: { [id: string]: Diagnosis };
}) => {
  return (
    <Card
      key={entry.id}
      style={{ marginBottom: "20px", marginLeft: "20px" }}
      sx={{ width: 360 }}
    >
      <CardHeader title={entry.date} />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ color: "GrayText" }}>{entry.description}</div>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {diagnoses[code].code} {diagnoses[code].name}
            </li>
          ))}
        </ul>
        <CardMain entry={entry}></CardMain>
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }} light />
        <div>
          diagnose by <i>{entry.specialist}</i>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisCard;
