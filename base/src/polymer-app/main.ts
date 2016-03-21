/**
 * Created by Alex on 21/03/2016.
 */
import {autoinject} from "aurelia-dependency-injection";

@autoinject
export class Main{
    attached(){
        alert('main');
    }
}