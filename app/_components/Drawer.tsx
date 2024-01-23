const Drawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full px-2 absolute top-[100%] left-0 -z-10 h-fit">
      <div className="w-full bg-baby-blue rounded-b-lg h-16 flex items-center justify-center left-0">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
