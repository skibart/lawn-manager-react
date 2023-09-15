import React from 'react';

export function SpinnerSize() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50">
      <div className="w-14 h-14 rounded-full animate-spin border-y-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
    </div>
  );
}
