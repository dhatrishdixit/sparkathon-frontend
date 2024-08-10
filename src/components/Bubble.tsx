import React from 'react'

export function Bubble({text, isAI = false}: {text: string, isAI: boolean}) {
  return (
    <div className={`flex items-start gap-2.5 w-full ${isAI ? "justify-start" : "justify-end"}`}>
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className={`text-sm font-semibold `}>
            {isAI ? "Bot" : "You"}
          </span>
        </div>
        <div className={`flex flex-col leading-1.5 p-4 rounded-xl ${
          isAI 
            ? "bg-gray-100 dark:bg-gray-700 rounded-e-xl rounded-es-xl" 
            : "bg-[#212122] rounded-s-xl rounded-ee-xl"
        }`}>
          <p className={`text-sm font-normal ${isAI ? "text-gray-900 dark:text-white" : "text-white"}`}>
            {text}
          </p>
        </div>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {isAI ? "" : "Delivered"}
        </span>
      </div>
    </div>
  )
}