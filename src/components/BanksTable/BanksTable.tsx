import React from "react";
import Bank from "../../entity/Bank";
import Button from "../Button/Button";
import BankModal from "../BankModal/BankModal";

interface IBanksTableProps {
	banks: Bank[];
	filter?: (item: Bank) => boolean;
	onBankEdit: (item: Bank) => void;
}

interface IBanksTableState {
	displayedBanks: Bank[];
	selectedBanksIds: string[];
	isEditDialogOpen: boolean;
	bankForEdit?: Bank;
}

export default class BanksTable extends React.Component<IBanksTableProps, IBanksTableState> {

    constructor(props: IBanksTableProps) {
	    super(props);

	    this.state = {
            selectedBanksIds: [],
	        displayedBanks: props.filter ? props.banks.filter(props.filter) : props.banks,
            isEditDialogOpen: false
	    };
    }

    shouldComponentUpdate(nextProps: Readonly<IBanksTableProps>): boolean {
    	if (JSON.stringify(nextProps.banks) !== JSON.stringify(this.props.banks) || nextProps.filter !== this.props.filter) {
    		this.setState({displayedBanks: nextProps.filter ? nextProps.banks.filter(nextProps.filter) : nextProps.banks});
    		return false;
	    }
    	return true;
    }

	public getSelectedBanksIds = (): string[] => {
	    return this.state.selectedBanksIds;
	};

	public clearSelectedBanksIds = () => {
	    this.setState({selectedBanksIds: []});
	};

	private onBankSelect = (item: Bank, event: React.ChangeEvent<HTMLInputElement>) => {
	    console.log(event.target.value);
	    const idIndex = this.state.selectedBanksIds.indexOf(item.id);
	    if (!event.target.checked && idIndex !== -1) {
	        this.state.selectedBanksIds.splice(idIndex, 1);
	        this.setState({selectedBanksIds: this.state.selectedBanksIds});
	    }
	    else if (event.target.checked && idIndex === -1){
	        this.state.selectedBanksIds.push(item.id);
	        this.setState({selectedBanksIds: this.state.selectedBanksIds});
	    }
	};

	private onAllBanksSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
	    if (!event.target.checked) {
	        this.setState({selectedBanksIds: []});
	    }
	    else {
	        this.setState({selectedBanksIds: this.state.displayedBanks.map((item) => item.id)});
	    }
	};

	private onSubmitBankChanges = (bank: Bank) => {
	    this.props.onBankEdit(bank);
	    this.setState({
	        isEditDialogOpen: false,
	        displayedBanks: this.state.displayedBanks,
	    });
	};

	private onCancelBankChanges = (bank?: Bank) => {
	    this.setState({
	        isEditDialogOpen: false
	    });
	};

	private renderBankRow = (item: Bank) => {
	    return (
	        <tr key={item.id}>
	            <td>
	                <input
	                    checked={this.state.selectedBanksIds.indexOf(item.id) !== -1}
	                    type="checkbox"
	                    onChange={(event) => this.onBankSelect(item, event)}
	                />
	            </td>
	            <td>{item.name}</td>
	            <td>{item.id}</td>
	            <td>{item.correspondentAccount}</td>
	            <td>{item.address}</td>
	            <td>
	                <Button type='edit' text='Edit' size='s' onClick={() => {
	                	this.setState({
	                        isEditDialogOpen: true,
	                        bankForEdit: item
	                    });
	                }}/>
	            </td>
	        </tr>
	    );
	};

	render() {
	    return (
	    	<div>
	            <table width="100%" cellSpacing="0" cellPadding="4">
	                <caption>Банки</caption>
	                <tr>
	                    <td>
	                        <input
	                            checked={this.state.selectedBanksIds.length === this.state.displayedBanks.length}
	                            type="checkbox"
	                            onChange={this.onAllBanksSelect}
	                        />
	                    </td>
	                    <th>Имя</th>
	                    <th>БИК</th>
	                    <th>Корреспондентский счет</th>
	                    <th>Адрес</th>
	                    <th />
	                </tr>
	                {this.state.displayedBanks.map((bank) => this.renderBankRow(bank))}
	            </table>
	            <BankModal
	                isOpen={this.state.isEditDialogOpen}
	                bank={this.state.bankForEdit}
	                onSubmit={this.onSubmitBankChanges}
	                onReset={this.onCancelBankChanges}
	            />
	        </div>
	    );
	}
}
