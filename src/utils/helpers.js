/**
 * Created by user on 08.07.2017.
 */

class Helper{
    copyObject(obj){
        //deep copy
        return JSON.parse(JSON.stringify(obj));
    }
    removeElementFromArray(array, element){
        let index = array.indexOf(5);

        if (index > -1) {
            array.splice(index, 1);
        }
    }
}

let helper = new Helper;

export default helper;

