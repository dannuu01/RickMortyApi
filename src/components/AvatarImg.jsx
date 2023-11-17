import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";
import { Badge, Stack } from "@mui/material";
import { getStatusColor } from "../components/SwitchStatusLive"; // Ruta al archivo statusUtils.jsx

export default function AvatarImg({ data }) {
  const statusColor = getStatusColor(data.status);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      width: "25px",
      height: "25px",
      borderRadius: "100%",
      backgroundColor: `${statusColor}`,
      color: `${statusColor}`,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <>
      <Stack direction="row" spacing={2}  justifyContent="center">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt={data.name}
            src={data.image}
            sx={{ width: 200, height: 200 }}
          />
        </StyledBadge>
      </Stack>
    </>
  );
}
