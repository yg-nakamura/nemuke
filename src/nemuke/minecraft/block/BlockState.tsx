import BlockId from "./BlockId";
import ModelId from "./ModelId";

type BlockModelProp = {
    model : ModelId
    y? : number
}

type BlockState = {
    models : BlockModelProp[]
}
const blockstate : {[key:number]: BlockState} = {};


blockstate[BlockId.acacia_button] = { models : [] } //use variants
blockstate[BlockId.acacia_door] = { models : [
    
] } //use variants


//Cube All
// ./gray_concrete.json

// ./gray_terracotta.json
// ./brown_concrete_powder.json
// ./pink_terracotta.json
// ./dark_oak_planks.json
// ./white_terracotta.json
// ./red_terracotta.json
// ./lapis_block.json
// ./emerald_ore.json
// ./brown_terracotta.json
// ./blue_terracotta.json
// ./redstone_lamp_on.json
// ./spawner.json
// ./redstone_lamp.json
// ./light_gray_stained_glass.json
// ./purpur_block.json
// ./structure_block.json
// ./sand.json
// ./smooth_sandstone.json
// ./polished_blackstone.json
// ./fire_coral_block.json
// ./green_terracotta.json
// ./cracked_nether_bricks.json
// ./horn_coral_block.json
// ./yellow_concrete_powder.json
// ./coarse_dirt.json
// ./chiseled_stone_bricks.json
// ./andesite.json
// ./end_stone.json
// ./brown_stained_glass.json
// ./cyan_concrete_powder.json
// ./redstone_block.json
// ./bubble_coral_block.json
// ./lime_wool.json
// ./orange_wool.json
// ./magenta_concrete.json
// ./smooth_red_sandstone.json
// ./structure_block_data.json
// ./shroomlight.json
// ./pink_stained_glass.json
// ./crying_obsidian.json
// ./birch_planks.json
// ./gravel.json
// ./chiseled_polished_blackstone.json
// ./nether_bricks.json
// ./diorite.json
// ./soul_sand.json
// ./red_wool.json
// ./clay.json
// ./stone.json
// ./jungle_planks.json
// ./purple_concrete_powder.json
// ./orange_terracotta.json
// ./spruce_planks.json
// ./cyan_stained_glass.json
// ./yellow_terracotta.json
// ./warped_wart_block.json
// ./honeycomb_block.json
// ./chiseled_nether_bricks.json
// ./mossy_stone_bricks.json
// ./frosted_ice_2.json
// ./lapis_ore.json
// ./gold_ore.json
// ./red_stained_glass.json
// ./light_gray_wool.json
// ./gray_stained_glass.json
// ./blue_concrete.json
// ./gilded_blackstone.json
// ./blue_ice.json
// ./diamond_block.json
// ./nether_wart_block.json
// ./glass.json
// ./cyan_wool.json
// ./sea_lantern.json
// ./dead_tube_coral_block.json
// ./red_sand.json
// ./structure_block_load.json
// ./orange_stained_glass.json
// ./lime_concrete.json
// ./note_block.json
// ./polished_andesite.json
// ./coal_ore.json
// ./cobblestone.json
// ./nether_gold_ore.json
// ./end_stone_bricks.json
// ./blue_wool.json
// ./frosted_ice_3.json
// ./magenta_stained_glass.json
// ./light_blue_terracotta.json
// ./polished_granite.json
// ./cyan_concrete.json
// ./dark_prismarine.json
// ./light_gray_terracotta.json
// ./obsidian.json
// ./green_stained_glass.json
// ./gold_block.json
// ./magenta_terracotta.json
// ./red_nether_bricks.json
// ./frosted_ice_0.json
// ./brown_mushroom_block_inventory.json
// ./iron_ore.json
// ./purple_stained_glass.json
// ./magma_block.json
// ./acacia_planks.json
// ./redstone_ore.json
// ./wet_sponge.json
// ./diamond_ore.json
// ./green_concrete.json
// ./quartz_bricks.json
// ./yellow_wool.json
// ./light_blue_concrete_powder.json
// ./mossy_cobblestone.json
// ./prismarine_bricks.json
// ./ice.json
// ./green_wool.json
// ./warped_planks.json
// ./pink_concrete_powder.json
// ./purple_wool.json
// ./polished_diorite.json
// ./pink_concrete.json
// ./black_concrete.json
// ./orange_concrete_powder.json
// ./polished_blackstone_bricks.json
// ./brown_wool.json
// ./prismarine.json
// ./purple_terracotta.json
// ./cracked_polished_blackstone_bricks.json
// ./gray_concrete_powder.json
// ./yellow_concrete.json
// ./light_blue_concrete.json
// ./brown_concrete.json
// ./dead_horn_coral_block.json
// ./dead_fire_coral_block.json
// ./mushroom_stem_inventory.json
// ./lime_concrete_powder.json
// ./red_mushroom_block_inventory.json
// ./light_blue_stained_glass.json
// ./brain_coral_block.json
// ./red_concrete_powder.json
// ./dead_brain_coral_block.json
// ./frosted_ice_1.json
// ./bricks.json
// ./dirt.json
// ./smooth_stone.json
// ./structure_block_corner.json
// ./emerald_block.json
// ./snow_block.json
// ./coal_block.json
// ./yellow_stained_glass.json
// ./lime_stained_glass.json
// ./pink_wool.json
// ./smooth_quartz.json
// ./tube_coral_block.json
// ./granite.json
// ./blue_concrete_powder.json
// ./structure_block_save.json
// ./green_concrete_powder.json
// ./nether_quartz_ore.json
// ./white_wool.json
// ./purple_concrete.json
// ./cyan_terracotta.json
// ./magenta_wool.json
// ./lime_terracotta.json
// ./light_blue_wool.json
// ./white_stained_glass.json
// ./oak_planks.json
// ./cracked_stone_bricks.json
// ./stone_bricks.json
// ./bedrock.json
// ./red_concrete.json
// ./glowstone.json
// ./netherite_block.json
// ./orange_concrete.json
// ./white_concrete_powder.json
// ./light_gray_concrete_powder.json
// ./iron_block.json
// ./sponge.json
// ./magenta_concrete_powder.json
// ./soul_soil.json
// ./dead_bubble_coral_block.json
// ./netherrack.json
// ./light_gray_concrete.json
// ./packed_ice.json
// ./terracotta.json
// ./blue_stained_glass.json
// ./white_concrete.json
// ./gray_wool.json
// ./black_concrete_powder.json
// ./crimson_planks.json
// ./black_terracotta.json
// ./black_stained_glass.json
// ./black_wool.json

blockstate[BlockId.stone] = {
    models : [
        {model : ModelId.stone}
    ]
}

export default blockstate;