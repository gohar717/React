import React from "react";
import Container from "../../components/Container/Container";
import styles from "./styles.module.scss";

const ChangeLog = () => {
  return (
    // ChangeLog component displays a list of updates and changes
    <Container>
      <div className={styles.changelog}>
        <h3>Change Log</h3>

        <h4>Updates as of 5/27/2023</h4>
        <ul>
          <li>Enhancements to Inventory</li>
          <li>Fixed a bug where player flew around during combat</li>
          <li>Fixed a bug with music playing</li>
          <li>
            NFT bridge now functioning in Test Net, players can transfer assets
            between game and block chain
          </li>
        </ul>

        <h4>Updates as of 5/10/2023</h4>
        <ul>
          <li>Bug fix on Title screen for log in</li>
          <li>
            First tutorial quest working (completed quests are recorded in game
            DB)
          </li>
          <li>Equipped items are now saved in game DB</li>
          <li>Bug fixes for Inventory (we are still aware of a few more)</li>
          <li>NPC chat dialog</li>
        </ul>
        <h4>Updates as of 5/3/2023</h4>
        <ul>
          <li>
            Inventory screen is a work in progress, but enhancements have been
            made
          </li>
          <li>
            Game now impliments auto-save and saves the selected character,
            custom name, trilium, experience, and inventory items
          </li>
          <li>Character interaction UI has been enhanced</li>
          <li>
            ChatGPT has been integrated into the NPC AI. You can now type to the
            NPC and get real time responses powered by ChatGPT
          </li>
        </ul>
        <h4>Updates as of 4/19/2023</h4>
        <ul>
          <li>Enhancements to Inventory Screen (still work in progress)</li>
          <li>Players can now equip swords, shovels, and daggers</li>
          <li>Common bread has been added as an item</li>
          <li>Common bread regens 25 HP over 60 seconds when consumed</li>
          <li>SSL certificate installed on the Website</li>
          <li>
            Players can now log into their game account through the website
            (this will come into play later)
          </li>
          <li>Bug fixes to combat</li>
        </ul>

        <h4>Updates as of 4/12/2023</h4>
        <ul>
          <li>Basic battle mechanics now works</li>
          <li>Common giant ant spit acid at opponents</li>
          <li>Player can perfom a basic melee attack</li>
          <li>Common giant ant can be killed</li>
          <li>
            When player dies in combat, player respawns at starting location
          </li>
        </ul>
        <h4>Updates as of 3/28/2023</h4>
        <ul>
          <li>WIP - Battle mechanics</li>
          <li>Spawnable health potions now spawn randomly in level 1 area</li>
          <li>Spawnable treasure chests now spawn randomly in level 1 area</li>
          <li>Spawnable trilium crystals now spawn randomly in level 1 area</li>
          <li>Multiplayer camera moving bug fixed</li>
          <li>Animations bug fixed</li>
        </ul>
        <h4>Updates as of 3/22/2023</h4>
        <ul>
          <li>Added HP\MP to HUD</li>
          <li>Added info panel to HUD</li>
          <li>Sectioned off Rocky Desert into 9 parts</li>
          <li>
            Mineable Trilium Crystals spawn randomly in the Level 1 Adventuring
            Area
          </li>
          <li>Mining cooldown timer added</li>
        </ul>
        <h4>Updates as of 2/27/2023</h4>
        <ul>
          <li>Added Common Giant Ant as an enemy NPC</li>
          <li>Added male human as a playable character</li>
        </ul>
        <h4>Updates as of 2/14/2023</h4>
        <ul>
          <li>Fixed registration bug</li>
        </ul>
        <h4>Updates as of 2/13/2023</h4>
        <ul>
          <li>Player characters no longer collide with each other</li>
          <li>
            Gives the option for a player to enter a custom character name
          </li>
          <li>
            Character name appears above the head of the character in game
          </li>
          <li>Inventory screen created and shwoing inventory</li>
          <li>Inventory screen opens when "i" is pressed</li>
          <li>Male Nordic playable character added</li>
          <li>Female Nordic playable character added</li>
          <li>Female Grey playable character added</li>
          <li>Walk animation speed increased</li>
          <li>Password confirmation input for registration added</li>
          <li>Login messages added</li>
        </ul>
        <h4>Older Changes</h4>
        <ul>
          <li>Character selection screen has been added</li>
          <li>Female Human added as a playable character</li>
          <li>Femal Grey added as a playable character</li>
          <li>Female Little Green Person added as a playable character</li>
          <li>Common Wood Treasure chest respawns at random locations</li>
          <li>Health potions respawns at random locations</li>
          <li>
            Player can now interact with Fred the Grey Alien NPC and see simple
            dialog
          </li>
          <li>
            Player can now interact with and pick up the health potion (if it's
            not there, that means someone grabbed it)
          </li>
          <li>
            Removed health bar from HUD panel (will place above characters)
          </li>
          <li>Added button for Inventory in HUD panel</li>
          <li>Changed input box style for registration and login</li>
          <li>Login on title screen works (authenticates against DB)</li>
          <li>Registration on title screen works</li>
          <li>Little Green Person (male) now the default player character</li>
          <li>Collision added to map where appropriate</li>
          <li>Initial sandy desert level size increased to 10,000 x 10,000</li>
          <li>Potion item added to World Map</li>
          <li>Grey Alien NPC spawns near where the player spawns</li>
          <li>Common wood treasure chest spawns in a random location</li>
          <li>Initial Creation of Menu</li>
          <li>Simple HUD created</li>
          <li>Reptilian sprite used for initial player</li>
          <li>
            Client software connects to the central server and spawns a
            multiplayer player on a rudimentary map
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default ChangeLog;
