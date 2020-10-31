import React from "react";
import "./BankModal.css";
import Modal, {IModalProps} from "../ModalWindow/Modal";
import Bank from "../../entity/Bank";

interface IBankModalProps extends IModalProps {
	bank?: Bank;
	onSubmit?: (bank: Bank) => void;
	onReset?: (bank?: Bank) => void;
}

interface IBankModalState extends Bank {
	submitIsAvailable: boolean;
}

export default class BankModal extends React.Component<IBankModalProps, IBankModalState> {

    constructor(props: IBankModalProps) {
        super(props);
        this.state = {
        	id: props.bank ? props.bank.id : "",
            name: props.bank ? props.bank.name : "",
            correspondentAccount: props.bank ? props.bank.correspondentAccount : "",
            address: props.bank ? props.bank.address : "",
            submitIsAvailable: this.submitIsAvailable(props.bank),
        };
    }

    shouldComponentUpdate(nextProps: Readonly<IBankModalProps>): boolean {
    	if (nextProps.bank !== this.props.bank) {
    		this.tryUpdateBankInfo(nextProps);
        }
    	return true;
    }

    private submitIsAvailable = (bank?: Bank): boolean => {
    	return !!((this.state?.id && this.state?.name) || (bank?.id && bank?.name));
    };

    private tryUpdateBankInfo = (props: IBankModalProps) => {
        this.setState({
            id: props.bank ? props.bank.id : "",
            name: props.bank ? props.bank.name : "",
            correspondentAccount: props.bank ? props.bank.correspondentAccount : "",
            address: props.bank ? props.bank.address : "",
            submitIsAvailable: this.submitIsAvailable(props.bank),
        });
    };

	private onSubmit = () => {
    	let resultBank = this.props.bank;
	    if (this.props.bank) {
	        this.props.bank.name = this.state.name;
	        this.props.bank.correspondentAccount = this.state.correspondentAccount;
	        this.props.bank.address = this.state.address;
	    } else {
        	resultBank = new Bank(this.state.id, this.state.name, this.state.correspondentAccount, this.state.address);
	    }
	    if (this.props.onSubmit && resultBank) {
	        this.props.onSubmit(resultBank);
	    }
	    this.tryUpdateBankInfo(this.props);
	};

	private onReset = () => {
	    if (this.props.onReset) {
	        this.props.onReset(this.props.bank);
	    }
	    this.tryUpdateBankInfo(this.props);
	};

	render() {
	    return (
	        <Modal isOpen={this.props.isOpen}>
	            <form method="dialog">
	                <div className="dialog_field">
	                    <label htmlFor="id">БИК:</label>
	                    <input
	                        className="input"
	                        name="id"
	                        type="text"
	                        disabled={!!this.props.bank}
	                        value={this.state.id}
	                        onChange={(event) => {
	                            const newId = event.target.value;
	                            const submitIsAvailable = !!newId;
	                            this.setState({
	                                id: newId,
	                                submitIsAvailable
	                            });
	                        }}
	                    />
	                </div>
	                <div className="dialog_field">
	                    <label htmlFor="name">Название банка:</label>
	                    <input
	                        className="input"
	                        name="name"
	                        type="text"
	                        value={this.state.name}
	                        onChange={(event) => this.setState({name: event.target.value})}
	                    />
	                </div>
	                <div className="dialog_field">
	                    <label htmlFor="account">Корреспондентский счет:</label>
	                    <input
	                        className="input"
	                        name="account" type="text"
	                        value={this.state.correspondentAccount}
	                        onChange={(event) => this.setState({correspondentAccount: event.target.value})}
	                    />
	                </div>
	                <div className="dialog_field">
	                    <label htmlFor="address">Адрес:</label>
	                    <input
	                        className="input"
	                        name="address" type="text"
	                        value={this.state.address}
	                        onChange={(event) => this.setState({address: event.target.value})}
	                    />
	                </div>
	                <button className="button button_size_m" type="submit" disabled={!this.state.submitIsAvailable} onClick={this.onSubmit}>Ок</button>
	                <button className="button button_size_m" type="reset" onClick={this.onReset}>Отмена</button>
	            </form>
	        </Modal>
	    );
	}
}
