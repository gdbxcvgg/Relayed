import { useEffect, useState } from "react";

type TimeLeftType = {
    days: string | null;
    hours: string;
    minutes: string;
    seconds: string;
} | null;

const padding = (n: number) => String(n).padStart(2, "0");

const calculateTimeLeft = (date: string): TimeLeftType => {
    const now = new Date().getTime();
    const target = new Date(date).getTime();

    const diff = target - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
        days: days > 0 ? padding(days) : null,
        hours: padding(hours),
        minutes: padding(minutes),
        seconds: padding(seconds),
    };
};

const Timer = ({ date }: { date: string }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeftType | null>(
        calculateTimeLeft(date),
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(date));
        }, 1000);

        return () => clearInterval(timer);
    }, [date]);

    return (
        timeLeft && (
            <>
                {timeLeft.days ? timeLeft.days + ":" : ""}
                {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
            </>
        )
    );
};

export default Timer;
