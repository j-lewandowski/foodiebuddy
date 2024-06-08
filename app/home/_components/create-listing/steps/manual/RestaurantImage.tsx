import { useForm } from "@/zustand/stores/create-listing-modal/formStore";
import { useRef } from "react";
import { IoFastFood } from "react-icons/io5";

const RestaurantImage = () => {
  const { restaurantData, setRestaurantData } = useForm();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const handleFiles = (files: FileList) => {
    setRestaurantData({
      ...restaurantData,
      imageLink: URL.createObjectURL(files[0]),
      imageFile: files[0],
    });
  };

  const onChange = () => {
    const files = inputRef.current?.files;
    if (!files) return;
    handleFiles(files);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-bold text-2xl">Wybierz zdjęcie knajpy</span>
      <span className="text-md font-semibold mb-4">(opcjonalnie)</span>
      <p className="w-[80%] text-center text-md font-normal text-neutral-500 mb-4">
        Możesz kliknąć na pole poniżej lub po prostu przeciągnąć na nie zdjęcie
        aby je dodać. Ten krok jest opcjonalny. Jeśli nie masz pod ręką zdjęcia,
        możesz dodać je później, a na tą chwilę zostanie ono zastąpione jednym z
        domyślnych zdjęć.
      </p>
      <div
        className="w-64 h-64 rounded-lg outline-1 outline-dashed flex items-center justify-center"
        onClick={onClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {restaurantData.imageLink ? (
          <div
            className="w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('${restaurantData.imageLink}')`,
            }}
          ></div>
        ) : (
          <IoFastFood className="h-20 w-20 text-primary"></IoFastFood>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};

export default RestaurantImage;
