"use client";

import { Download } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

type ButtonDownloadProps = {
  url: string;
};

const ButtonDownload = ({ url }: ButtonDownloadProps) => {
  const handleClick = () => {
    axios.post("/api/convert/m3u8-to-mp4", { url });
  };

  return (
    <Button onClick={handleClick}>
      <Download className="w-4 h-4 mr-1" /> Tải về
    </Button>
  );
};

export default ButtonDownload;
