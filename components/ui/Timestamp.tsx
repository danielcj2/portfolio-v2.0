"use client";

import { useState, useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const getTorontoNow = () => {
  return dayjs().tz("America/Toronto");
};

const getTime = () => {
  return getTorontoNow().format("h:mm A");
};

const Timestamp = () => {
  const [time, setTime] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(getTime());
      setDateTime(getTorontoNow().format("YYYY-MM-DDTHH:mm:ssZ"));
    };

    updateTime();

    // NOTE: Align updates to real minute boundaries so displayed time stays accurate.
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const msUntilNextMinute = 60000 - (Date.now() % 60000);

    const timeoutId = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, 60000);
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <p
      aria-live="polite"
      aria-atomic="true"
      className="font-chakra text-xs font-semibold tracking-wider uppercase"
    >
      Toronto, CA
      <span className="mx-1">&#8226;</span>
      <time dateTime={dateTime}>{time}</time>
      <span className="mx-1">&#8226;</span>
      ET
    </p>
  );
};

export default Timestamp;
