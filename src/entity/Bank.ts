export default class Bank {
    constructor (
    	private _id: string,
		private _name: string,
		private _correspondentAccount: string,
		private _address: string
    ) {}

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get correspondentAccount(): string {
        return this._correspondentAccount;
    }

    set correspondentAccount(value: string) {
        this._correspondentAccount = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    public static parseFromJson(json: any): Bank {
        console.log(json);
        return new Bank(json._id, json._name, json._correspondentAccount, json._address);
    }
}
