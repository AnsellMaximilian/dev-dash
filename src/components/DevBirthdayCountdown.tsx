import Countdown, { CountdownRendererFn } from "react-countdown";
import moment from "moment";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

const CountdownCard = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div
        className="rounded-1 border border-2 shadow-sm w-100 fs-5 flex-grow-1 d-flex justify-content-center align-items-center fw-bold"
        style={{ height: 75 }}
      >
        {value}
      </div>
      <div className="fw-bold small mt-1">{label}</div>
    </div>
  );
};

const renderer: CountdownRendererFn = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}) => {
  if (completed) {
    return <h1>Happy Birthday!</h1>;
  } else {
    return (
      <div className="row g-1" style={{ width: 300 }}>
        <div className="col-3">
          <CountdownCard value={days} label="Days" />
        </div>
        <div className="col-3">
          <CountdownCard value={hours} label="Hours" />
        </div>
        <div className="col-3">
          <CountdownCard value={minutes} label="Minutes" />
        </div>
        <div className="col-3">
          <CountdownCard value={seconds} label="Seconds" />
        </div>
      </div>
    );
  }
};

export default function DevBirthdayCountdown({
  dateJoined,
}: {
  dateJoined: string;
}) {
  const currentYear = moment().year();
  const devBirthdayThisYear = moment(dateJoined).year(currentYear);

  const nextDevBirthday = devBirthdayThisYear.isBefore(moment())
    ? devBirthdayThisYear.add(1, "year")
    : devBirthdayThisYear;
  return (
    <div className="d-flex align-items-start flex-column">
      <div className="d-flex align-items-center mb-2 mx-auto">
        <LiaBirthdayCakeSolid size={44} />
        <div className="ms-1 text-center">
          <div className="fw-bold">Dev Birthday</div>
          <div
            style={{
              marginTop: -6,
            }}
          >
            {devBirthdayThisYear.format("DD MMMM")}
          </div>
        </div>
        <LiaBirthdayCakeSolid size={44} />
      </div>
      <Countdown date={nextDevBirthday.toDate()} renderer={renderer} />
    </div>
  );
}
