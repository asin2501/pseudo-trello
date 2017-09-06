/**
 * Created by User on 01.08.2017.
 */
export default insideClassName;

function insideClassName(el, className) {

    let parent = el.parentNode;



    while(true){
        if(parent){

            if(parent.className && parent.className.indexOf(className) !== -1){
                return true;
            }
            parent = parent.parentNode;
            // debugger;
        }else{
            return false;
        }

    }
}
