import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <CircularProgress size={"4rem"} color="secondary" />
    </div>
  );
}
