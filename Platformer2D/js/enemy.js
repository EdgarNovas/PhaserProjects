class enemy extends Phaser.GameObjects.Sprite
{
    constructor(_scene,posX,posY,_spriteTag='enemy')
    {
        super(_scene,posX,posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this.jumper = this;
        this.jumper.anims.play("enemyrun", true);
        this.jumper.direction = 1;
        this.jumper.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direction);
        this.setColliders();
    
    }




    setColliders()
    {
        
        this.scene.physics.add.collider
        (
            this.jumper,
            this.scene.walls
        )
    }

    preUpdate(time,delta)
    {
        if(this.jumper.body.blocked.left || this.jumper.body.blocked.right)
        {
            this.jumper.direction *= -1;
            this.jumper.flipX = !this.jumper.flipX
            this.jumper.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direction)
        }
    }

}