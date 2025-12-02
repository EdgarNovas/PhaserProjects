import { ENEMY } from '../../core/constants.js';

export class BaseEnemy extends Phaser.Physics.Arcade.Sprite 
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
        //this.scene = _scene; //Es redundante. Lo hace super
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        
        // Física básica (ajusta a tu gusto)
        //this.body.setAllowGravity(true);
        //this.body.setCollideWorldBounds(false);
        
        //Cargamos las animaciones
        this.anims.play("run_"+_texture,true);
        // Estado inicial
        this.direction = 1; // 1 → derecha, -1 → izquierda
        this.body.setVelocityX(ENEMY.SPEED*this.direction);
        this.health = 1;

        //Definimos colisiones
        this.setColliders();
    }

    setHealth(_value)
    {
        this.health = _value;
        if(_value>1) this.setTint(0xD4AF37);
    }

    setColliders()
    {
        if (this.scene.walls) { //Por si hemos instanciado al Enemy antes de crear la capa walls
            this.scene.physics.add.collider
            (
                this,
                this.scene.walls
            )
        }

        if (this.scene.hero) { //Por si hemos instanciado al Enemy antes de crear al hero
            this.scene.physics.add.collider
            (
                this,
                this.scene.hero,
                this.scene.hero.hitHero,
                null,
                this.scene.hero
            )
        }
    }

    howItpatrols()
    {
        return (this.body.blocked.left || this.body.blocked.right)    
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);  

        if(this.howItpatrols())
        {
            this.direction *=-1;
            this.flipX = !this.flipX;
            this.body.setVelocityX(ENEMY.SPEED*this.direction);
        }

          
    }
}