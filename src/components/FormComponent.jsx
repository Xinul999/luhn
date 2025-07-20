import React from "react";
import LabInputComponent from "./LabInput.jsx"
import './form.css'
class FormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            checkDigit: '',
            fullCode: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit?.(this.state.code);
        this.setState({ fullCode: this.state.code + this.state.checkDigit });

    }

    handleChangeCode = (event) => {
        const number = this.isNumber(event.target.value)
        if ( number ){
            const checkCode = this.computeCheckDigit(event.target.value);
            this.setState({
                code: event.target.value,
                checkDigit: checkCode
            });

        }
        if(event.target.value.trim() === '') {
            this.setState({
                code: event.target.value,
                checkDigit: '',
                fullCode: ''
            });

        }

    }

    isNumber = (value) => {
        return /^\d+$/.test(value);
    }

    computeCheckDigit = (code) => {
        let sum = 0;

        for(let i = code.length - 1; i >= 0; i--) {
            let n = parseInt(code[i]);
            const isPair = code.length - i - 1;
            if(isPair % 2 === 0) {
               n *= 2;
            }
            if(n > 9) {
                n = n  - 9;
            }
            sum += n;
        }
        return (10 - (sum % 10)) % 10;
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <LabInputComponent
                        id={"code"}
                        label={"Code: "}
                        inputType={"text"}
                        inputValue={this.state.code}
                        placeholder={"Enter just a number"}
                        readOnly={false}
                        disabled={false}
                        onChange={this.handleChangeCode}
                    />
                </div>
                <div>
                    <LabInputComponent
                        id={"digit"}
                        label={"Check digit: "}
                        inputType={"text"}
                        inputValue={this.state.checkDigit}
                        placeholder={""}
                        readOnly={true}
                        disabled={true}
                    />
                </div>
                <div>
                    <LabInputComponent
                        id={"full"}
                        label={"Full Code: "}
                        inputType={"text"}
                        inputValue={this.state.fullCode}
                        placeholder={""}
                        readOnly={true}
                        disabled={true}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default FormComponent;