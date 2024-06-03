import abundant_desert_scrune from "../../assets/gifs/enemies/abundant_desert_scrune.gif";
import abundant_giant_ant from "../../assets/gifs/enemies/abundant_giant_ant.gif";
import common_desert_scrune from "../../assets/gifs/enemies/common_desert_scrune.gif";
import common_giant_ant from "../../assets/gifs/enemies/common_giant_ant.gif";
import vuldrax from "../../assets/gifs/enemies/vuldrax.gif";
import xyloarachs from "../../assets/gifs/enemies/xyloarachs.gif";
import Container from "../../components/Container/Container";
import Enemy from "./../../components/Enemy/Enemy";
import styles from "./styles.module.scss";

// Array containing enemy data
const enemies = [
  {
    image: abundant_giant_ant,
    name: "Abundant Giant Ant",
    description: "Very common on the planet Magor, especially in desert areas.",
    hitPoints: "10 - 30",
    magicPoints: "0",
    triliumAward: "0.001 - 0.005",
    commonDrops: "Health Potion, Cloth, Leather",
    rareDrops:
      "Abundant Dagger, Abundant Sword, Abundant Helmet, Abundant Armor, Abundant Shovel, Copper Ore, Iron Ore, Silver Ore, Gold Ore",
  },
  {
    image: common_giant_ant,
    name: "Common Giant Ant",
    description:
      "Very uncommon on the planet Magor, especially in desert areas. Very common on the first Dungeon",
    hitPoints: "20 - 40",
    magicPoints: "0",
    triliumAward: "0.005 - 0.01",
    commonDrops:
      "Common Health Potion, Cloth, Leather, Copper Ore, Iron Ore, Silver Ore, Gold Ore",
    rareDrops:
      "Common Dagger, Common Sword, Common Shovel, Common Armor, Common Helmet, Copper Nugget, Iron Nugget, Silver Nugget, Gold Nugget",
  },
  {
    image: vuldrax,
    name: "Vuldrax",
    description: "Boss giant ant of the first dungeon",
    hitPoints: "60 - 90",
    magicPoints: "0",
    triliumAward: "0.1 - 0.5",
    commonDrops:
      "Health Potion, Copper Ingot, Iron Ingot, Copper Ingot, Iron Ingot",
    rareDrops:
      "Legendary Dagger, Legendary Sword, Legendary Shovel, Legendary Armor, Legendary Helmet",
  },
  {
    image: abundant_desert_scrune,
    name: "Abundant Desert Scrune",
    description: "Common on the planet Magor, especially in desert areas",
    hitPoints: "20 - 40",
    magicPoints: "0",
    triliumAward: "0.005 - 0.01",
    commonDrops: "Health Potion, Cloth, Leather",
    rareDrops:
      "Rare Dagger, Rare Sword, Rare Shovel, Rare Armor, Rare Helmet, Copper Nugget, Iron Nugget, Silver Nugget, Gold Nugget",
  },
  {
    image: common_desert_scrune,
    name: "Common Desert Scrune",
    description:
      "Very uncommon on the planet Magor, Very common on the second Dungeon",
    hitPoints: "40 - 60",
    magicPoints: "0",
    triliumAward: "0.1 - 0.5",
    commonDrops:
      "Health Potion, Copper Nugget, Iron Nugget, Silver Nugget, Gold Nugget, Cloth, Leather",
    rareDrops:
      "Epic Dagger, Epic Sword, Epic Shovel, Epic Armor, Epic Helmet, Copper Ingot, Iron Ingot, Silver Ingot, Gold Ingot",
  },
  {
    image: xyloarachs,
    name: "Xyloarachs",
    description: "Boss Desert Scrune of the second dungeon",
    hitPoints: "90 - 120",
    magicPoints: "0",
    triliumAward: "0.5 - 0.75",
    commonDrops:
      "Health Potion, Legendary Dagger, Legendary Sword, Legendary Shovel, Copper Ingot, Iron Ingot, Silver Ingot, Gold Ingot",
    rareDrops:
      "Mythical Dagger, Mythical Sword, Mythical Shovel, Mythical Armor, Mythical Helmet",
  },
];

// BestiaryPage component
const BestiaryPage = () => {
  return (
    <Container>
      <div className={styles.container}>
        <h2>Bestiary</h2>
        {enemies.map((enemy, index) => (
          <Enemy
            image={enemy.image}
            name={enemy.name}
            description={enemy.description}
            hitPoints={enemy.hitPoints}
            magicPoints={enemy.magicPoints}
            triliumAward={enemy.triliumAward}
            commonDrops={enemy.commonDrops}
            rareDrops={enemy.rareDrops}
            key={index}
          />
        ))}
      </div>
    </Container>
  );
};

export default BestiaryPage;
