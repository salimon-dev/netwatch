import { useQuery } from "@tanstack/react-query";
import SearchInput from "./SearchInput";
import { useState } from "react";
import { searchInvitations } from "../../Rest/invitations";

interface Props {
  name: string;
  label: string;
}
export default function InvitationSearchInput({ name, label }: Props) {
  const [code, setCode] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["invitations", code],
    queryFn: async () => {
      const response = await searchInvitations({ code, page: 1, page_size: 5 });
      return response.data;
    },
  });

  function options() {
    if (isLoading) return [];
    if (!data) return [];
    return data.map((item) => ({ value: item.id, label: item.code }));
  }
  return (
    <SearchInput
      name={name}
      label={label}
      loading={isLoading}
      onSearch={async (value) => {
        setCode(value);
      }}
      options={options()}
    />
  );
}
