import React from "react";
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

            // TODO inside the button
            //this.setState({ fullCode: event.target.value + this.state.checkDigit });
        }
        if(event.target.value.trim() === '') {
            this.setState({
                code: event.target.value,
                checkDigit: ''
            });

            // TODO inside the button
            //this.setState({ fullCode:  this.state.code.slice(0, -1)});
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
                    <label htmlFor={"code"}>Code:</label>
                    <input type="text" id="code" value={this.state.code} onChange={this.handleChangeCode} placeholder={"Enter just number"}/>
                </div>
                <div>
                    <label htmlFor={"digit"}> Check digit:</label>
                    <input type="text" id="digit" value={this.state.checkDigit} readOnly={true} disabled={true}/>
                </div>
                <div>
                    <label htmlFor={"full"}>Full Code:  </label>
                    <input type="text" id="full" value={this.state.fullCode} readOnly={true} disabled={true}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default FormComponent;