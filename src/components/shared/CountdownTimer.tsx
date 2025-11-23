import React, { useEffect, useState } from 'react'

export interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    endTime: Date;
}

export default function CountdownTimer({ endTime }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <div className="flex items-center space-x-2 text-sm">
            <span className="text-foreground/70 text-sm">Deals ends in:</span>
            <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-xs w-44 h-9 justify-center text-base font-normal">
                <CountTime time={timeLeft.days} label="d" />
                <span className="text-foreground/50">:</span>
                <CountTime time={timeLeft.hours} label="h" />
                <span className="text-foreground/50">:</span>
                <CountTime time={timeLeft.minutes} label="m" />
                <span className="text-foreground/50">:</span>
                <CountTime time={timeLeft.seconds} label="s" />
            </div>
        </div>
    );
}

const CountTime = ({ time, label }: { time: number, label: string }) => {
    return (<span>
        {String(time).padStart(2, '0')}{label}
    </span>)
}