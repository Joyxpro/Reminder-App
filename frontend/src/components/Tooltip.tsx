const Tooltip: React.FC = () => {
  return (
    <div className="relative group flex items-center">
      {/* Tooltip Target */}
      <div className="w-3 h-3 flex items-center justify-center bg-gray-100 text-black rounded-full text-[10px] cursor-pointer ml-2">
        i
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 w-max px-3 py-1 bg-gray-400 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        The <span className="text-red-600">*</span> indicates that this field is
        required
      </div>
    </div>
  );
};

export default Tooltip;