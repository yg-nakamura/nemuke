import BlockId from "../../BlockId";
import { BlockModel } from "../../BlockModel";
import blockstate from "../../BlockState";
import ModelId from "../../ModelId";
import { BlackConcrete, BlueConcrete, BrownConcrete, CyanConcrete, GrayConcrete, GreenConcrete, LightBlueConcrete, LightGrayConcrete, LimeConcrete, MagentaConcrete, OrangeConcrete, PinkConcrete, PurpleConcrete, RedConcrete, WhiteConcrete, YellowConcrete } from "../parts/Concretes";
import { BlackWool, BlueWool, BrownWool, CyanWool, GrayWool, GreenWool, LightBlueWool, LightGrayWool, LimeWool, MagentaWool, OrangeWool, PinkWool, PurpleWool, RedWool, WhiteWool, YellowWool } from "../parts/Wools";


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

    registerSingleState(models, BlockId.white_wool, ModelId.white_wool, new WhiteWool());
    registerSingleState(models, BlockId.orange_wool, ModelId.orange_wool, new OrangeWool());
    registerSingleState(models, BlockId.magenta_wool, ModelId.magenta_wool, new MagentaWool());
    registerSingleState(models, BlockId.light_blue_wool, ModelId.light_blue_wool, new LightBlueWool());
    registerSingleState(models, BlockId.yellow_wool, ModelId.yellow_wool, new YellowWool());
    registerSingleState(models, BlockId.lime_wool, ModelId.lime_wool, new LimeWool());
    registerSingleState(models, BlockId.pink_wool, ModelId.pink_wool, new PinkWool());
    registerSingleState(models, BlockId.gray_wool, ModelId.gray_wool, new GrayWool());
    registerSingleState(models, BlockId.light_gray_wool, ModelId.light_gray_wool, new LightGrayWool());
    registerSingleState(models, BlockId.cyan_wool, ModelId.cyan_wool, new CyanWool());
    registerSingleState(models, BlockId.purple_wool, ModelId.purple_wool, new PurpleWool());
    registerSingleState(models, BlockId.blue_wool, ModelId.blue_wool, new BlueWool());
    registerSingleState(models, BlockId.brown_wool, ModelId.brown_wool, new BrownWool());
    registerSingleState(models, BlockId.green_wool, ModelId.green_wool, new GreenWool());
    registerSingleState(models, BlockId.red_wool, ModelId.red_wool, new RedWool());
    registerSingleState(models, BlockId.black_wool, ModelId.black_concrete, new BlackWool());    

}

export {registerCubeAllBlocks};