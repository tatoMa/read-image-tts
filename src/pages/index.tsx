/* eslint-disable @next/next/no-img-element */
import Tts from "@/components/Tts";
import { useEffect, useState } from "react";

export interface TextOverlay {
  lines: any[];
  hasOverlay: boolean;
  message: string;
}

export interface ParsedResult {
  TextOverlay: TextOverlay;
  TextOrientation: string;
  FileParseExitCode: number;
  ParsedText: string;
  ErrorMessage: string;
  ErrorDetails: string;
}

export interface TtsRes {
  ParsedResults: ParsedResult[];
  OCRExitCode: number;
  IsErroredOnProcessing: boolean;
  ProcessingTimeInMilliseconds: string;
  SearchablePDFURL: string;
}
export default function Home() {
  const [inputText, setInputText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ttsData, setTtsData] = useState<TtsRes | undefined>(undefined);

  useEffect(() => {
    getTextFromImg();
  }, []);

  const getTextFromImg = async () => {
    const res = await fetch(
      "https://api.ocr.space/parse/imageurl?apikey=K89841884088957&url=https://p8.itc.cn/q_70/images01/20210926/371b86ebc7834999a2e68e77b6d6d1ec.jpeg&filetype=jpg&OCREngine=1&language=chs"
    );
    const data: TtsRes = await res.json();
    setTtsData(data);
    console.log(data);
    // console.log(ttsData?.parsedResults[0]?.parsedText);
  };

  return (
    <>
      <img
        src="https://p8.itc.cn/q_70/images01/20210926/371b86ebc7834999a2e68e77b6d6d1ec.jpeg"
        alt="image"
      />
      <div>Read text from picture</div>
      {ttsData ? ttsData.ParsedResults[0].ParsedText : null}
      {/* <div></div>
      <label>
        Text input:
        <input
          className="text-black"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </label> */}
      <br />
      <button
        className="p-2 text-black bg-white rounded-sm"
        onClick={(e) => setSubmitted(!submitted)}
      >
        Read the text
      </button>
      {submitted
        ? ttsData && (
            <Tts
              text={JSON.stringify(
                ttsData.ParsedResults[0].ParsedText.replace(
                  /(\r\n|\n|\r)/gm,
                  ""
                )
              )}
            />
          )
        : null}
    </>
  );
}
