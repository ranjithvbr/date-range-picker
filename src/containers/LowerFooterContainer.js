import { setSelectedColor, setShowColorPicker, setShowCalendar, setSelectedDays } from '../actions';
import { LowerFooter } from '../components/LowerFooter';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    const leftId = state.language === "Hebrew" ? ownProps.id + 1 : ownProps.id - 1;
    const rightId = state.language === "Hebrew" ? ownProps.id - 1 : ownProps.id + 1;
    return ({
    id: ownProps.id,
    selectedColor: state.selectedColor,
    showColorPicker: state.showColorPicker[ownProps.id],
    mode: state.mode[ownProps.id],
    selectedDays: state.selectedDays,
    viewedMonth: state.viewedMonth[ownProps.id],
    viewedYear: state.viewedYear[ownProps.id],
    nearViewedMonths: {
        "right": {
            "year": state.viewedYear[rightId], 
            "month": state.viewedMonth[rightId],
        },
        "left": {
            "year": state.viewedYear[leftId],
            "month": state.viewedMonth[leftId],
        },
    }
})};

const mapDispatchToProps = (dispatch, ownProps) => ({
    setSelectedDays: (selectedDays) => dispatch(setSelectedDays(selectedDays)),
    setSelectedColor: (selectedColor) => dispatch(setSelectedColor(selectedColor)),
    setShowColorPicker: (showColorPicker) => dispatch(setShowColorPicker(ownProps.id, showColorPicker)),
    setShowCalendar: (showCalendar) => dispatch(setShowCalendar(showCalendar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LowerFooter);