import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 h-14 border-b border-outline">
      <h1 className="text-1xl font-semibold">endr0id deVlog</h1>
      <ThemeToggleButton />
    </div>
  );
};

export default Header;
