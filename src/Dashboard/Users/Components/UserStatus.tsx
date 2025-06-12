import { Tag } from "antd";
import { userStatusColor, userStatusText, type IUser } from "../../../specs";

interface Props {
  user: IUser;
}

export default function UserStatus({ user }: Props) {
  const statusText = userStatusText[user.status];
  const statusColor = userStatusColor[user.status];
  if (!statusText || !statusColor) return <Tag color="default">N.D</Tag>;
  return <Tag color={statusColor}>{statusText}</Tag>;
}
