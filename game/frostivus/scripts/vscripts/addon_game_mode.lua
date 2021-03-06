-- This is the entry-point to your game mode and should be used primarily to precache models/particles/sounds/etc

require('internal/util')
require('internal/util_unit')
require('internal/util_tables')
require('internal/util_string')
require('gamemode')

function Precache( context )
--[[
  This function is used to precache resources/units/items/abilities that will be needed
  for sure in your game and that will not be precached by hero selection.  When a hero
  is selected from the hero selection screen, the game will precache that hero's assets,
  any equipped cosmetics, and perform the data-driven precaching defined in that hero's
  precache{} block, as well as the precache{} block for any equipped abilities.

  See GameMode:PostLoadPrecache() in gamemode.lua for more information
  ]]

  DebugPrint("[BAREBONES] Performing pre-load precache")

  -- Particles can be precached individually or by folder
  -- It it likely that precaching a single particle system will precache all of its children, but this may not be guaranteed
  -- PrecacheResource("particle", "particles/econ/generic/generic_aoe_explosion_sphere_1/generic_aoe_explosion_sphere_1.vpcf", context)
  -- PrecacheResource("particle_folder", "particles/test_particle", context)
  PrecacheResource("particle", "particles/econ/items/juggernaut/bladekeeper_healing_ward/juggernaut_healing_ward_ring_dc.vpcf", context)
  PrecacheResource("particle", "particles/frostivus/generic_gameplay/current_target_mark.vpcf", context)
  PrecacheResource("particle", "particles/generic/current_greevil_indicator.vpcf", context)
  PrecacheResource("particle", "particles/units/heroes/hero_lich/lich_chain_frost.vpcf", context)

  -- Models can also be precached by folder or individually
  -- PrecacheModel should generally used over PrecacheResource for individual models
  PrecacheResource("model_folder", "models/courier/greevil", context) -- greevil models
  -- PrecacheResource("model", "particles/heroes/viper/viper.vmdl", context)
  -- PrecacheModel("models/heroes/viper/viper.vmdl", context)
  --PrecacheModel("models/props_gameplay/treasure_chest001.vmdl", context)
  --PrecacheModel("models/props_debris/merchant_debris_chest001.vmdl", context)
  --PrecacheModel("models/props_debris/merchant_debris_chest002.vmdl", context)

  -- Sounds can precached here like anything else
  -- PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_gyrocopter.vsndevts", context)
  PrecacheResource("soundfile", "soundevents/custom_sound.vsndevts", context)
  PrecacheResource("soundfile", "soundevents/custom_music.vsndevts", context)
  PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_tusk.vsndevts", context)
  PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_crystal_maiden.vsndevts", context)
  PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_crystal_lich.vsndevts", context)
  PrecacheResource("soundfile", "soundevents/voscripts/game_sounds_vo_lich.vsndevts", context)

  -- Entire items can be precached by name
  -- Abilities can also be precached in this way despite the name
  -- PrecacheItemByNameSync("example_ability", context)
  -- PrecacheItemByNameSync("item_example_item", context)

  -- Entire heroes (sound effects/voice/models/particles) can be precached with PrecacheUnitByNameSync
  -- Custom units from npc_units_custom.txt can also have all of their abilities and precache{} blocks precached in this way
  -- PrecacheUnitByNameSync("npc_dota_hero_ancient_apparition", context)
  -- PrecacheUnitByNameSync("npc_dota_hero_ancient_apparition", context)
  PrecacheUnitByNameSync("npc_dota_hero_tusk", context)


end

if reload == nil then reload = false end
if reload and IsInToolsMode() then
  pcall(require, 'test')
end

-- Create the game mode when we activate
function Activate()
	GameRules.GameMode = GameMode()
	GameRules.GameMode:_InitGameMode()
  reload = true

  -- SendToServerConsole( 'dota_create_fake_clients 4' )
end
