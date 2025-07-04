import { Box, Typography } from "@mui/material";

interface BalanceCardProps {
  balance: string;
  percentage: string;
}

const BalanceCard = ({ balance, percentage }: BalanceCardProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        // height: 160,
        backgroundImage: `url('/images/balance.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 3,
        paddingY: 2,
        paddingX: 4,
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
        <span style={{ color: "white", fontWeight: 400 }}>bulan lalu</span>
      </Typography>
    </Box>
  );
};

export default BalanceCard;
