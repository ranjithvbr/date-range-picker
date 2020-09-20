import React from "react";
import '../../styles/DayElementsStyles/day.css';
import { useEndDate, useStartDate, usePickMethod } from "../../context/InitialParametersContext";

export const HoverableDayElement = (props) => {
    const {
        date,
        selectedDays,
        selectedColor,
        hoveredDay,
        setHoveredDay,
        dayOfWeek,
    } = props;

    const startDate = useStartDate();
    const endDate = useEndDate();
    const dayNum = date.getDate();
    const pickMethod = usePickMethod();
    const isDisabled = date < startDate || date > endDate;
    let isInRange = false;

    let hoverStyle = {};
    const coloredStyle = {"background": selectedColor + "60"};

    const handleEnterHover = () => {
        if (!isDisabled && pickMethod !== "date") {
            setHoveredDay(date);
        }
    };

    const handleOutHover = () => {
        if (selectedDays.length === 2) {
            setHoveredDay(null);
        }
    };

    if (selectedDays.length > 0) {
        if (hoveredDay && selectedDays.length === 1) {
            if ((date >= selectedDays[0] && date <= hoveredDay) || 
                (date <= selectedDays[0] && date >= hoveredDay)) {
                isInRange = true;
            } 
        } else if (selectedDays.length === 2) {
            if ((date >= selectedDays[0] && date <= selectedDays[1]) ||
                    (date <= selectedDays[0] && date >= selectedDays[1])) {
                    isInRange = true;
            }
        } else if (selectedDays.length === 1 && date === selectedDays[0]) {
            isInRange = true;
        }
    }

    if (isInRange) {
        if (hoveredDay !== null) {
            if (date.toLocaleDateString() !== hoveredDay.toLocaleDateString()
                || selectedDays.length !== 2) {
                hoverStyle = coloredStyle;
            }
        } else if (selectedDays.length === 2) {
                hoverStyle = coloredStyle;
        }
    }

    const className = `hover-div
        ${isInRange ? "in-range" : "not-in-range"}
        ${(dayOfWeek === 0 && !isInRange) && "first-day-of-week"}
        ${(dayOfWeek === 6 && !isInRange) && "last-day-of-week"}`;
    
    return (
        <div 
            className={className} 
            style={ hoverStyle }
            onMouseEnter={handleEnterHover}
            onMouseLeave={handleOutHover}
        >
                {dayNum}
        </div>
    )
}

export default React.memo(HoverableDayElement);