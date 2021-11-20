import BlockId from "../BlockId"
import { BlockModelProp, Variants } from "./Variants";
import VariantsDoor from "./VariantsDoor";



export function getVariantsInstance(id : BlockId, models : {[key:string] : BlockModelProp}) : Variants{
    switch(id){

        case BlockId.acacia_door:
        case BlockId.crimson_door:
        case BlockId.birch_door:
        case BlockId.dark_oak_door:
        case BlockId.iron_door:
        case BlockId.oak_door:
        case BlockId.jungle_door:
        case BlockId.spruce_door:
        case BlockId.warped_door:
            return new VariantsDoor(id,models);

        case BlockId.acacia_fence_gate:
        case BlockId.birch_fence_gate:        
        case BlockId.crimson_fence_gate:        
        case BlockId.dark_oak_fence_gate:
        case BlockId.oak_fence_gate:
        case BlockId.jungle_fence_gate:
        case BlockId.spruce_fence_gate:
        case BlockId.warped_fence_gate:


        case BlockId.acacia_log:        
        case BlockId.dark_oak_log:
        case BlockId.birch_log:
        case BlockId.jungle_log:
        case BlockId.spruce_log:
        case BlockId.stripped_acacia_log:
        case BlockId.stripped_birch_log:
        case BlockId.stripped_dark_oak_log:
        case BlockId.stripped_jungle_log:
        case BlockId.stripped_oak_log:
        case BlockId.stripped_spruce_log:
        case BlockId.oak_log:


        case BlockId.birch_pressure_plate:
        case BlockId.crimson_pressure_plate:
        case BlockId.dark_oak_pressure_plate:
        case BlockId.light_weighted_pressure_plate:
        case BlockId.oak_pressure_plate:
        case BlockId.heavy_weighted_pressure_plate:
        case BlockId.jungle_pressure_plate:
        case BlockId.polished_blackstone_pressure_plate:
        case BlockId.spruce_pressure_plate:
        case BlockId.stone_pressure_plate:
        case BlockId.warped_pressure_plate:
        case BlockId.acacia_pressure_plate:

        case BlockId.black_glazed_terracotta:
        case BlockId.cyan_glazed_terracotta:        
        case BlockId.blue_glazed_terracotta:
        case BlockId.green_glazed_terracotta:
        case BlockId.light_blue_glazed_terracotta:
        case BlockId.lime_glazed_terracotta:
        case BlockId.gray_glazed_terracotta:
        case BlockId.light_gray_glazed_terracotta:
        case BlockId.orange_glazed_terracotta:
        case BlockId.magenta_glazed_terracotta:
        case BlockId.purple_glazed_terracotta:
        case BlockId.pink_glazed_terracotta:
        case BlockId.red_glazed_terracotta:
        case BlockId.yellow_glazed_terracotta:
        case BlockId.white_glazed_terracotta:
        case BlockId.brown_glazed_terracotta:

        case BlockId.brick_slab:
        case BlockId.blackstone_slab:
        case BlockId.dark_prismarine_slab:
        case BlockId.acacia_slab:
        case BlockId.andesite_slab:
        case BlockId.cobblestone_slab:
        case BlockId.crimson_slab:
        case BlockId.cut_red_sandstone_slab:
        case BlockId.dark_oak_slab:
        case BlockId.cut_sandstone_slab:
        case BlockId.diorite_slab:
        case BlockId.birch_slab:        
        case BlockId.granite_slab:
        case BlockId.mossy_stone_brick_slab:
        case BlockId.nether_brick_slab:
        case BlockId.oak_slab:
        case BlockId.end_stone_brick_slab:
        case BlockId.jungle_slab:
        case BlockId.mossy_cobblestone_slab:
        case BlockId.polished_blackstone_slab:
        case BlockId.polished_diorite_slab:
        case BlockId.red_sandstone_slab:
        case BlockId.polished_granite_slab:
        case BlockId.purpur_slab:
        case BlockId.polished_granite_slab:
        case BlockId.petrified_oak_slab:        
        case BlockId.smooth_red_sandstone_slab:
        case BlockId.spruce_slab:
        case BlockId.smooth_quartz_slab:        
        case BlockId.polished_andesite_slab:
        case BlockId.prismarine_brick_slab:
        case BlockId.quartz_slab:
        case BlockId.smooth_stone_slab:
        case BlockId.smooth_sandstone_slab:
        case BlockId.sandstone_slab:
        case BlockId.prismarine_slab:        
        case BlockId.polished_blackstone_brick_slab:
        case BlockId.red_nether_brick_slab:
        case BlockId.warped_slab:
        case BlockId.stone_brick_slab:
        case BlockId.stone_slab:

        case BlockId.brick_stairs:
        case BlockId.dark_prismarine_stairs:
        case BlockId.acacia_stairs:
        case BlockId.blackstone_stairs:
        case BlockId.andesite_stairs:
        case BlockId.birch_stairs:
        case BlockId.cobblestone_stairs:
        case BlockId.crimson_stairs:
        case BlockId.dark_oak_stairs:
        case BlockId.diorite_stairs:
        case BlockId.mossy_cobblestone_stairs:
        case BlockId.mossy_stone_brick_stairs:
        case BlockId.nether_brick_stairs:
        case BlockId.oak_stairs:
        case BlockId.end_stone_brick_stairs:
        case BlockId.jungle_stairs:
        case BlockId.granite_stairs:        
        case BlockId.polished_blackstone_stairs:
        case BlockId.red_nether_brick_stairs:
        case BlockId.polished_blackstone_brick_stairs:
        case BlockId.red_sandstone_stairs:        
        case BlockId.smooth_quartz_stairs:
        case BlockId.smooth_red_sandstone_stairs:        
        case BlockId.purpur_stairs:        
        case BlockId.polished_granite_stairs:
        case BlockId.polished_diorite_stairs:
        case BlockId.prismarine_brick_stairs:
        case BlockId.polished_andesite_stairs:
        case BlockId.prismarine_stairs:
        case BlockId.quartz_stairs:
        case BlockId.smooth_sandstone_stairs:
        case BlockId.stone_brick_stairs:
        case BlockId.sandstone_stairs:
        case BlockId.stone_stairs:
        case BlockId.warped_stairs:
        case BlockId.spruce_stairs:

        case BlockId.birch_button:
        case BlockId.dark_oak_button:
        case BlockId.crimson_button:
        case BlockId.jungle_button:        
        case BlockId.spruce_button:
        case BlockId.oak_button:
        case BlockId.polished_blackstone_button:        
        case BlockId.stone_button:
        case BlockId.warped_button:        

        case BlockId.birch_trapdoor:
        case BlockId.acacia_trapdoor:        
        case BlockId.crimson_trapdoor:
        case BlockId.iron_trapdoor:
        case BlockId.oak_trapdoor:
        case BlockId.jungle_trapdoor:
        case BlockId.spruce_trapdoor:
        case BlockId.warped_trapdoor:
        case BlockId.dark_oak_trapdoor:


        case BlockId.acacia_wood:        
        case BlockId.dark_oak_wood:
        case BlockId.birch_wood:        
        case BlockId.jungle_wood:
        case BlockId.oak_wood:        
        case BlockId.stripped_dark_oak_wood:        
        case BlockId.stripped_jungle_wood:
        case BlockId.stripped_oak_wood:
        case BlockId.spruce_wood:
        case BlockId.stripped_spruce_wood:
        case BlockId.stripped_acacia_wood:
        case BlockId.stripped_birch_wood:

        case BlockId.dead_brain_coral_wall_fan:
        case BlockId.brain_coral_wall_fan:        
        case BlockId.dead_bubble_coral_wall_fan:
        case BlockId.bubble_coral_wall_fan:
        case BlockId.dead_fire_coral_wall_fan:
        case BlockId.dead_horn_coral_wall_fan:
        case BlockId.fire_coral_wall_fan:
        case BlockId.horn_coral_wall_fan:
        case BlockId.tube_coral_wall_fan:
        case BlockId.dead_tube_coral_wall_fan:

        case BlockId.redstone_wall_torch:
        case BlockId.soul_wall_torch:
        case BlockId.wall_torch:
      
        case BlockId.redstone_torch:
      
        case BlockId.basalt:
        case BlockId.bee_nest:
        case BlockId.beehive:
        case BlockId.beetroots:
        case BlockId.bell:

        case BlockId.carved_pumpkin:
        case BlockId.cauldron:
        case BlockId.chain:
        case BlockId.chain_command_block:
        case BlockId.chipped_anvil:



        case BlockId.daylight_detector:

        case BlockId.activator_rail:
        case BlockId.detector_rail:
        case BlockId.powered_rail:
        case BlockId.rail:
        

        case BlockId.grass_block:
        case BlockId.tall_grass:
        case BlockId.tall_seagrass:
        
        case BlockId.blast_furnace:

        case BlockId.chorus_flower:

        case BlockId.crimson_hyphae:
        case BlockId.damaged_anvil:
        


        case BlockId.anvil:
        case BlockId.attached_melon_stem:
        case BlockId.attached_pumpkin_stem:


        case BlockId.bone_block:
        case BlockId.cake:
        case BlockId.cocoa:
        case BlockId.command_block:
        case BlockId.crimson_stem:

        case BlockId.barrel:
        case BlockId.campfire:
        case BlockId.carrots:
        case BlockId.comparator:
        case BlockId.dispenser:
        case BlockId.frosted_ice:
        case BlockId.furnace:
        
        case BlockId.item_frame:
        case BlockId.jack_o_lantern:
        case BlockId.lantern:
        case BlockId.large_fern:
        case BlockId.lectern:
        case BlockId.lever:
        case BlockId.lilac:
        case BlockId.melon_stem:

        

        case BlockId.dropper:
        case BlockId.end_portal_frame:

        case BlockId.grindstone:
        case BlockId.hay_block:
        case BlockId.jigsaw:
        
        case BlockId.mycelium:

        case BlockId.observer:
        case BlockId.end_rod:
        case BlockId.farmland:
        case BlockId.hopper:
        case BlockId.loom:
        case BlockId.nether_portal:
        case BlockId.nether_wart:
        case BlockId.ladder:
        case BlockId.peony:



        case BlockId.sea_pickle:
    
        case BlockId.stripped_crimson_hyphae:
        case BlockId.stripped_crimson_stem:

        case BlockId.potatoes:
        case BlockId.purpur_pillar:

        case BlockId.quartz_pillar:
        case BlockId.redstone_lamp:
        case BlockId.smoker:



        case BlockId.stripped_warped_hyphae:
        case BlockId.stripped_warped_stem:
        case BlockId.piston:
        case BlockId.piston_head:
        case BlockId.podzol:

        case BlockId.repeater:
        case BlockId.repeating_command_block:
        case BlockId.respawn_anchor:
        case BlockId.rose_bush:
        case BlockId.snow:
        case BlockId.soul_campfire:
        case BlockId.soul_lantern:
        case BlockId.sticky_piston:
        case BlockId.structure_block:
        case BlockId.sunflower:
        case BlockId.sweet_berry_bush:

        case BlockId.polished_basalt:
        case BlockId.pumpkin_stem:
        case BlockId.scaffolding:

        case BlockId.stonecutter:
        case BlockId.tripwire:
        case BlockId.tripwire_hook:
        case BlockId.turtle_egg:
        case BlockId.wheat:
        case BlockId.vine:

        
        
        case BlockId.warped_hyphae:
        case BlockId.warped_stem:
            
            return new Variants(id, models);
        default : 
            return new Variants(id, models);
    }
}

