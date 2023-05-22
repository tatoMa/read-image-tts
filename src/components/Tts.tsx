import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";

const url = `https://play.ht/api/transcribe`;

export interface TtsData {
  file: string;
  created_at: number;
  hash: string;
  isCharged: boolean;
}

export default function Tts({ text }: { text: string }) {
  //   const [textToSpeak, setTextToSpeak] = useState("");
  //   useEffect(() => {
  //     setTextToSpeak(text);
  //   }, [text]);

  const body = {
    userId: "public-access",
    platform: "landing_demo",
    ssml: `<speak><p>${text}</p></speak>`,
    voice: "zh-TW-HsiaoChenNeural",
    narrationStyle: "regular",
  };
  const { data, error } = useFetch<TtsData>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;
  return <audio src={data.file} controls></audio>;
}
