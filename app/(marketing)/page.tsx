import Image from "next/image";

export default function Marketing() {
  return (
    <main className="pt-20 h-screen w-full bg-neutral-100 relative flex items-center justify-center overflow-hidden">
      <Image
        src={"/images/Logo.svg"}
        alt="Logo background"
        width={500}
        height={500}
        className="absolute bottom-0 -left-52 rotate-45 opacity-60"
      />
      <Image
        src={"/images/Logo.svg"}
        alt="Logo background"
        width={500}
        height={500}
        className="absolute top-28 right-0 -scale-x-100 rotate-12 opacity-60"
      />
      {/* <div></div>
      <span></span> */}
    </main>
  );
}
