import { BarLoader } from "react-spinners";
export default function Leading() {
  return (
    <>
      <div className="flex h-screen w-full justify-center pt-20">
        <BarLoader loading={true} color="#ffffff" />
      </div>
    </>
  );
}
