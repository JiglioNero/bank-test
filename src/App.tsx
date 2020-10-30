import React from "react";
import "./App.css";
import BanksTable from "./components/BanksTable/BanksTable";
import Bank from "./entity/Bank";
import Search from "./components/Search/Search";
import Button from "./components/Button/Button";

interface IAppState {
    banks: Bank[];
    filter?: (item: Bank) => boolean;
}

class App extends React.Component<any, IAppState>{
    private banksTable = React.createRef<BanksTable>();

    constructor(props: any) {
        super(props);
        this.state = {
            banks: [
                new Bank("id", "name", "account", "addrsss"),
                new Bank("id1", "name2", "account3", "addrsss")
            ],
        };
    }

    componentDidMount(): void {
        // const banksRaw = localStorage.getItem("banks");
        // if (banksRaw) {
        //     const banks = Array.of(JSON.parse(banksRaw)).map((item) => Bank.parseFromJson(item));
        //     this.setState({banks});
        // }
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
            <div>
                <header>
                    <h1>Банки</h1>
                </header>
                <div>
                    <div>
                        <Search onFilterChangeCallback={this.onFilterChangeCallback}/>
                    </div>
                    <div>
                        <Button text={"Добавить"} type={"add"} onClick={this.onAddBankClick}/>
                        <Button text={"Удалить"} type={"remove"} onClick={this.onDeleteBank}/>
                    </div>
                    <div>
                        <BanksTable ref={this.banksTable} banks={this.state.banks} filter={this.state.filter} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
