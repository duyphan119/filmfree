import { MessageSquareWarning } from "lucide-react";

const ErrorMessage = () => {
  return (
    <div className="bg-destructive text-destructive-foreground p-4 flex gap-1">
      <MessageSquareWarning />
      <span>Có lỗi xảy ra, vui lòng thử lại sau!</span>
    </div>
  );
};

export default ErrorMessage;
