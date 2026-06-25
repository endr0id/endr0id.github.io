import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 h-14 border-b border-outline">
      <h1 className="text-1xl font-semibold">deVlog</h1>
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
