import { clsx } from "clsx";

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <div className={clsx("w-full bg-dark", className)} style={{ height: 1 }} />
  );
};

export default Divider;
