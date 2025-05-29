export const LoadingSpinner = () => {
  return (
    <div
      className="size-30 animate-spin rounded-full border-5 border-t-transparent border-green-300"
      role="status"
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  );
};
