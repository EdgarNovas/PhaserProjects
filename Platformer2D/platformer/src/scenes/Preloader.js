import { Level1 } from './Level1.js';

export class Preloader extends Phaser.Scene
{
    constructor()
    {
        super({key:'preloader'});
    }

    init()
    {
        //Pintar todo lo que se va  aver en pantalla mientras se cargan los assets
        this.cameras.main.setBackgroundColor('#666');
        this.bar = this.add.rectangle(150,200,200,20).setOrigin(0,.5);
        this.bar.setStrokeStyle(2,0xFFFFFF);
        this.fill = this.add.rectangle(154,200,0,12,0xEEEEEE).setOrigin(0,.5);
        this.fill.setStrokeStyle(2,0xFFFFFF)
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
            this.scene.start('level1');
        },this);

        /*

        this.load.on('progress', function(value)
        {
            let _num = Phaser.Math.RoundTo(value * 100,0);
            let _newFillWidth = Phaser.Math.RoundTo(_num / 100 * 192);
            this.fill.setSize(_newFillWidth,this.fill.height);
            this.perText.text = "loading... " + _num + " %"
        },this);
    */
    }


    create()
    {
        //let _rect = new Rectangle(100,100,250,25)
    }

}