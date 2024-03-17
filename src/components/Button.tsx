import { Button as MUIButton } from '@mui/material';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <MUIButton variant="contained" onClick={onClick}>
    {label}
  </MUIButton>
);
