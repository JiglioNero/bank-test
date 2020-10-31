import React from "react";
import "./App.css";
import BanksTable from "./components/BanksTable/BanksTable";
import Bank from "./entity/Bank";
import Search from "./components/Search/Search";
import Button from "./components/Button/Button";
import BankModal from "./components/BankModal/BankModal";

interface IAppState {
    banks: Bank[];
    modalIsOpen: boolean;
    filter?: (item: Bank) => boolean;
}

class App extends React.Component<any, IAppState>{
    private banksTable = React.createRef<BanksTable>();

    constructor(props: any) {
        super(props);
        const banksRaw = localStorage.getItem("banks");
        let banks: Bank[] = [];
        if (banksRaw) {
            banks = JSON.parse(banksRaw).map((item: any) => Bank.parseFromJson(item));
        } else {
            localStorage.setItem("banks", "[]");
        }
        this.state = {
            banks,
            modalIsOpen: false,
        };
    }

    private onFilterChangeCallback = (filter: string) => {
        if (filter) {
            const filterFunction = (item: Bank) => item.id.indexOf(filter) !== -1 || item.name.indexOf(filter) !== -1;
            this.setState({filter: filterFunction});
        } else {
            this.setState({filter: undefined});
        }
    };

    private onAddBankClick = () => {
        this.setState({modalIsOpen: true});
    };

    private onCancelAddingBank = (bank?: Bank) => {
        this.setState({modalIsOpen: false});
    };

    private onAddBank = (bank: Bank) => {
        if (!this.state.banks.find((item) => item.id === bank.id)) {
            this.state.banks.push(bank);
            console.log(JSON.stringify(this.state.banks));
            localStorage.setItem("banks", JSON.stringify(this.state.banks));
            this.setState({
                modalIsOpen: false,
            });
        }
        else {
            alert("Банк с данным идентификационным номером уже существует.");
        }
    };

    private onEditBank = (bank: Bank) => {
        localStorage.setItem("banks", JSON.stringify(this.state.banks));
    };

    private onDeleteBank = () => {
        const selectedIds = this.banksTable.current?.getSelectedBanksIds();
        if (selectedIds) {
            const newBanks = this.state.banks.filter((item: Bank) => selectedIds.indexOf(item.id) === -1);
            localStorage.setItem("banks", JSON.stringify(newBanks));
            this.setState({banks: newBanks});
            this.banksTable.current?.clearSelectedBanksIds();
        }
    };

    render() {
        return (
            <div className="">
                <header className="header_container">
                    <h1>Справочник банков</h1>
                    <div className="navigation_container">
                        <div className="navigation_item">
                            <Search onFilterChangeCallback={this.onFilterChangeCallback}/>
                        </div>
                        <div className="navigation_item">
                            <Button text={"Добавить"} type={"add"} size={"m"} onClick={this.onAddBankClick}/>
                            <Button text={"Удалить"} type={"remove"}  size={"m"} onClick={this.onDeleteBank}/>
                        </div>
                    </div>
                </header>
                <BanksTable
                    ref={this.banksTable}
                    banks={this.state.banks}
                    filter={this.state.filter}
                    onBankEdit={this.onEditBank}
                />
                <BankModal isOpen={this.state.modalIsOpen} onSubmit={this.onAddBank} onReset={this.onCancelAddingBank}/>
            </div>
        );
    }
}

export default App;
