import { Preloader } from './Preloader.js';
export class Boot extends Phaser.Scene
{
    constructor()
    {
        super({key:'boot'});
    }

  


    preload()
    {
       
        this.load.setPath('assets/sprites/backgrounds');
        this.load.image('bg1','bg_green_tile.png');
        this.load.image('bg2','bg_blue_tile.png');

        //this.load.setPath('assets/sprites/static');
        //this.load.image('entry','spr_door_closed_0.png');

        //this.load.setPath('assets/sprites/ui');
        //this.load.image('gemUI','spr_gui_gem_0.png');

        this.load.setPath('assets/sprites/spritesheets');
        this.load.spritesheet('hero','hero.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('jumper','jumper.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('slime','slime.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('gem','gem.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('door','door.png',
        {frameWidth:32,frameHeight:40});
        this.load.spritesheet('healthUI','health.png',
        {frameWidth:128,frameHeight:28});

        this.load.setPath('assets/tiled/tilesets');   
        this.load.image('tileset_walls','tileset_walls.png');
        this.load.image('tileset_moss','tileset_moss.png');

        this.load.setPath('assets/tiled/maps');
        this.load.tilemapTiledJSON('level1','level1.json');
        //this.load.tilemapTiledJSON('level2','level2.json');
        //this.load.tilemapTiledJSON('level'+nivelActual,'level'+nivelActual+'.json');

        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('UIFont','font.png','font.fnt');

        


        this.load.on('complete', function()
        {
            this.scene.start('preloader');
        },this);
    }


   

}