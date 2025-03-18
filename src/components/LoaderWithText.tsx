import { Loader } from "@progress/kendo-react-indicators";
import logo from "../assets/logo.svg";

export default function LoaderWithText({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src={logo} style={{ width: 180 }} alt="logo" className="mb-4" />
      {title && <h1 className="h3">{title}</h1>}
      {subtitle && <p>{subtitle}</p>}
      <Loader type="infinite-spinner" size="large" />
    </div>
  );
}
