import useFetch from "@/hooks/useFetch";

const url = `http://jsonplaceholder.typicode.com/posts`;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;
  return <p>{data[0].title}</p>;
  // return (
  //   <main>
  //     {<div>hello</div>}
  //   </main>
  // );
}
