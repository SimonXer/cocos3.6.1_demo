import { Component, EventKeyboard, Input, input, KeyCode, _decorator, Node, Vec3, SpotLight } from 'cc';
import { Joystick } from './Joystick';
const { ccclass, property } = _decorator;

@ccclass('Man')
export class Man extends Component {
    radian: number = 0;
    speed: number = 4;
    isMoving: boolean = false;

    private _currPos: Vec3 = new Vec3();

    start() {
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        // input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {
        if (this.isMoving) {
            const DX = Math.cos(this.radian) * this.speed;
            const DY = Math.sin(this.radian) * this.speed;
            this.node.getPosition(this._currPos);
            this._currPos.add3f(DX, DY, 0);
            this.node.setPosition(this._currPos);
        }
    }

    onJoystick(state: number, radian?: number) {
        switch (state) {
            case Joystick.State.BEGIN:
                this.isMoving = true;
                break;

            case Joystick.State.MOVE:
                this.radian = radian ? radian : 0;
                break;

            case Joystick.State.END:
                this.isMoving = false;
                break;

            default:
                break;
        }
    }

    // onKeyDown(event: EventKeyboard) {
    //     const step = 50;
    //     const pos = this.node.position.clone();
    //     switch (event.keyCode) {
    //         case KeyCode.KEY_A:
    //             pos.add3f(-step, 0, 0);
    //             break;

    //         case KeyCode.KEY_D:
    //             pos.add3f(step, 0, 0);
    //             break;

    //         case KeyCode.KEY_W:
    //             pos.add3f(0, step, 0);
    //             break;

    //         case KeyCode.KEY_S:
    //             pos.add3f(0, -step, 0);
    //             break;

    //         default:
    //             break;
    //     }

    //     this.node.setPosition(pos);
    // }

    // onKeyUp(event: EventKeyboard) {

    // }
}
