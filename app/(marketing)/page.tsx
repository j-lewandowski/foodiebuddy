import Button from "@/components/Button";

export default function Marketing() {
  return (
    <main className="pt-20 h-screen w-full relative flex flex-col items-center justify-center overflow-hidden z-10">
      <span className="text-xl md:text-5xl tracking-wide">
        Twórz, Oceniaj, Odkrywaj
      </span>

      <span className="p-2 md:p-6 mt-4 mb-8 bg-baby-blue rounded-lg text-center text-3xl md:text-5xl">
        FOODIEBUDDY
      </span>

      <span className="text-neutral-600 text-2xl md:text-4xl">
        Twoje kulinarne przygody!
      </span>
      <Button variant="dark" styles="text-xl md:text-3xl mt-8 p-2 md:p-4">
        Zacznij korzystać
      </Button>
    </main>
  );
}
