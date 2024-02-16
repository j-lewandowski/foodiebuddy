"use client";
import { FaTrashAlt } from "react-icons/fa";

const DeleteButton = ({ id }: { id: string }) => {
  const deleteRestaurant = async () => {
    await fetch("/api/restaurants/restaurant?id=" + id, {
      method: "DELETE",
    });
  };

  return (
    <FaTrashAlt
      className="text-rose-500 h-8 w-8 z-10"
      onClick={deleteRestaurant}
    />
  );
};

export default DeleteButton;
