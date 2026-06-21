"use client";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 h-14 border-b border-gray-500">
      <div>endr0id deVlog</div>
      <div>
        <label>dark mode</label>
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default Header;
