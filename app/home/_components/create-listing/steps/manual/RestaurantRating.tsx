import RatingInput from "../../../RatingInput";

const RestaurantRating = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-bold text-2xl">Jak oceniasz knajpę?</span>
      <p className="w-[70%] text-center text-md font-normal text-neutral-500 mb-4">
        Oceń knajpę od <span className="font-bold text-black">1.0</span> do{" "}
        <span className="font-bold text-black">10.0</span> za pomocą suwaka. Po
        kliknięciu na suwak, możesz też dostosować wartości dziesiętne oceny.
      </p>
      <RatingInput />
    </div>
  );
};

export default RestaurantRating;
