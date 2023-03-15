import { HTMLAttributes } from "react";

function InputUploader(props: HTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center justify-center w-full max-w-xl">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <div className="mb-2 text-slate-500">
            <p className="text-xl font-light text-white bg-black px-6 py-4 rounded mb-6">
              Bấm để tải ảnh lên
            </p>
            <p className="text-sm text-slate-400">
              ...hoặc kéo và thả ảnh vào đây
            </p>
          </div>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          multiple={false}
          className="hidden"
          {...props}
        />
      </label>
    </div>
  );
}

export default InputUploader;
