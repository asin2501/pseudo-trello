/**
 * Created by user on 08.07.2017.
 */
export default {
    copyObject(obj){
        //deep copy
        return JSON.parse(JSON.stringify(obj));
    }
}