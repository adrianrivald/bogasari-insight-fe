import { Box, Typography } from "@mui/material";

interface BalanceCardProps {
  balance: string;
  percentage: string;
}

const BalanceCard = ({ balance, percentage }: BalanceCardProps) => {
  return (
    <Box position="relative">
      <Box
        component="img"
        src="/images/balance.png"
        sx={{
          width: "100%",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "8%", // or '1rem', adjust as needed
          transform: "translateY(-50%)", // only vertical centering
          color: "#ffffff",
        }}
      >
        <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
          Total Saldo Terkini
        </Typography>
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
          {balance}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "#00e676", fontWeight: 600 }}
        >
          ▲ {percentage}
          <span style={{ color: "white", fontWeight: 400 }}> bulan lalu</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default BalanceCard;
