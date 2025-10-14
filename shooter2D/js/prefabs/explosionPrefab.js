class explosionPrefab extends Phaser.GameObjects.Sprite
{
    //_bullet = this.add.sprite(this.nave.x,this.nave.body.top,'bullet');
    constructor(_scene,_posX,_posY,_spriteTag='explosion')
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        //Playear la animacion
        this.anims.play('explosionAnim');
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> 
        {
            this.setActive(false);
        },_scene);
    }

    preUpdate(time,delta)
    {
        if(this.y<=0)
        {
            this.setActive(false);
        }
        super.preUpdate(time,delta);
    }


}