const Loading = () => {
  return (
<div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mx-auto"></div>
          <div className="h-3 w-24 bg-slate-200 rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;