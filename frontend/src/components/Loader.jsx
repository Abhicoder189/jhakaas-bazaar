const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="w-20 h-20 border-saffron-200 border-4 rounded-full"></div>
        <div className="w-20 h-20 border-saffron-600 border-t-4 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </div>
  );
};

export default Loader;
