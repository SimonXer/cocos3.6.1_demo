import { _decorator, Component, Node, EventTouch, Vec3, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

const tmpV2 = new Vec2();
const tmpV3 = new Vec3();
const pos = new Vec3();

@ccclass('Joystick')
export class Joystick extends Component {
    @property(Node)
    hand: Node;

    @property(Node)
    panel: Node;

    static readonly State = { BEGIN: 0, MOVE: 1, END: 2 }

    callback: Function;
    obj: any;

    private _maxRadius: number = 0;

    onLoad() {

    }

    start() {
        this._maxRadius = this.panel.getComponent(UITransform).contentSize.width / 2;
    }

    onEnable() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onDisable() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    update(deltaTime: number) {

    }

    onTouchStart(event: EventTouch) {
        this.callback && this.callback.apply(this.obj, [Joystick.State.BEGIN]);
    }

    onTouchMove(event: EventTouch) {
        const start = this.panel.position;

        event.getUILocation(tmpV2);
        this.node.getComponent(UITransform).convertToNodeSpaceAR(tmpV3.set(tmpV2.x, tmpV2.y, 0), pos);

        const distance = Vec2.distance(start, pos);
        const radian = this.getRadian(start, pos);
        if (distance < this._maxRadius) {
            this.hand.setPosition(pos);
        } else {
            const x = start.x + Math.cos(radian) * this._maxRadius;
            const y = start.y + Math.sin(radian) * this._maxRadius;
            this.hand.setPosition(x, y, 0)
        }

        this.callback && this.callback.apply(this.obj, [Joystick.State.MOVE, radian]);
    }

    onTouchEnd(event: EventTouch) {
        this.hand.setPosition(this.panel.position);
        this.callback && this.callback.apply(this.obj, [Joystick.State.END]);
    }

    onTouchCancel() {
        this.hand.setPosition(this.panel.position);
        this.callback && this.callback.apply(this.obj, [Joystick.State.END]);
    }

    getRadian(start: Vec3, end: Vec3) {
        return Math.atan2(end.y - start.y, end.x - start.x)
    }
}
