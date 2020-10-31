import React from "react";
import "./Modal.css";

export interface IModalProps {
	isOpen: boolean;
}

export default class Modal extends React.Component<IModalProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <dialog className="dialog" open={this.props.isOpen}>
                {this.props.children}
            </dialog>
        );
    }
}
