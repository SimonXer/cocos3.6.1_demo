import { _decorator, Component, Node } from 'cc';
import { Joystick } from './Joystick';
import { Man } from './Man';
const { ccclass, property } = _decorator;

@ccclass('Canvas')
export class Canvas extends Component {
    @property(Node)
    man: Node;

    @property(Node)
    joystick: Node;

    start() {
        let joy = this.joystick.getComponent(Joystick);
        let man = this.man.getComponent(Man);
        joy.callback = man.onJoystick;
        joy.obj = man;
    }

    update(deltaTime: number) {

    }
}
