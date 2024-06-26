import { useForm } from "@/zustand/stores/create-listing-modal/formStore";
import { twMerge } from "tailwind-merge";

const RestaurantDisplay = () => {
  const { restaurantData, setPage } = useForm();

  const editElement = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    setPage(+target.id);
  };

  const editableStyle =
    "hover:opacity-60  hover:bg-neutral-500 hover:cursor-pointer duration-150";

  return (
    <div
      className={
        "h-full w-full  max-h-[90%] bg-background grid grid-cols-2 grid-rows-2 gap-4 rounded-lg p-4"
      }
    >
      <div className="w-full h-full relative row-span-2">
        <div
          className={twMerge(
            "w-full h-full bg-cover bg-center rounded-xl",
            editableStyle
          )}
          style={{
            backgroundImage: `url('${
              restaurantData.imageLink ||
              "https://rbyfmlbegrvfgrmnpogc.supabase.co/storage/v1/object/public/static-content/DefaultImage.png"
            }')`,
          }}
          id="2"
          onClick={editElement}
        ></div>
        <div
          className={twMerge(
            "bg-primary p-6 absolute h-8 w-8 flex items-center justify-center rounded-full top-3 left-3 z-50",
            editableStyle
          )}
          id="3"
          onClick={editElement}
        >
          <span className="text-white h-fit w-fit font-bold text-center">
            {restaurantData.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-col py-6">
        <span
          className={twMerge(
            "font-bold text-2xl rounded-lg p-1",
            editableStyle
          )}
          id="1"
          onClick={editElement}
        >
          {restaurantData.name}
        </span>
        <span className="font-semibold text-lg text-neutral-500"> </span>
      </div>
      <div className="w-full h-full flex flex-col ">
        <div className="w-full h-6 bg-neutral-500/20 rounded-md flex items-center justify-center  p-4">
          <span className="text-black font-semibold text-md w-full text-center">
            Polecane pozycje
          </span>
        </div>
        <div
          className={twMerge(
            "grid grid-cols-2 gap-2 mt-2 overflow-auto h-fit max-h-full rounded-lg",
            editableStyle
          )}
          id="4"
          onClick={editElement}
        >
          {restaurantData.recommendedFood.map((r) => (
            <span
              key={r}
              className="w-full h-10 flex items-center justify-center text-white bg-primary rounded-lg text-center"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDisplay;
