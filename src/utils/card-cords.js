/**
 * Created by User on 25.07.2017.
 */
/**
 * Created by user on 09.07.2017.
 */
class allColumnCords {
    constructor() {
        this.columnCordsList = {};
    }

    set(id, order, y, columnId) {
        let columnCordsItem = this.columnCordsList[columnId];

        if (columnCordsItem === undefined) {
            this.columnCordsList[columnId] = new columnCords(id, order, y);
        } else {
            this.columnCordsList[columnId].set(id, order, y);
        }

        console.log(this.columnCordsList);
    }

    remove(columnId, id) {
        this.columnCordsList[columnId].remove(id);
    }

    resetColumn(columnId) {
        delete this.columnCordsList[columnId];
    }

    getOrder(columnId, y) {
        return this.columnCordsList[columnId].getOrder(y);
    };
}

class columnCords {
    constructor(id, order, y) {
        this.cords = {};
        this.cordsIdMap = [];
        this.set(id, order, y);
    }

    set(id, order, y) {
        let cordItem = this.cords[id];
        if (cordItem === undefined || !(cordItem.order === order && cordItem.y === y)) {
            this.cords[id] = {order: order, y: y};
            this._mappedCords();
        }
    }

    remove(id) {
        delete this.cords[id];
        this._mappedCords();
    }

    getOrder(y) {
        let newOrder = this.cords[this.cordsIdMap[this.cordsIdMap.length - 1]].order; // get max order

        for (let i = 0; i < this.cordsIdMap.length; i++) {
            let columnId = this.cordsIdMap[i];
            if (y < this.cords[columnId].y) {
                newOrder = this.cords[columnId].order - 1;
                break;
            }
        }
        newOrder = (newOrder === -1 ? 0 : newOrder);

        return newOrder;
    }

    _mappedCords() {
        this.cordsIdMap = [];
        for (let key in this.cords) {
            this.cordsIdMap.push(+key);
        }
        this.cordsIdMap.sort(this._comparator.bind(this));
    }

    _comparator(a, b) {
        return this.cords[a].order - this.cords[b].order;
    }
}

const columnCordsObj = new allColumnCords();
export default columnCordsObj;