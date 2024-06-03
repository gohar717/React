// Import images for abundant items
import abundantStandardArmor from "./Abundant/NFT Frame_Abundant_StandardArmor.png";
import abundantStandardDagger from "./Abundant/NFT Frame_Abundant_StandardDagger.png";
import abundantStandardHelmet from "./Abundant/NFT Frame_Abundant_StandardHelmet.png";
import abundantStandardShovel from "./Abundant/NFT Frame_Abundant_StandardShovel.png";
import abundantStandardSword from "./Abundant/NFT Frame_Abundant_StandardSword.png";

// Import images for common items
import commonStandardArmor from "./Common/NFT Frame_Common_StandardArmor.png";
import commonStandardDagger from "./Common/NFT Frame_Common_StandardDagger.png";
import commonStandardHelmet from "./Common/NFT Frame_Common_StandardHelmet.png";
import commonStandardShovel from "./Common/NFT Frame_Common_StandardShovel.png";
import commonStandardSword from "./Common/NFT Frame_Common_StandardSword.png";

// Import images for rare items
import rareStandardArmor from "./Rare/NFT Frame_Rare_StandardArmor.png";
import rareStandardDagger from "./Rare/NFT Frame_Rare_StandardDagger.png";
import rareStandardHelmet from "./Rare/NFT Frame_Rare_StandardHelmet.png";
import rareStandardShovel from "./Rare/NFT Frame_Rare_StandardShovel.png";
import rareStandardSword from "./Rare/NFT Frame_Rare_StandardSword.png";

// Import images for epic items
import epicStandardArmor from "./Epic/NFT Frame_Epic_StandardArmor.png";
import epicStandardDagger from "./Epic/NFT Frame_Epic_StandardDagger.png";
import epicStandardHelmet from "./Epic/NFT Frame_Epic_StandardHelmet.png";
import epicStandardShovel from "./Epic/NFT Frame_Epic_StandardShovel.png";
import epicStandardSword from "./Epic/NFT Frame_Epic_StandardSword.png";

// Import images for legendary items
import legendaryStandardArmor from "./Legendary/NFT Frame_Legendary_StandardArmor.png";
import legendaryStandardDagger from "./Legendary/NFT Frame_Legendary_StandardDagger.png";
import legendaryStandardHelmet from "./Legendary/NFT Frame_Legendary_StandardHelmet.png";
import legendaryStandardShovel from "./Legendary/NFT Frame_Legendary_StandardShovel.png";
import legendaryStandardSword from "./Legendary/NFT Frame_Legendary_StandardSword.png";

// Import images for mythical items
import mythicalStandardArmor from "./Mythical/NFT Frame_Mythical_StandardArmor.png";
import mythicalStandardDagger from "./Mythical/NFT Frame_Mythical_StandardDagger.png";
import mythicalStandardHelmet from "./Mythical/NFT Frame_Mythical_StandardHelmet.png";
import mythicalStandardShovel from "./Mythical/NFT Frame_Mythical_StandardShovel.png";
import mythicalStandardSword from "./Mythical/NFT Frame_Mythical_StandardSword.png";

// Import images for items
import bread from "../cardImages/Items/NFT Frame_Bread.png";
import healthPotion from "../cardImages/Items/NFT Frame_HealthPotion.png";
import magicPotion from "../cardImages/Items/NFT Frame_MagicPotion.png";
import cloth from "./Items/NFT Frame_Cloth.png";
import copperIngot from "./Items/NFT Frame_Ingot_Copper.png";
import goldIngot from "./Items/NFT Frame_Ingot_Gold.png";
import ironIngot from "./Items/NFT Frame_Ingot_Iron.png";
import silverIngot from "./Items/NFT Frame_Ingot_Silver.png";
import leather from "./Items/NFT Frame_Leather.png";
import copperNugget from "./Items/NFT Frame_Nugget_Copper.png";
import goldNugget from "./Items/NFT Frame_Nugget_Gold.png";
import ironNugget from "./Items/NFT Frame_Nugget_Iron.png";
import silverNugget from "./Items/NFT Frame_Nugget_Silver.png";
import copperOre from "./Items/NFT Frame_Ore_Copper.png";
import goldOre from "./Items/NFT Frame_Ore_Gold.png";
import ironOre from "./Items/NFT Frame_Ore_Iron.png";
import silverOre from "./Items/NFT Frame_Ore_Silver.png";

// Import images for enemies
// Ants
import abundantDesertAnt from "../cardImages/Enemies/NFT Frame_Abundant_DesertAnt.png";
import commonDesertAnt from "../cardImages/Enemies/NFT Frame_Common_DesertAnt.png";
import vuldrax from "../cardImages/Enemies/NFT Frame_Vuldrax.png";
// Scrunes
import commonDesertScrune from "../cardImages/Enemies/NFT Frame_Common_DesertScrune.png";
import xyloarachs from "../cardImages/Enemies/NFT Frame_Xyloarachs.png";

// Define a constant object to store the images with corresponding names
export const NFTS = {
  // Abundants
  "Abundant Standard Helmet": abundantStandardHelmet,
  "Abundant Standard Armor": abundantStandardArmor,
  "Abundant Standard Dagger": abundantStandardDagger,
  "Abundant Standard Shovel": abundantStandardShovel,
  "Abundant Standard Sword": abundantStandardSword,

  // Commons
  "Common Standard Helmet": commonStandardHelmet,
  "Common Standard Armor": commonStandardArmor,
  "Common Standard Dagger": commonStandardDagger,
  "Common Standard Shovel": commonStandardShovel,
  "Common Standard Sword": commonStandardSword,

  // Rares
  "Rare Standard Helmet": rareStandardHelmet,
  "Rare Standard Armor": rareStandardArmor,
  "Rare Standard Dagger": rareStandardDagger,
  "Rare Standard Shovel": rareStandardShovel,
  "Rare Standard Sword": rareStandardSword,

  // Epics
  "Epic Standard Helmet": epicStandardHelmet,
  "Epic Standard Armor": epicStandardArmor,
  "Epic Standard Dagger": epicStandardDagger,
  "Epic Standard Shovel": epicStandardShovel,
  "Epic Standard Sword": epicStandardSword,

  // Legendary
  "Legendary Standard Helmet": legendaryStandardHelmet,
  "Legendary Standard Armor": legendaryStandardArmor,
  "Legendary Standard Dagger": legendaryStandardDagger,
  "Legendary Standard Shovel": legendaryStandardShovel,
  "Legendary Standard Sword": legendaryStandardSword,

  // Mythical
  "Mythical Standard Helmet": mythicalStandardHelmet,
  "Mythical Standard Armor": mythicalStandardArmor,
  "Mythical Standard Dagger": mythicalStandardDagger,
  "Mythical Standard Shovel": mythicalStandardShovel,
  "Mythical Standard Sword": mythicalStandardSword,

  // Items
  "Cloth": cloth,
  "Leather": leather,
  "Copper Ingot": copperIngot,
  "Gold Ingot": goldIngot,
  "Iron Ingot": ironIngot,
  "Silver Ingot": silverIngot,
  "Copper Ore": copperOre,
  "Gold Ore": goldOre,
  "Iron Ore": ironOre,
  "Silver Ore": silverOre,
  "Copper Nugget": copperNugget,
  "Gold Nugget": goldNugget,
  "Iron Nugget": ironNugget,
  "Silver Nugget": silverNugget,
  "Health Potion": healthPotion,
  "Magic Potion": magicPotion,
  "Bread": bread,

  // Enemies
  "Abundant Desert Ant": abundantDesertAnt,
  "Common Desert Ant": commonDesertAnt,
  "Vuldrax": vuldrax,
  "Common Desert Scrune": commonDesertScrune,
  "Xyloarachs": xyloarachs,
};
