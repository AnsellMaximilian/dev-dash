import { ReactNode } from "react";
import { Skeleton } from "@progress/kendo-react-indicators";

export interface TileLayoutMetadata {
  loading: boolean;
  error: string | null;
}

export default function Tile({
  children,
  metadata,
}: {
  children: ReactNode;
  metadata: TileLayoutMetadata;
}) {
  const { loading, error } = metadata;

  if (loading) return <Skeleton shape="rectangle" className="w-100 h-100" />;

  if (error)
    return (
      <div className="text-danger text-center d-flex align-items-center justify-content-center h-100 h5">
        {error}
      </div>
    );

  return <>{children}</>;
}
