import TierContainer from "./_components/TierContainer";

const Tiers = ["S", "A", "B", "C", "D", "E", "F"];

const Home = () => {
  return (
    <div className=" gap-y-6 flex flex-col items-center justify-start px-4">
      {Tiers.map((tier) => (
        <TierContainer key={tier} tier={tier} />
      ))}
    </div>
  );
};

export default Home;
