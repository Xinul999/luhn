import React from "react";

class LabInputComponent extends React.Component {

    handleChange = (event) => {
        if(this.props.onChange) {
            this.props.onChange(event);
        }
    }

    render() {
        const {id, label, inputType, inputValue, placeholder, readOnly, disabled} = this.props;
        return (
            <>
                <label htmlFor={id}>{label}</label>
                <input id={id}
                    type={inputType}
                    value={inputValue}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                />
            </>
        );
    }
}

export default LabInputComponent;