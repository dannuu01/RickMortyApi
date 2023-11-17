import { Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function getStatusColor(status) {
  let statusColor = "";
  switch (status) {
    case "Alive":
      statusColor = "#31e739";
      break;
    case "Dead":
      statusColor = "red";
      break;
    case "unknown":
      statusColor = "#ababab";
      break;
    default:
      statusColor = "#ababab";
      break;
  }
  return statusColor;
}

export default function SwitchStatusLive({ status }) {
  const statusColor = getStatusColor(status);

  const statusStyle = {
    color: statusColor,
  };

  const circleStatus = {
    height: "0.5rem",
    width: "0.5rem",
    marginRight: " 0.375rem",
    background: statusColor,
    borderRadius: "50%",
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ pb: 1, pt: 1 }}>
        <Item sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={circleStatus}></Typography>
          <Typography variant="body2" sx={statusStyle}>
            {" "}
            {status}
          </Typography>
        </Item>
      </Stack>
    </>
  );
}
