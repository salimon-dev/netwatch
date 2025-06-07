import { useQuery } from "@tanstack/react-query";
import SearchInput from "./SearchInput";
import { useState } from "react";
import { searchUsers } from "../../Rest/users";

interface Props {
  name: string;
  label: string;
}
export default function UserSearchInput({ name, label }: Props) {
  const [username, setUsername] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["users", username],
    queryFn: async () => {
      const response = await searchUsers({ username, page: 1, page_size: 5 });
      return response.data;
    },
  });

  function options() {
    if (isLoading) return [];
    if (!data) return [];
    return data.map((item) => ({ value: item.id, label: item.username }));
  }
  return (
    <SearchInput
      name={name}
      label={label}
      loading={isLoading}
      onSearch={async (value) => {
        setUsername(value);
      }}
      options={options()}
    />
  );
}
