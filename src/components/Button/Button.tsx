import React from "react";

interface IButtonProps {
	text: string;
	type: string;
	onClick: () => void;
}

export default class Button extends React.Component<IButtonProps, any> {

    constructor(props: IButtonProps) {
        super(props);
    }

    render() {
	    return (
	        <button
                type="button"
                className={"button button_type " + this.props.type}
                onClick={this.props.onClick}
            >
                {this.props.text}
	        </button>
	    );
    }
}
