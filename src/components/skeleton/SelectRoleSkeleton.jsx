export default function SelectRoleSkeleton() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-6 bg-gray-50">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm animate-pulse">
        {/* Title Placeholder */}
        <div className="h-8 w-44 bg-gray-300 rounded-md"></div>

        {/* Subtitle Placeholder */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        </div>

        {/* Role Card Placeholders */}
        <div className="flex flex-col gap-3 w-full mt-2">
          {[1, 2].map((index) => (
            <div
              key={index}
              className="w-full px-6 py-4 bg-white dark:bg-black border border-gray-200 rounded-xl shadow-sm space-y-2"
            >
              {/* Role Name Line */}
              <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
              {/* Site Count Line */}
              <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}