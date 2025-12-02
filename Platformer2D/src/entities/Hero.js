import { HERO } from '../core/constants.js';

export class Hero extends Phaser.Physics.Arcade.Sprite 
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
        //Ajustamos el punto de pivote del hero para que no caiga, alienándolo con la puerta
        this.setOrigin(.5,1);
        //El Hero tiene vida. Necesitaremos una variable de control y manipular la UI
        this.health = HERO.MAX_LIVES;
        this.setColliders();

        //Ajustar el tamaño del body

        //Control de Input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    setColliders()
    {
        if (this.scene.walls) { //Por si hemos instanciado al Jumper antes de crear la capa walls
            this.scene.physics.add.collider
            (
                this,
                this.scene.walls
            );    
        }
    }

    hitHero(_enemy,_hero)
    {
        if(this.body.touching.down && _enemy.body.touching.up)
        {
            if(--_enemy.health<=0)
            {
                _enemy.destroy();
                //Incrementar puntos
            }
            this.body.setVelocityY(HERO.JUMP_FORCE);     
        }else
        {
            //Decrementar el shiled del hero y comprobar gameover
            if(--this.health<0)
            {
                //go to scene 'gameover'
            }
            else
            {
                //actualizar la UI del shield
                //resetear la escena
                this.body.reset(65,100);
                this.scene.cameras.main.shake(500,0.05);
                this.scene.cameras.main.flash(250,255,0,0);
            }
        }
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);

        if(this.cursors.left.isDown)
        { //ME MUEVO A LA IZQUIERDA
            this.body.setVelocityX(-HERO.SPEED); // ← negativo a la izquierda    
            this.setFlipX(true); 
            this.anims.play('run',true);   
        }else
        if(this.cursors.right.isDown)
        { //ME MUEVO A LA DERECHA
            this.body.setVelocityX(HERO.SPEED); 
            this.setFlipX(false);      
            this.anims.play('run',true);
        }else
        {
            this.body.setVelocityX(0);  
            this.anims.stop().setFrame(0); 
        }
        
        if(this.cursors.space.isDown
           && this.body.onFloor()
           //&& this.body.blocked.down  
           && Phaser.Input.Keyboard.DownDuration(this.cursors.space,250))
           
        {
            this.body.setVelocityY(HERO.JUMP_FORCE);    
        } 

        if(!this.body.onFloor())
        {
            this.anims.stop().setFrame(6);
        } 
    }
}