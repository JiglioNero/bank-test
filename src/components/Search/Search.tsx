import React from "react";
import "./Search.css";

interface ISearchProps {
	onFilterChangeCallback: (filterValue: string) => void;
}

export default class Search extends React.Component<ISearchProps, any> {

    constructor(props: ISearchProps) {
        super(props);
    }

    onFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filterValue = event.target.value.toLowerCase();
        this.props.onFilterChangeCallback(filterValue);
    };

    render() {
	    return (
            <div>
                <input
                    className='input'
                    type="text"
                    placeholder="Поиск..."
                    onChange={this.onFilterValueChange}
                />
            </div>
	    );
    }
}
