const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
    </div>
  );
};

export default LoadingSpinner;
