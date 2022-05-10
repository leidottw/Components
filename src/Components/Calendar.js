import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { IconTextButton, IconButton } from "./Button";
import useOnClickOutside from "use-onclickoutside";
// import position from "~/service/position";

const Calendar = ({
  positionConfig,
  selected,
  submit,
  close,
  minDate = "1000/01/01",
  maxDate = "9999/12/31",
  isRange = false,
  selectedRangeStart = null,
  selectedRangeEnd = null,
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, close);

  // popup position
  const [top, setTop] = useState(null);
  const [left, setLeft] = useState(null);
  useEffect(() => {
    if (ref && positionConfig) {
      // const { top, left } = position(ref.current, positionConfig);
      const top = 0,
        left = 0;
      setTop(top);
      setLeft(left);
    } else {
      setTop(0);
      setLeft(0);
    }
  }, []);

  // 單選結果
  const [at, setAt] = useState(selected || moment().format("YYYY/MM/DD"));

  // 多選結果
  const [rangeStart, setRangeStart] = useState(selectedRangeStart);
  const [rangeEnd, setRangeEnd] = useState(selectedRangeEnd);
  // 顯示range選擇過程中起點已選但終點未選時日期hover的狀態
  const [rangeEndTemp, setRangeEndTemp] = useState(null);

  // YYYY/MM 月曆顯示的年月
  const calendarStartPosition = moment(
    isRange && selectedRangeStart ? rangeStart : at,
    "YYYY/MM/DD"
  );
  const [YYYY, setYear] = useState(calendarStartPosition.format("YYYY"));
  const [MM, setMonth] = useState(calendarStartPosition.format("MM"));

  // 月曆可操作的範圍
  const min = moment(minDate, "YYYY/MM/DD");
  const max = moment(maxDate, "YYYY/MM/DD");

  // 定義月曆開始顯示的始末
  const now = moment(`${YYYY}/${MM}`, "YYYY/MM");
  const displayStartDate = now.clone().startOf("week");
  const displayEndDate = now.clone().endOf("month").endOf("week");

  // 計算該月
  const weeks = [];
  let week = [];
  const flag = displayStartDate.clone();
  while (flag.diff(displayEndDate) < 0) {
    const rangeStartMomentInstance = moment(rangeStart, "YYYY/MM/DD");
    const rangeEndMomentInstance = moment(rangeEnd, "YYYY/MM/DD");
    const rangeEndTempMomentInstance = moment(rangeEndTemp, "YYYY/MM/DD");
    const tmp = flag.clone();
    const outOfRange = Math.floor(tmp.diff(now, "months", true)) !== 0;
    const today = Math.floor(tmp.diff(moment().startOf("day"), "days")) === 0;
    const selected = isRange
      ? tmp.diff(rangeStartMomentInstance) === 0 ||
        tmp.diff(rangeEndMomentInstance) === 0
      : tmp.diff(moment(at, "YYYY/MM/DD")) === 0;

    const isPreviewRange =
      rangeStart &&
      !rangeEnd &&
      tmp.isBetween(
        moment.min(rangeStartMomentInstance, rangeEndTempMomentInstance),
        moment.max(rangeStartMomentInstance, rangeEndTempMomentInstance),
        "day",
        "[]"
      );
    const isRangeStartTemp = tmp.isSame(
      moment.min(rangeStartMomentInstance, rangeEndTempMomentInstance),
      "day"
    );
    const isRangeEndTemp = tmp.isSame(
      moment.max(rangeStartMomentInstance, rangeEndTempMomentInstance),
      "day"
    );
    const isUndeterminedPoint = tmp.isSame(rangeEndTempMomentInstance, "day");
    const isSolidRange =
      rangeStart &&
      rangeEnd &&
      tmp.isBetween(
        moment.min(rangeStartMomentInstance, rangeEndMomentInstance),
        moment.max(rangeStartMomentInstance, rangeEndMomentInstance),
        "day",
        "[]"
      );
    const isRangeStart = tmp.isSame(
      moment.min(rangeStartMomentInstance, rangeEndMomentInstance),
      "day"
    );
    const isRangeEnd = tmp.isSame(
      moment.max(rangeStartMomentInstance, rangeEndMomentInstance),
      "day"
    );
    if (tmp.diff(min) < 0) {
      week.push(<Date disabled key={tmp.format()} />);
    } else if (tmp.diff(max) > 0) {
      week.push(<Date disabled key={tmp.format()} />);
    } else {
      week.push(
        <Date
          outOfRange={outOfRange}
          today={today}
          selected={selected}
          isPreviewRange={isPreviewRange}
          isRangeStartTemp={isRangeStartTemp}
          isRangeEndTemp={isRangeEndTemp}
          isUndeterminedPoint={isUndeterminedPoint}
          isSolidRange={isSolidRange}
          isRangeStart={isRangeStart}
          isRangeEnd={isRangeEnd}
          key={tmp.format()}
          onMouseEnter={() => {
            if (isRange) {
              if ((rangeStart && rangeEnd) || (!rangeStart && !rangeEnd)) {
                // nothing
              } else {
                setRangeEndTemp(tmp.format("YYYY/MM/DD"));
              }
            }
          }}
          onMouseLeave={() => {
            if (isRange) {
              if ((rangeStart && rangeEnd) || (!rangeStart && !rangeEnd)) {
                // nothing
              } else {
                // setRangeEndTemp(null);
              }
            }
          }}
          onClick={() => {
            setYear(tmp.format("YYYY"));
            setMonth(tmp.format("MM"));
            if (isRange) {
              if ((rangeStart && rangeEnd) || (!rangeStart && !rangeEnd)) {
                setRangeStart(tmp.format("YYYY/MM/DD"));
                setRangeEnd(null);
              } else {
                setRangeEnd(tmp.format("YYYY/MM/DD"));
                setRangeEndTemp(null);
              }
            } else {
              setAt(tmp.format("YYYY/MM/DD"));
            }
          }}
        >
          {tmp.format("D")}
        </Date>
      );
    }

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    flag.add(1, "d");
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 101,
      }}
    >
      <div
        ref={ref}
        style={{
          position: "fixed",
          top,
          left,
          userSelect: "none",
          width: 295,
          height: 336,
          boxSizing: "border-box",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.20)",
          padding: "14px 28px 16px 28px",
          display: top === null ? "none" : "flex",
          flexDirection: "column",
        }}
      >
        <YearMonth
          YYYY={YYYY}
          MM={MM}
          setYear={setYear}
          setMonth={setMonth}
          min={min}
          max={max}
        />
        <Days />
        <Dates weeks={weeks} />
        <Footer
          setYear={setYear}
          setMonth={setMonth}
          setAt={setAt}
          at={at}
          isRange={isRange}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          submit={submit}
        />
      </div>
    </div>
  );
};

const YearMonth = ({ YYYY, MM, setYear, setMonth, min, max }) => {
  const now = moment(`${YYYY}/${MM}`, "YYYY/MM");
  const preMonth = now.clone().subtract(1, "months");
  const nextMonth = now.clone().add(1, "months");
  const preYear = now.clone().subtract(1, "years");
  const nextYear = now.clone().add(1, "years");

  const [_YYYY, _setYear] = useState(YYYY);

  useEffect(() => {
    _setYear(YYYY);
  }, [YYYY]);

  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handlerYearChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1000 || value > 9999) {
      _setYear(YYYY);
      return;
    }
    const target = moment(`${value}/${MM}`, "YYYY/MM");
    if (target.diff(min) < 0) {
      if (YYYY === min.format("YYYY")) {
        _setYear(min.format("YYYY"));
      } else {
        setYear(min.format("YYYY"));
      }
      setMonth(min.format("MM"));
    } else if (target.diff(max) > 0) {
      if (YYYY === max.format("YYYY")) {
        _setYear(max.format("YYYY"));
      } else {
        setYear(max.format("YYYY"));
      }
      setMonth(max.format("MM"));
    } else {
      setYear(target.format("YYYY"));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          icon="left-arrow-svgrepo-com"
          iconProps={{ style: { width: 14 } }}
          style={{ margin: "0 5px" }}
          onClick={() => {
            if (preMonth.diff(min) < 0) {
              return;
            }
            if (preMonth.diff(max) > 0) {
              return;
            }
            setYear(preMonth.format("YYYY"));
            setMonth(preMonth.format("MM"));
          }}
        />
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            color: "#3c3c3c",
            fontWeight: 500,
            width: 82,
          }}
        >
          {monthList[now.month()]}
        </div>
        <IconButton
          icon="right-arrow-svgrepo-com"
          iconProps={{ style: { width: 14 } }}
          style={{ margin: "0 5px" }}
          onClick={() => {
            if (nextMonth.diff(min) < 0) {
              return;
            }
            if (nextMonth.diff(max) > 0) {
              return;
            }
            setYear(nextMonth.format("YYYY"));
            setMonth(nextMonth.format("MM"));
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          icon="left-arrow-svgrepo-com"
          iconProps={{ style: { width: 14 } }}
          style={{ margin: "0 5px" }}
          onClick={() => {
            if (preYear.diff(min) < 0) {
              setYear(min.format("YYYY"));
              setMonth(min.format("MM"));
            } else if (preYear.diff(max) > 0) {
              setYear(max.format("YYYY"));
              setMonth(max.format("MM"));
            } else {
              setYear(preYear.format("YYYY"));
            }
          }}
        />
        <input
          value={_YYYY}
          onChange={(e) => {
            const value = e.target.value;
            if (Number(value) || value === "") {
              _setYear(value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.target.blur(); //handlerYearChange(e);
          }}
          onBlur={handlerYearChange}
          style={{
            width: 52,
            height: 30,
            border: "1px solid #cacaca",
            borderRadius: 8,
            boxSizing: "border-box",
            textAlign: "center",
            fontSize: 14,
            color: "#3c3c3c",
          }}
        />
        <IconButton
          icon="right-arrow-svgrepo-com"
          iconProps={{ style: { width: 14 } }}
          style={{ margin: "0 5px" }}
          onClick={() => {
            if (nextYear.diff(min) < 0) {
              setYear(min.format("YYYY"));
              setMonth(min.format("MM"));
            } else if (nextYear.diff(max) > 0) {
              setYear(max.format("YYYY"));
              setMonth(max.format("MM"));
            } else {
              setYear(nextYear.format("YYYY"));
            }
          }}
        />
      </div>
    </div>
  );
};

const Days = () => (
  <div
    style={{
      borderBottom: "1px solid #cecece",
      display: "flex",
      justifyContent: "space-around",
      height: 26,
      marginTop: 14,
    }}
  >
    <Day>SUN</Day>
    <Day>MON</Day>
    <Day>TUE</Day>
    <Day>WED</Day>
    <Day>THU</Day>
    <Day>FRI</Day>
    <Day>SAT</Day>
  </div>
);

const Dates = ({ weeks }) => (
  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
    {weeks.map((row, index) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 8,
        }}
        key={`week_${index}`}
      >
        {row}
      </div>
    ))}
  </div>
);

const Footer = ({
  setYear,
  setMonth,
  setAt,
  at,
  isRange,
  rangeStart,
  rangeEnd,
  submit,
}) => {
  const submitable = isRange ? rangeEnd : at;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <IconTextButton
        onClick={() => {
          const today = moment();
          setYear(today.format("YYYY"));
          setMonth(today.format("MM"));
          setAt(today.format("YYYY/MM/DD"));
        }}
      >
        Today
      </IconTextButton>
      <IconTextButton
        changed={submitable}
        disabled={!submitable}
        onClick={() => {
          if (isRange) {
            const rangeStartMomentInstance = moment(rangeStart, "YYYY/MM/DD");
            const rangeEndMomentInstance = moment(rangeEnd, "YYYY/MM/DD");
            if (rangeEndMomentInstance > rangeStartMomentInstance) {
              submit({ from: rangeStart, to: rangeEnd });
            } else {
              submit({ from: rangeEnd, to: rangeStart });
            }
          } else {
            submit({ result: at });
          }
        }}
      >
        Agree
      </IconTextButton>
    </div>
  );
};

const Day = ({ children }) => (
  <span
    style={{
      width: 24,
      display: "flex",
      justifyContent: "center",
      fontSize: 10,
      color: "#848484",
    }}
  >
    {children}
  </span>
);

const Date = ({ children, ...props }) => {
  const previewRangeStyle = props.isPreviewRange &&
    !props.isRangeStartTemp &&
    !props.isRangeEndTemp && {
      borderWidth: "1px 0",
      borderStyle: "dashed",
      borderColor: "#4B74FF",
    };
  const previewRangeStartStyle = props.isRangeStartTemp && {
    display: "block",
    right: 0,
    borderWidth: "1px 0",
    borderStyle: "dashed",
    borderColor: "#4B74FF",
  };
  const previewRangeEndStyle = props.isRangeEndTemp && {
    display: "block",
    left: 0,
    borderWidth: "1px 0",
    borderStyle: "dashed",
    borderColor: "#4B74FF",
  };
  const solidRangeStyle = props.isSolidRange &&
    !props.isRangeStart &&
    !props.isRangeEnd && { background: "#B7C7FF" };
  const solidRangeStartStyle = props.isRangeStart && {
    display: "block",
    right: 0,
    background: "#B7C7FF",
  };
  const solidRangeEndStyle = props.isRangeEnd && {
    display: "block",
    left: 0,
    background: "#B7C7FF",
  };

  return (
    <div
      style={{
        boxSizing: "border-box",
        height: 24,
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        ...previewRangeStyle,
        ...solidRangeStyle,
      }}
    >
      {(props.isRangeStartTemp && props.isRangeEndTemp) ||
      (props.isRangeStart && props.isRangeEnd) ? null : (
        <div
          style={{
            boxSizing: "border-box",
            display: "none",
            position: "absolute",
            top: 0,
            width: "50%",
            height: "100%",
            ...previewRangeStartStyle,
            ...previewRangeEndStyle,
            ...solidRangeStartStyle,
            ...solidRangeEndStyle,
          }}
        ></div>
      )}
      <span
        css={`
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: ${({ selected, today, outOfRange }) =>
            selected
              ? "#fff"
              : today
              ? "#4B74FF"
              : outOfRange
              ? "#aeaeae"
              : "#2f2f2f"};
          background: ${({ selected }) => (selected ? "#4B74FF" : null)};
          border-radius: 12px;
          z-index: 1;
          position: relative;

          ${({ disabled }) =>
            disabled
              ? null
              : `
                cursor: pointer;
                &:hover {
                    color: #2f2f2f;
                    background: #94acff;
                }`}

          ${({ isUndeterminedPoint }) =>
            isUndeterminedPoint
              ? `
                color:#2f2f2f;
                background:#94acff;`
              : null}
        `}
        {...props}
      >
        {previewRangeStartStyle ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 12,
              height: 24,
              border: "1px dashed #4B74FF",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              borderRight: 0,
              boxSizing: "border-box",
              marginRight: 12,
            }}
          ></div>
        ) : null}
        {previewRangeEndStyle ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 12,
              height: 24,
              border: "1px dashed #4B74FF",
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              borderLeft: 0,
              boxSizing: "border-box",
              marginLeft: 12,
            }}
          ></div>
        ) : null}
        {children}
      </span>
    </div>
  );
};

export default Calendar;
