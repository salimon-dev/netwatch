import { Card } from "antd";
import { useQuery } from "@tanstack/react-query";
import type { IUser } from "../../../../specs";
import { httpClient } from "../../../../Store/rest";
import UserDetailsForm from "./UserDetailsForm";

interface Props {
  userId?: string;
}
export default function UserDetailsCard({ userId }: Props) {
  const { isLoading, data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) return false;
      const user = await httpClient.get<IUser>(`/admin/users/${userId}`).then((response) => response.data);
      return user;
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Card title="Details" loading={true}></Card>;

  if (!userData) {
    return (
      <UserDetailsForm
        onUpdate={() => {
          console.debug("update");
        }}
      />
    );
  } else {
    return (
      <UserDetailsForm
        user={userData}
        onUpdate={() => {
          console.debug("update");
        }}
      />
    );
  }
}
