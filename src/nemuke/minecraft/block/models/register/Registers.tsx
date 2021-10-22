import BlockId from "../../BlockId";
import { BlockModel } from "../../BlockModel";
import blockstate from "../../BlockState";
import ModelId from "../../ModelId";
import { BlackConcrete, BlueConcrete, BrownConcrete, CyanConcrete, GrayConcrete, GreenConcrete, LightBlueConcrete, LightGrayConcrete, LimeConcrete, MagentaConcrete, OrangeConcrete, PinkConcrete, PurpleConcrete, RedConcrete, WhiteConcrete, YellowConcrete } from "../parts/Concretes";


function registerSingleState(models : { [key: number] : BlockModel}, bid : BlockId, mid : ModelId , model :BlockModel){
    models[mid] = model;
    blockstate[bid] = {models : [{model : mid}]}
}

const registerCubeAllBlocks = (models : { [key: number] : BlockModel}) => {
    registerSingleState(models, BlockId.white_concrete, ModelId.white_concrete, new WhiteConcrete());
    registerSingleState(models, BlockId.orange_concrete, ModelId.orange_concrete, new OrangeConcrete());
    registerSingleState(models, BlockId.magenta_concrete, ModelId.magenta_concrete, new MagentaConcrete());
    registerSingleState(models, BlockId.light_blue_concrete, ModelId.light_blue_concrete, new LightBlueConcrete());
    registerSingleState(models, BlockId.yellow_concrete, ModelId.yellow_concrete, new YellowConcrete());
    registerSingleState(models, BlockId.lime_concrete, ModelId.lime_concrete, new LimeConcrete());
    registerSingleState(models, BlockId.pink_concrete, ModelId.pink_concrete, new PinkConcrete());
    registerSingleState(models, BlockId.gray_concrete, ModelId.gray_concrete, new GrayConcrete());
    registerSingleState(models, BlockId.light_gray_concrete, ModelId.light_gray_concrete, new LightGrayConcrete());
    registerSingleState(models, BlockId.cyan_concrete, ModelId.cyan_concrete, new CyanConcrete());
    registerSingleState(models, BlockId.purple_concrete, ModelId.purple_concrete, new PurpleConcrete());
    registerSingleState(models, BlockId.blue_concrete, ModelId.blue_concrete, new BlueConcrete());
    registerSingleState(models, BlockId.brown_concrete, ModelId.brown_concrete, new BrownConcrete());
    registerSingleState(models, BlockId.green_concrete, ModelId.green_concrete, new GreenConcrete());
    registerSingleState(models, BlockId.red_concrete, ModelId.red_concrete, new RedConcrete());
    registerSingleState(models, BlockId.black_concrete, ModelId.black_concrete, new BlackConcrete());    

}

export {registerCubeAllBlocks};