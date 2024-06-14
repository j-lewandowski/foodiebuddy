import Button3D from "@/app/_components/Button3D";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start pt-16 pl-16 pb-16">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-primary rounded-lg py-3 px-6 flex items-center justify-center">
          <span className="text-white font-logo  text-6xl">FOODIEBUDDY</span>
        </div>
        <p className="w-full text-3xl mt-3 font-semibold">
          Jedz, odkrywaj, oceniaj!
        </p>
      </div>
      <div className="w-[40%] flex flex-col mt-16">
        <span className="font-semibold text-xl">O co chodzi?</span>
        <p className="font-regular text-lg text-justify">
          Foodiebuddy to appka, w której możesz oceniać odwiedzone przez Ciebie
          knajpy, a Twój{" "}
          <Link href="/faq">
            <strong className="hover:text-secondary duration-150">buddy</strong>
          </Link>{" "}
          zapamięta twoje ulubione miejsca na mapie, abyś mógł zawsze do nich
          wrócić. Lubisz odwiedzać knajpy ze znajomymi? Nie ma problemu - możesz
          dać im dostęp do swojego buddy&apos;iego, abyście mogli wspólnie
          oceniać knajpy.
        </p>
        <div className="mt-10 flex-col items-center w-full justify-center">
          <span className="text-xl font-bold">Przekonany?</span>
          <div className="w-64 text-2xl mt-6">
            <Link href="/signin">
              <Button3D> Zaczynamy! </Button3D>
            </Link>
          </div>
        </div>
      </div>

      <div className="h-full aspect-square absolute -right-32 -bottom-24">
        <Image
          alt="Hero Image"
          src={
            "https://rbyfmlbegrvfgrmnpogc.supabase.co/storage/v1/object/public/static-content/Blob.png?t=2024-06-14T10%3A11%3A35.205Z"
          }
          style={{ objectFit: "contain" }}
          fill
        />
      </div>
    </div>
  );
};

export default Hero;
