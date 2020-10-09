import React, { useState } from 'react';
import '../../styles/CalendarHeaderStyles/choosen-dates.css';
import { removeItemFromArray } from '../../utils/utils';

const xIcon = require('../../images/x-icon.png');

export default function ChoosenDatesItem(props) {
    const { 
        choosenDates,
        count,
        isDatesDisplayHovered,
        choosenDatesList,
        selectedColor,
        storedDates,
        setStoredDates,
        setChoosenDatesList,
        setSelectedDays,
    } = props;

    let initialState = isDatesDisplayHovered && count === 0;
    const [isCurrentlyHovered, setIsCurrentlyHovered] = useState(initialState);
    const [isWrapCurrentlyHovered, setIsWrapCurrentlyHovered] = useState(initialState);


    const handleEnter = () => {
        setIsCurrentlyHovered(true);
    };

    const handleLeave = () => {
        setIsCurrentlyHovered(false);
    };

    const handleWrapEnter = () => {
        setIsWrapCurrentlyHovered(true);
    };

    const handleWrapLeave = () => {
        setIsWrapCurrentlyHovered(false);
    };

    const handleXClick = () => {
        let clearedChoosenDatesList = removeItemFromArray(choosenDatesList, choosenDates);
        setChoosenDatesList(clearedChoosenDatesList);
        let clearedStoredDates = removeItemFromArray(storedDates, storedDates[count]);
        setStoredDates(clearedStoredDates);
        if (storedDates.length === 1) {
            setSelectedDays([]);
        } else {
            setSelectedDays(storedDates[0]);
        }
    }

    const handleDatesClick = () => {
        let selectedDays = storedDates[count];
        console.log(choosenDates);
        let clearedChoosenDatesList = removeItemFromArray(choosenDatesList, choosenDates);
        let clearedStoredDates = removeItemFromArray(storedDates, selectedDays);
        setStoredDates([selectedDays, ...clearedStoredDates]);
        setChoosenDatesList([choosenDates, ...clearedChoosenDatesList]);
        // setSelectedDays(selectedDays);
    }

    return <div 
        className="choosen-dates-item"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
    >
        <div 
            className="choosen-dates-wrap" 
            onClick={handleDatesClick}
            onMouseEnter={handleWrapEnter}
            onMouseLeave={handleWrapLeave}
            style={isWrapCurrentlyHovered ? {"backgroundColor": selectedColor + '50'}: {}}
        >
            <div
                className="choosen-dates-count"
            >
                {count + 1}
            </div>
            <div
                key={choosenDates + count}
                className="choosen-dates"
            >
                {choosenDates}
            </div>
        </div>
        { isCurrentlyHovered &&
            <img 
                alt="" 
                src={xIcon} 
                className="x-icon"
                onClick={handleXClick}
            />
        }
    </div>;
}