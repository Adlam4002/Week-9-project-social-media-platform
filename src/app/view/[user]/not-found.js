import Link from "next/link";

export default function NotFound() {
  return (
    <main id="mdiv">
      <h2>This user page doesn&apos;t exist yet, sorry!</h2>
      <Link href={"/"}>Home</Link>
    </main>
  );
}
