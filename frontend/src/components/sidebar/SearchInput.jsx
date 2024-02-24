// STARTER CODE SNIPPET
import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversation } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    if (search.length < 3) {
      toast.error("Search term must be at least 3 charactors long");
      return;
    }

    const searchConversation = conversation.find((e) => {
      return e.fullName.toLowerCase().includes(search.toLowerCase());
    });

    if (searchConversation) {
      setSelectedConversation(searchConversation);
      setSearch("");
    } else {
      toast.error("No Such User found");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
