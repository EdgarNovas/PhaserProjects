import { EVENTS } from '../core/events.js';

export class Gem extends Phaser.Physics.Arcade.Sprite 
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
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);

        //Animar
        //this.anims.play(this.texture.key+"_idle");
        this.anims.play(_texture+"_idle");  

        //Definimos colisiones
        //this.setColliders(); 

        // Me suscribo al evento de que el héroe está listo
        this.scene.game.events.once(
            EVENTS.HERO_READY,
            this.onHeroReady,
            this
        );
    }

     onHeroReady(_hero)
     {
        this.scene.physics.add.overlap
        (
            _hero,
            this,
            this.getGem,
            null,
            this                
        );     
     }

    /*
    setColliders()
    {
        if (this.scene.hero) { //Por si hemos instanciado la gem antes de crear al hero
            this.scene.physics.add.overlap
            (
                this.scene.hero,
                this,
                this.getGem,
                null,
                this                
            )
        }    
    }
    */
   
    getGem()
    {
        //Actualizar UI de puntos
        this.scene.game.events.emit(EVENTS.GEM_COLLECTED, this.value ?? 1);
        //Destruir gem
        this.disableBody(true, true);
        this.destroy();    
    }

    setValue(_value)
    {
        this.value = _value;
        if(_value>1)
        {
            this.setTint(0xD4AF37);
        }
    }
}