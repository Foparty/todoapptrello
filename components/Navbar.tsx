"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { logo } from "@/public/imgs";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/utils/fetchSuggestion";

export const Navbar = () => {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };
  }, [board]);

  return (
    <>
      <header
        className={
          "flex flex-col md:flex-row items-center justify-between flex-1 p-5 bg-gray-500/10 rounded-b-2xl "
        }
      >
        <div
          className={
            "flex items-center justify-between gap-3.5 pb-10 md:pb-0 z-10"
          }
        >
          <Image
            className={"w-8 object-contain"}
            src={logo}
            alt={"trello logo svg"}
            width={48}
            height={48}
          />
          <h2 className={"text-slate-600 text-4xl "}>Trello</h2>
        </div>
        <div className={"flex space-x-5 w-full md:w-fit z-10"}>
          <form
            className={
              "flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial"
            }
          >
            <MagnifyingGlassIcon className={"h-6 w-6 text-gray-400"} />
            <input
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              className={"flex-1 outline-0 p-2 text-slate-600"}
              type="text"
              placeholder={"Search"}
            />
            <button type={"submit"} hidden={true}></button>
          </form>
          <Avatar name={"Alfonso Martin"} round color={"#0055D1"} size={"50"} />
        </div>
      </header>
      <div
        className={"flex items-center justify-center px-5 py-5 relative z-10"}
      >
        <p
          className={
            "flex items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1] p-5"
          }
        >
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarising your tasks for the day..."}
        </p>
      </div>
    </>
  );
};
