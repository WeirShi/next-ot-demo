"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <Link href={"/page1"}>link to page 1 </Link>
      <br />
      <br />
      <Link href={"/page2"}>link to page 2 </Link>
      <br />
      <br />
      <a style={{ cursor: "pointer" }} onClick={() => router.push("/page1")}>
        router to page 1
      </a>
      <br />
      <br />
      <a style={{ cursor: "pointer" }} onClick={() => router.push("/page2")}>
        router to page 2
      </a>
    </main>
  );
}
