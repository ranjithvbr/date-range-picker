import React from "react";
import '../../styles/DayElementsStyles/day.css';
import { useLanguage, useEndDate, useStartDate, usePickMethod } from "../../context/InitialParametersContext";
import HoverableDayElementContainer from "../../containers/DayElementsContainers/HoverableDayElementContainer";

export const SelectableDayElement = (props) => {
    const {
        date,
        id,
        selectedDays,
        rightViewedMonth,
        rightViewedYear,
        leftViewedMonth,
        leftViewedYear,
        selectedColor,
        isOfCurrentViewedMonth,
        dayOfWeek,
        genericStyle,
        boardsNum,
        setSelectedDays,
        setRightViewedMonth,
        setLeftViewedMonth,
        setViewedMonth,
    } = props;


    const startDate = useStartDate();
    const endDate = useEndDate();
    const language = useLanguage();
    const month = date.getMonth();
    const year = date.getFullYear();
    const pickMethod = usePickMethod();
    const isToday = date.toLocaleDateString() === new Date().toLocaleDateString() ?  true : false;
    const isDisabled = date < startDate || date > endDate;
    let isSelected = false;

    selectedDays.forEach(element => {
       if (date.toLocaleDateString() === element.toLocaleDateString() && !isSelected) {
            isSelected = true;
        }
    });

    const nonCurrentDateClick = () => {
        let isNonCurrentCase;
        let dateOfNearBoard = false;
        if ((pickMethod === "range" && selectedDays.length !== 1) || pickMethod === "date") {
            isNonCurrentCase = true;
        }
        if ((rightViewedMonth === month && rightViewedYear === year) ||
            (leftViewedMonth === month && leftViewedYear === year)) {
            dateOfNearBoard = true;
        }
        if ((!isOfCurrentViewedMonth && isNonCurrentCase) && !dateOfNearBoard) {
            setViewedMonth(date.getMonth(), date.getFullYear());
            if (rightViewedYear === year && rightViewedMonth === month) {
                setRightViewedMonth(rightViewedMonth + 1, rightViewedYear);
            }
            else if (leftViewedYear === year && leftViewedMonth === month) {
                setLeftViewedMonth(leftViewedMonth - 1, leftViewedYear);
            }
        }
    }

    const setMonthsOnLeftClick = (rightMonth, rightYear, leftMonth, leftYear) => {
        setRightViewedMonth(rightMonth, rightYear);
        setViewedMonth(leftMonth, leftYear);
    }
    
    const setMonthsOnRightClick = (rightMonth, rightYear, leftMonth, leftYear) => {
        setViewedMonth(rightMonth, rightYear);
        setLeftViewedMonth(leftMonth, leftYear);
    }

    const rangeSelectionHandling = () => {
        const currentDate = new Date(year, month, 1);

        if (currentDate < endDate && boardsNum === 2) {
            if (selectedDays.length === 1) {
                const firstSelectMonth = selectedDays[0].getMonth();
                const firstSelectYear = selectedDays[0].getFullYear();
                const firstSelectDate = new Date(firstSelectYear, firstSelectMonth, 1);
                let { rightId, leftId } = { rightId: 1, leftId: 0 };
                if (language === "Hebrew") {
                    rightId = 0;
                    leftId = 1;
                }

                if (id === leftId) {
                    if (currentDate > firstSelectDate) {
                        setMonthsOnLeftClick(month, year, firstSelectMonth, firstSelectYear);
                    }
                    else if (currentDate < firstSelectDate) {
                        setMonthsOnLeftClick(firstSelectMonth, firstSelectYear, month, year);
                    }
                }
                else if (id === rightId) {
                    if (currentDate > firstSelectDate) {
                        setMonthsOnRightClick(month, year, firstSelectMonth, firstSelectYear);
                    }
                    else if (currentDate.toLocaleDateString() === firstSelectDate.toLocaleDateString()) {
                        setMonthsOnRightClick(month + 1, year, month, year);
                    }
                    else {
                        setMonthsOnRightClick(firstSelectMonth, firstSelectYear, month, year);
                    }
                }
            }
        }
    }

    const handleClick = () => {
        if (!isDisabled) {
            if (pickMethod === "range") {
                if (selectedDays.length === 2) {
                    setSelectedDays([date]);
                } else {
                    setSelectedDays([...selectedDays, date]);
                }
            } else if (pickMethod === "date") {
                setSelectedDays([date]);
            }
            isSelected = !isSelected;
            nonCurrentDateClick();
            if (pickMethod === "range") {
                rangeSelectionHandling(); 
            }
        }
    };

    let className = "day-element";
    let style = genericStyle;
    if (!isOfCurrentViewedMonth) {
        className += " non-current";
    }
    if (isDisabled) {
        className += " disabled";
    }
    if (isToday) {
        className += " today";
    }
    if (isSelected) {
        style = {...genericStyle, "background": selectedColor, "borderColor": selectedColor};
        className += " selected-day";
    }
        

    return (
        <div
            className={className}
            style={style}
            onClick={handleClick}
        >
            <HoverableDayElementContainer
                date={date}
                dayOfWeek={dayOfWeek}
            />
        </div>
    )
}

// function areEqual(prevProps, nextProps) {

//     return prevProps.selectedDays === nextProps.selectedDays &&
//         prevProps.nearViewedMonths === nextProps.nearViewedMonths &&
//         prevProps.selectedColor === nextProps.selectedColor;;
//   }

export default React.memo(SelectableDayElement);
