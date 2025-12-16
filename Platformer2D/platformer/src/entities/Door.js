export class Door extends Phaser.Physics.Arcade.Sprite
{
    /**
    * @param {Phaser.Scene} _scene   - escena en la que se instanciará
    * @param {number} _posX          - posición X del sprite
    * @param {number} _posY          - posición Y del sprite
    * @param {string} _texture       - key/spriteTag del spritesheet/atlas
    */
    constructor(_scene,_posX,_posY,_texture)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_texture);
        // Añadir a la escena y habilitar físicas
        this.scene.add.existing(this);
        this.setOrigin(.5,1);
        //this.scene.physics.world.enable(this);
        //this.body.setAllowGravity(false);
    }
    
    setState(_opened)
    {
        this.state = _opened;
        if(_opened)
        {
            //activaremos la animacion de la puerta
            this.anims.play(this.texture.key+"_idle");
        }
    }
}