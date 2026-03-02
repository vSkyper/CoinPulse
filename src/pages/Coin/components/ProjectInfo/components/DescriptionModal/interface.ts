export interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  name?: string;
  image?: string;
}
