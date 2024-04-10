import { FaXmark } from "react-icons/fa6";

const Drawer = () => {
  return (
    <div className="z-10 w-[320px] h-[90%] bg-white absolute top-[50%] -translate-y-[50%] left-0 rounded-r-lg shadow-xl p-2 py-6">
      <div className="w-full h-full flex flex-col justify-start items-center relative">
        <FaXmark className="absolute -top-3 right-1 h-6 w-6 hover:cursor-pointer" />
        <span className="text-xl font-bold">Wybierz klasę</span>
        <p className="w-full text-center mt-2 font-medium text-primary">
          Wybierz klasę knajp, które mam wyświetlić
        </p>
        <div className="w-full min-h-full flex flex-col items-center">
          {/* 3d buttons here */}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
