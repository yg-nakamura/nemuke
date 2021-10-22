import Block from "../Block";
import { BlockModel } from "../BlockModel";
import ModelId from "../ModelId";
import { Cube } from "./Cube";

export class CubeAll extends Cube{

    constructor(all:number[]){
        super(all,all,all,all,all,all);
    }
}



