import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
    const calculateTimeLeft = () => {
        const difference = +targetDate - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatTime = (value: number) => value.toString().padStart(2, '0');

    if (!isClient) {
        return <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">--:--:--</h3>;
    }

    if (+targetDate - +new Date() <= 0) {
        return <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Đang diễn ra</h3>;
    }

    return (
        <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tight tabular-nums">
            {timeLeft.days > 0 ? (
                <span>{timeLeft.days} ngày {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
            ) : (
                <span>{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
            )}
        </h3>
    );
};

export default CountdownTimer;
