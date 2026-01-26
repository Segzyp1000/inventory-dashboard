
// "use client";

// import { Search } from "lucide-react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { useTransition } from "react";

// export default function SearchInput() {
//   const { replace } = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [isPending, startTransition] = useTransition();

//   function handleSearch(term: string) {
//     const params = new URLSearchParams(searchParams);
//     if (term) {
//       params.set("query", term);
//     } else {
//       params.delete("query");
//     }

//     startTransition(() => {
//       replace(`${pathname}?${params.toString()}`);
//     });
//   }

//   return (
//     <div className="relative w-full sm:max-w-xs">
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <Search className={`h-4 w-4 ${isPending ? "text-indigo-500 animate-pulse" : "text-slate-400"}`} />
//       </div>
//       <input
//         type="text"
//         className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//         placeholder="Search products..."
//         defaultValue={searchParams.get("query")?.toString()}
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//     </div>
//   );
// }