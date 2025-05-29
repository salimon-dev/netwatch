import { Modal, Typography } from "antd";

interface Props {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function ConfirmModal({ open, title, description, onConfirm, onCancel }: Props) {
  return (
    <Modal open={open} title={title} onOk={onConfirm} onCancel={onCancel}>
      <Typography>{description}</Typography>
    </Modal>
  );
}
