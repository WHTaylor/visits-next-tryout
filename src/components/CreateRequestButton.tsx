"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";

type Props = {};

const CreateRequestButton = ({}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsLoading(true);
    fetch("/api/visits", { method: "POST" })
      .then((res) => res.json())
      .then((j) => router.push("/visit/" + j.id));
  };

  return (
    <Button disabled={isLoading} variant="contained" onClick={handleClick}>
      Create new request
    </Button>
  );
};

export default CreateRequestButton;
