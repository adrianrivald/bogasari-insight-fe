import React, { useRef, Dispatch, SetStateAction } from "react";
import { Grid, TextField } from "@mui/material";

interface PinInputProps {
  values: string[];
  setValues: Dispatch<SetStateAction<string[]>>;
  handleSubmit?: (code: string) => void;
  isError?: boolean;
}

const PinInput = ({
  values,
  setValues,
  handleSubmit,
  isError,
}: PinInputProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);

    if (value && index < values.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const newValues = [...values];
    for (let i = 0; i < values.length; i++) {
      newValues[i] = pasted[i] || "";
    }
    setValues(newValues);

    const lastIndex = Math.min(pasted.length - 1, values.length - 1);
    inputRefs.current[lastIndex]?.focus();
    e.preventDefault();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ flexWrap: "nowrap" }}>
      {values.map((value, i) => (
        <Grid
          key={i}
          sx={{
            display: "flex",
            flex: `1 1 ${100 / values.length}%`,
          }}
        >
          <TextField
            key={i}
            inputRef={(el) => (inputRefs.current[i] = el)}
            value={value}
            onChange={(e) => handleChange(i, e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(e, i)}
            error={isError}
            slotProps={{
              input: {
                sx: {
                  textAlign: "center",
                  justifyContent: "center",
                  "& input": {
                    textAlign: "center",
                  },
                  fontSize: "1.5rem",
                },
              },
            }}
            sx={{
              flex: "1",
              aspectRatio: "1 / 1",
              "& .MuiInputBase-root": {
                height: "100%",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                transition: "all 0.2s ease-in-out",
                "&:hover fieldset": {
                  borderColor: isError ? "red" : "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: isError ? "red" : "primary.main",
                  boxShadow: isError
                    ? "0 0 0 2px rgba(255,0,0,0.2)"
                    : "0 0 0 2px rgba(25,118,210,0.2)",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isError ? "red" : "grey.400",
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PinInput;
