import React from "react";
import Bank from "../../entity/Bank";

interface IBankRowProps {
	isChecked: boolean;
	bank: Bank;
	onDeleteHandler: (item: Bank) => void;
}

export default class BankRow extends React.Component<IBankRowProps, any> {

    constructor(props: IBankRowProps) {
        super(props);
    }

    render() {
	    return (
	        <tr>
	            <td><input type="checkbox" checked={this.props.isChecked}/></td>
	            <td>{this.props.bank.name}</td>
	            <td>{this.props.bank.id}</td>
	            <td>{this.props.bank.correspondentAccount}</td>
	            <td>{this.props.bank.address}</td>
	            <td>
	                <button type="button" onClick={() => this.props.onDeleteHandler(this.props.bank)}><img alt="Удалить"/></button>
	            </td>
	        </tr>
	    );
    }
}
