import React from "react";
import "./Button.css";

interface IButtonProps {
	text: string;
	type: string;
	onClick: () => void;
	size: string;
}

export default class Button extends React.Component<IButtonProps, any> {

    constructor(props: IButtonProps) {
        super(props);
    }

    render() {
	    return (
	        <button
                type="button"
                className={"button button_type_" + this.props.type + " button_size_" + this.props.size}
                onClick={this.props.onClick}
            >
                {this.props.text}
	        </button>
	    );
    }
}
