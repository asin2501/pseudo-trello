class LocalStore {
    constructor(storeKey) {
        this.storeKey = storeKey;

        window.removeStore = () => {
            localStorage.removeItem(this.storeKey)
        };

    }

    set(value) {
        // console.log(this.storeKey, value);
        localStorage.setItem(this.storeKey, JSON.stringify(value));

        // console.log(this.get());
    }

    get() {
        let value = JSON.parse(localStorage.getItem(this.storeKey));
        return value ? value : undefined;
    }

    subscribe(store) {
        store.subscribe(() => {
            this.set(store.getState());
        });
    }
}

export default LocalStore;
