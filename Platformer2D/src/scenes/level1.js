class level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'level1'});
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("666");
        this.load.setPath('assets/sprites');
        this.load.image('bg', 'bg_green_tile.png');
        //Cargar el mapa

        this.load.spritesheet('hero', 'hero.png',
        { frameWidth:32,frameHeight:32  });

        this.load.image('entry', 'spr_door_closed_0.png');
     

        this.load.setPath('assets/tilesets');
        this.load.image('tileset_walls', 'tileset_walls.png');
        this.load.image('tileset_moss', 'tileset_moss.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('level1','level1.json');

        this.load.setPath('assets/sprites/spritesheets');
        

        this.load.spritesheet('enemy', 'jumper.png',
        { frameWidth:32,frameHeight:32  });

    }

    create()
    {
        this.add.tileSprite(0,0,gamePrefs.levelWidth,gamePrefs.levelHeight,'bg').setOrigin(0);
        //this.add.tileSprite(0,0,gamePrefs.gameWidth,gamePrefs.gameHeight,'bg').setOrigin(0);

        this.map = this.add.tilemap('level1');
        this.map.addTilesetImage('tileset_walls');
        this.map.addTilesetImage('tileset_moss');
        //Pinto capas del mapa
        this.walls = this.map.createLayer('layer_walls','tileset_walls');
        this.map.createLayer('layer_moss','tileset_moss');

        //Defino con que  colisiona la layer_walls
        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //Phaser lo interpreta el -1 como 0 en el JSON
        this.map.setCollisionByExclusion(-1,true,true,'layer_walls');
        this.entry = this.add.sprite(65,268,'entry');
        this.hero = this.physics.add.sprite(65,100,'hero');

        this.enemy = new enemy(this,250,268);

        
        //this.entry.body.setAllowGravity(false);
        //this.entry.body.setImmovable(true);

        //this.physics.add.collider(this.hero, this.entry);
        this.physics.add.collider(this.hero, this.walls);



        this.cursors = this.input.keyboard.createCursorKeys();
        this.loadAnimations();

        this.cameras.main.startFollow(this.hero);
        this.cameras.main.setBounds(0,0,gamePrefs.levelWidth,gamePrefs.levelHeight);
    }


    update()
    {
        if(this.cursors.left.isDown)
        {
            this.hero.body.setVelocityX(-gamePrefs.HERO_SPEED);
            this.hero.setFlipX(true);
            this.hero.anims.play('run',true);

        }
        else if(this.cursors.right.isDown) 
        {
            this.hero.body.setVelocityX(gamePrefs.HERO_SPEED);
            this.hero.setFlipX(false);
            this.hero.anims.play('run',true);
            
        }
        else
        {
            this.hero.body.setVelocityX(0);
            this.hero.anims.stop().setFrame(0);
        }

        if(this.cursors.space.isDown && this.hero.body.onFloor() 
        //&& this.hero.body.blocked.down
        && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 250)
        )
        {
            this.hero.body.setVelocityY(gamePrefs.HERO_JUMP);
        }
        
        if(!this.hero.body.onFloor())
        {
            this.hero.anims.stop().setFrame(6);
        }


        
    }


    loadAnimations()
    {
        this.anims.create
        ({
            key:'run',
            frames: this.anims.generateFrameNumbers('hero', {start:2,end:5}),
            framerate:10,
            repeat: -1,
            yoyo:false,

        });

        this.anims.create
        ({
            key:'enemyrun',
            frames: this.anims.generateFrameNumbers('enemy', {start:0,end:3}),
            framerate:10,
            repeat: -1,
            yoyo:false,

        });
    }


}