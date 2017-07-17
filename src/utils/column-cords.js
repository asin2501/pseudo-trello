/**
 * Created by user on 09.07.2017.
 */

class columnCordsMap {
    constructor() {
        this.cords = {};
        this.cordsIdMap = [];
    }

    set(id, order, x) {
        let columnItem = this.cords[id];
        if (columnItem === undefined || !(columnItem.order === order && columnItem.x === x)) {
            this.cords[id] = {order: order, x: x};
            this._mappedCords();
        }
    }

    remove(id) {
        delete this.cords[id];
        this._mappedCords();
    }

    getOrder(x) {

        let newOrder = this.cords[this.cordsIdMap[this.cordsIdMap.length - 1]].order; // get max order

        for (let i = 0; i < this.cordsIdMap.length; i++) {
            let columnId = this.cordsIdMap[i];
            if (x < this.cords[columnId].x) {
                newOrder = this.cords[columnId].order - 1;
                break;
            }
        }

        return newOrder;
    }

    _mappedCords() {
        this.cordsIdMap = [];
        for (let key in this.cords) {
            this.cordsIdMap.push(key);
        }
        this.cordsIdMap.sort(this._comparator.bind(this));
    }

    _comparator(a, b) {
        return this.cords[a].order - this.cords[b].order;
    }
}

const columnCords = new columnCordsMap();
export default columnCords;