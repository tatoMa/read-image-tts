import useFetch from "@/hooks/useFetch";

const url = `https://play.ht/api/transcribe`;

export interface TtsData {
  file: string;
  created_at: number;
  hash: string;
  isCharged: boolean;
}

export default function Home() {
  const body = {
    userId: "public-access",
    platform: "landing_demo",
    ssml: "<speak><p>继中国脱口秀演员李昊石之后，马来西亚脱口秀演员黄瑾瑜（艺名：罗杰叔叔，UncleRoger）在包括微博和视频网站Bilibili在内的中国网络平台遭到封禁。微博对于封禁“罗杰叔叔”的账号的解释是“违反相关法律法规“，这让一些网友感到困惑。        但也有网友指出，黄瑾瑜几天前曾在社交媒体上发布过一段表演视频。视频中，黄瑾瑜调侃了中国政府的监控手段和对台湾是其领土的宣称。      视频显示，在得知一位观众来自中国广州后，舞台上的黄瑾瑜忙不迭地表示“中国，好国家，好国家”，还做出一个撇嘴瞪眼的嘲讽表情。        “我们现在都要这样国家广播公司BBC发布的蛋炒饭教程而在网上爆红。</p></speak>",
    voice: "zh-TW-HsiaoChenNeural",
    narrationStyle: "regular",
  };
  const { data, error } = useFetch<TtsData>(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  });
  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;
  return <audio src={data.file} controls></audio>;
}
