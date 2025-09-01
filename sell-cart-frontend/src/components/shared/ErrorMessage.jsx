import { FaExclamationTriangle } from "react-icons/fa";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <FaExclamationTriangle className="text-red-700 text-3xl mr-2" />
      <span className="text-red-900 text-lg font-medium">{errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;
