import Image from "next/image";
import SignatureCanvas from "./signaturecanvas";

export default function Home() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="2xl:flex xl:flex hidden">
        <SignatureCanvas width={500} height={200} />
      </div>
      <div className="2xl:hidden xl:hidden sm:block xs:block">
        <SignatureCanvas width={300} height={200} />
      </div>
    </div>
  );
}
