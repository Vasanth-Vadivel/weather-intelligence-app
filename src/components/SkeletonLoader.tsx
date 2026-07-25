import React from 'react';

export function SkeletonLoader() {
  return (
    <div className="space-y-8 w-full animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="h-6 w-48 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-6 w-32 bg-slate-200 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-slate-200 rounded-full animate-pulse shrink-0"></div>
          <div className="flex flex-col gap-3">
            <div className="h-16 w-32 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50">
              <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse shrink-0"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-3 w-16 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 h-40">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse"></div>
                <div className="h-5 w-24 bg-slate-200 rounded animate-pulse"></div>
             </div>
             <div className="h-4 w-full bg-slate-200 rounded animate-pulse mb-3"></div>
             <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      <div>
        <div className="h-7 w-40 bg-slate-200 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center h-44 justify-center">
               <div className="h-3 w-12 bg-slate-200 rounded animate-pulse mb-2"></div>
               <div className="h-3 w-8 bg-slate-200 rounded animate-pulse mb-4"></div>
               <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse mb-4"></div>
               <div className="h-5 w-16 bg-slate-200 rounded animate-pulse mb-3"></div>
               <div className="h-6 w-full bg-slate-200 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-80 w-full flex flex-col">
           <div className="h-7 w-48 bg-slate-200 rounded animate-pulse mb-6"></div>
           <div className="flex-1 w-full bg-slate-50 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
