import { Tag } from "antd";
import { transactionStatusColor, transactionStatusText, type ITransaction } from "../../../specs";

interface Props {
  transaction: ITransaction;
}

export default function TransactionStatus({ transaction }: Props) {
  const statusText = transactionStatusText[transaction.status];
  const statusColor = transactionStatusColor[transaction.status];
  if (!statusText || !statusColor) return <Tag color="default">N.D</Tag>;
  return <Tag color={statusColor}>{statusText}</Tag>;
}
