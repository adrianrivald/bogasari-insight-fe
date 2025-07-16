import React, { useRef, Dispatch, SetStateAction } from "react";
import { Box, TextField } from "@mui/material";

interface PinInputProps {
  values: string[];
  setValues: Dispatch<SetStateAction<string[]>>;
  handleSubmit?: (code: string) => void;
  isError?: boolean;
}

const PinInput = ({ values, setValues, isError }: PinInputProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);

    if (value && index < 5) {
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
    for (let i = 0; i < 6; i++) {
      newValues[i] = pasted[i] || "";
    }
    setValues(newValues);

    const lastIndex = Math.min(pasted.length - 1, 5);
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

  // Submit automatically when all 6 digits are filled
  // useEffect(() => {
  //   const code = values.join("");
  //   if (code.length === 6 && !values.includes("")) {
  //     handleSubmit(code);
  //   }
  // }, [values]);

  return (
    <Box display="flex" gap={2}>
      {values.map((value, i) => (
        <TextField
          key={i}
          inputRef={(el) => (inputRefs.current[i] = el)}
          value={value}
          onChange={(e) => handleChange(i, e.target.value)}
          onPaste={handlePaste}
          onKeyDown={(e) => handleKeyDown(e, i)}
          error={isError} // <-- triggers red border
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "1.5rem",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isError ? "red" : "#90caf9",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default PinInput;
