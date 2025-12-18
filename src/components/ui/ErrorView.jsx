import ApperIcon from "@/components/ApperIcon";

const ErrorView = ({ message = "Something went wrong", onRetry }) => {
  return (
<div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <ApperIcon name="AlertCircle" className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Oops!</h2>
          <p className="text-slate-600">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorView;