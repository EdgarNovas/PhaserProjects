class gameState extends Phaser.Scene{
	constructor()
    {
        //LLamamos al constructor de la scene
        super({key:"gameState"});
    }

	preload()
    {//Cargamos los assets en memoria
        this.cameras.main.setBackgroundColor("113");
        this.load.setPath('assets/sprites');
        this.load.image('bg1','background_back.png');
        this.load.image('bg2','background_frontal.png');
        this.load.image('bullet','spr_bullet_0.png');

        this.load.spritesheet('nave','naveAnim.png',
        {frameWidth:16,frameHeight:24});
        this.load.spritesheet('enemy','enemy-medium.png',
        {frameWidth:32,frameHeight:16});
        this.load.spritesheet('explosion','explosion.png',
        {frameWidth:16,frameHeight:16});

    }
	create()
    {// Pintamos los assets en pantalla
        this.bg1 = this.add.tileSprite(0,0,config.width, config.height,'bg1')
        .setOrigin(0);
        this.bg2 = this.add.tileSprite(0,0,config.width, config.height,'bg2')
        .setOrigin(0);
        
        this.nave = this.physics.add.sprite(config.width/2,config.height*0.95,'nave')
        .setScale(1);

        this.nave.body.setCollideWorldBounds(true);

        this.loadAnimations();
        this.loadPools();

        this.nave.anims.play('idle');
        
        this.cursores = this.input.keyboard.createCursorKeys();

        this.cursores.space.on
        (
            'up',
            ()=>{this.createBullet();}
            /*
            function()
            {
                this.createBullet();
            },
            this
            */
        );

        this.time.addEvent
        (
            {
                delay:2*1000, //Phaser.Math.Between(2,5)*1000;
                callback: this.createEnemy,
                callbackScope:this,
                loop:true //repeat:-1
            }
        );

        //this.physics.add.collider
        this.physics.add.overlap
        (
            this.bulletPool,
            this.enemyPool,
            this.killEnemy,
            null,
            this
        );
    }

    killEnemy(_bullet,_enemy)
    {   //una -bullet ha impactado con un _enemy
        console.log('impacto');
        
        //Crear una explosion
        this.createExplosion(_bullet);
        //_bullet.destroy();
        _bullet.setActive(false);
        _bullet.body.reset(-100,-100);
        
        //_enemy.destroy();
        _enemy.health--;
        if(_enemy.health>0)
        {
            //invulnerabilidad por X segundos al enemy
        }else
        {
            //Actualizar el score
            //Calcular el % de drop
            //Eliminar al enemigo
            _enemy.setActive(false);
            _enemy.body.reset(-200,-200);

        }        
    }

    loadAnimations()
    {
        this.anims.create(
        {
            key: 'idle',
            frames:this.anims.generateFrameNumbers('nave',{start:0,end:1}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create(
        {
            key:'left',
            frames:this.anims.generateFrameNumbers('nave',{start:2,end:3}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create(
        {
            key:'right',
            frames:this.anims.generateFrameNumbers('nave',{start:4,end:5}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create({
            key: 'idleEnemy',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'explosionAnim',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0,
            showOnStart:true,
            hideOnComplete:true
        });
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group();
        this.explosionPool = this.add.group();
    }

    createExplosion(_bullet)
    {
       var _explosion = this.explosionPool.getFirst(false);  //Buscamos en el pool de explosiones si hay alguna reutilizable
       if(!_explosion)
       {//No hay
           console.log('Create explosion');
           _explosion = new explosionPrefab(this,_bullet.x,_bullet.y,'explosion');
           this.explosionPool.add(_explosion);
       }else
       {//Si hay
           console.log('Reset explosion');
           _explosion.active = true;
           _explosion.x=_bullet.x;
           _explosion.y=_bullet.y;
           _explosion.anims.play('explosionAnim');
       }
    }

    createEnemy()
    {
        var _enemy = this.enemyPool.getFirst(false);
        var _posX = Phaser.Math.Between(0,config.width-32);
        var _posY = 0;

        if(!_enemy)
        {//No hay enemies en la pool disponibles
            console.log('crea enemy');
            _enemy = new enemyPrefab(this,_posX,_posY);
            this.enemyPool.add(_enemy);
        }else
        {//Existe al menos un enemy en la pool disponible y lo reciclo
            console.log('reciclo enemy');
            _enemy.setActive(true);
            _enemy.body.reset(_posX,_posY);
        }
        //Dar velocidad al enemy
        _enemy.body.setVelocityY(gamePrefs.ENEMY_SPEED);
        
    }

    createBullet()
    {
        //Miramos si hay un objeto disponible en la pool
        var _bullet = this.bulletPool.getFirst(false);
        
        if(!_bullet)
        {   //No hay bullets en la pool (disponibles)
            //Creo una bullet
            console.log('create bullet');
            //_bullet = this.add.image(this.nave.x,this.nave.body.top,'bullet');
            //_bullet = new bulletPrefab(this,this.nave.x,this.nave.body.top,'bullet');
            _bullet = new bulletPrefab(this,this.nave.x,this.nave.body.top);
            _bullet.setOrigin(.5,1);
            //Meto la bullet en la pool
            this.bulletPool.add(_bullet);
        }else
        {   //sí hay bullet disponible en la pool
            console.log('reciclo bullet');
            //Activamos la bullet
            _bullet.setActive(true);
            //Posicionamos la bullet en la nave
            _bullet.body.reset(this.nave.x, this.nave.body.top);
        }
        //Le doy velocidad
        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
        //Ejecutar el sonido de disparo
        
        //STUDENTS - FAIL
        //Defino una bala
        //Meter la bala en la pool
        //Le cargo el sprite
        //Le pongo un rigidbody
        //La posiciono en la nave
        //Le doy velocidad
        //Condicion de destruccion/reutilizacion
    }

	update()
    {
        this.bg1.tilePositionY -=.25;
        this.bg2.tilePositionY -=1;

        if(this.cursores.right.isDown)
        {
            //this.nave.x += gamePrefs.NAVE_SPEED;
            this.nave.body.velocity.x +=gamePrefs.NAVE_SPEED;
            this.nave.anims.play('right',true);    
        }else
        if(this.cursores.left.isDown)
        {
            //this.nave.x -= gamePrefs.NAVE_SPEED;
            this.nave.body.velocity.x -=gamePrefs.NAVE_SPEED;
            this.nave.anims.play('left',true);    
        }else
        {
           this.nave.anims.play('idle',true);     
        } 
        /*
        if(this.cursores.space.isUp)
        {
            this.createBullet();
        }
        */
    }
}