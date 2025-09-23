import { Box, Typography } from "@mui/material";

interface BalanceCardProps {
  balance: string;
  percentage: string;
  isProfileComplete: boolean;
}

const BalanceCard = ({
  balance,
  percentage,
  isProfileComplete,
}: BalanceCardProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        // height: 160,
        bgcolor: "#0C3A92",
        borderRadius: 3,
        paddingY: 4,
        paddingX: 4,
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src="/images/balance-1.svg"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "20%",
        }}
      />
      <Box
        component="img"
        src="/images/balance-2.svg"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "15%",
        }}
      />
      <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
        Total Saldo Terkini
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          mt: 1,
          fontSize: {
            sm: 32,
            md: 42,
          },
        }}
      >
        {isProfileComplete ? balance : 0}
      </Typography>
      {isProfileComplete && (
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "#00e676", fontWeight: 600 }}
        >
          ▲ {percentage}
          <span style={{ color: "white", fontWeight: 400 }}>bulan lalu</span>
        </Typography>
      )}
    </Box>
  );
};

export default BalanceCard;
