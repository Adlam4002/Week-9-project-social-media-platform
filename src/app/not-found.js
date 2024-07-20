import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h2>This page doesn&apos;t exist, sorry!</h2>
      <Link href={"/"}>Home</Link>
    </>
  );
}
