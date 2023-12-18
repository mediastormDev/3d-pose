import { models } from "./useMannequin";

export class Ball {
  context: any;
  id?: string;
  x: number;
  y: number;
  rotate: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  constructor(context, options = {}) {
    this.context = context;
    this.rotate = options.rotate || 0;
    this.id = options.id;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.radius = options.radius || 20;
    this.color = options.color || "#000";
    this.vx = options.vx || 0;
    this.vy = options.vy || 0;
    this.ax = options.ax || 0;
    this.ay = options.ay || 0;
  }

  isContainsPoint(x: number, y: number) {
    return Math.hypot(this.x - x, this.y - y) < this.radius;
  }

  isContainsPointSector(x: number, y: number) {
    return (
      Math.hypot(this.x - x, this.y - y) > this.radius &&
      Math.hypot(this.x - x, this.y - y) < this.radius + 20
    );
  }

  update() {
    // this.vx += this.ax;
    // this.vy += this.ay;
    // this.x += this.vx;
    // this.y += this.vy;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360
    );
    this.context.fillStyle = this.color;
    this.context.closePath();
    this.context.fill();

    /*把起点放到圆心位置*/
    this.context.moveTo(this.x, this.y);
    this.context.arc(
      this.x,
      this.y,
      this.radius + 20,
      Math.PI / 4 - this.rotate,
      (Math.PI / 4) * 3 - this.rotate
    );
    this.context.closePath();
    this.context.fill();
  }
}

// let man: any = null;
export const balls: Ball[] = [];
// 获取元素
let canvasTopView;
// 获取上下文
let context;

//初始化旋转角度是0，没有旋转。
let rotate = 0;

export default () => {
  //window屏幕坐标转化为canvas坐标
  const convertCoordinate = (x, y, cx, cy) => {
    //在屏幕坐标系中，相对canvas坐标系原点PO的偏移,所以要减去canvas坐标原点
    x = x - cx;
    y = y - cy;
    //如果没有旋转，那么只计算偏移量就行，不用考虑角度
    if (rotate != 0) {
      //Math.sqrt是两点之间的距离图中OM的距离，简化版本，正确用法应该是Math.sqrt((x-0)*(x-0) + (y-0)*(y-0))
      var len = Math.sqrt(x * x + y * y);
      //屏幕坐标系中 PO与按下点连线 与屏幕坐标系X轴的夹角弧度
      var oldR = Math.atan2(y, x);
      //canvas坐标系中PO与按下点连线 与canvas坐标系x轴的夹角弧度
      var newR = oldR - rotate;
      //最终算出来canvas坐标系上的M点
      x = len * Math.cos(newR);
      y = len * Math.sin(newR);
    }
    return { x: x, y: y };
  };

  function checkWalls(ball: Ball) {
    // 边界反弹
    if (ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.vx *= -0.95;
    } else if (ball.x > canvasTopView.width - ball.radius) {
      ball.x = canvasTopView.width - ball.radius;
      ball.vx *= -0.95;
    }

    if (ball.y < ball.radius) {
      ball.y = ball.radius;
      ball.vy *= -0.95;
    } else if (ball.y > canvasTopView.height - ball.radius) {
      ball.y = canvasTopView.height - ball.radius;
      ball.vy *= -0.95; // 假设能量损耗是0.05
      ball.vx *= 0.99; // 摩擦力
    }
  }

  function draw(ball: Ball) {
    ball.draw();
  }

  function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvasTopView.width, canvasTopView.height);

    balls.forEach((ball) => {
      // 更新小球的速度
      ball.update();
      // 检测是否碰撞到边界
      checkWalls(ball);
    });

    // 绘制
    balls.forEach(draw);
  }

  function captureMouse(element) {
    let mouse = { x: 0, y: 0, event: null };
    let body_scrollLeft = document.body.scrollLeft;
    let element_scrollLeft = document.documentElement.scrollLeft;
    let body_scrollTop = document.body.scrollTop;
    let element_scrollTop = document.documentElement.scrollTop;
    let offsetLeft = element.offsetLeft;
    let offsetTop = element.offsetTop;

    element.addEventListener(
      "mousemove",
      (e) => {
        let x, y;

        if (e.pageX || e.pageY) {
          x = e.pageX;
          y = e.pageY;
        } else {
          x = e.clientX + body_scrollLeft + element_scrollLeft;
          y = e.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;
        mouse.x = x;
        mouse.y = y;
        mouse.event = e;
      },
      false
    );

    return mouse;
  }

  const init = (dom: HTMLElement, ctxt) => {
    canvasTopView = dom;
    context = ctxt;
    // Canvas中的坐标
    const mouse = captureMouse(canvasTopView);
    // 选中的小球
    let selectedBall: Ball | null = null;

    const getTarget = (bodyId?: string) => {
      if (bodyId) {
        const targetBody = models.filter((body: any) => body._id === bodyId);
        if (targetBody.length) {
          return targetBody[0];
        }
      }
      return null;
    };

    // 拖拽
    canvasTopView.addEventListener(
      "mousedown",
      () => {
        console.log("canvasTopView");
        balls.some((ball) => {
          if (ball.isContainsPoint(mouse.x, mouse.y)) {
            // 记录下选中的小球
            selectedBall = ball;
            console.log("selectedBall", selectedBall);
            // 添加事件来模拟拖拽
            canvasTopView.addEventListener("mousemove", onMouseMove, false);
            canvasTopView.addEventListener("mouseup", onMouseUp, false);
            return true;
          } else if (ball.isContainsPointSector(mouse.x, mouse.y)) {
            selectedBall = ball;
            console.log("isContainsPointSector", ball);
            canvasTopView.addEventListener(
              "mousemove",
              onMouseMoveSector,
              false
            );
            canvasTopView.addEventListener("mouseup", onMouseUpSector, false);
          }
        });

        // 移动
        function onMouseMove() {
          if (!selectedBall) return;
          selectedBall.x = mouse.x;
          selectedBall.y = mouse.y;
          const targetBody = getTarget(selectedBall.id);
          targetBody.position.x = selectedBall.x - 100;
          targetBody.position.z = selectedBall.y - 100;
          selectedBall.vx = 0;
          selectedBall.vy = 0;
        }

        // 旋转
        function onMouseMoveSector() {
          if (!selectedBall) return;
          //还是先算出来canvas坐标
          const CP = convertCoordinate(
            mouse.x,
            mouse.y,
            selectedBall.x,
            selectedBall.y
          );
          const Cx = CP.x;
          const Cy = CP.y;
          const newR = Math.atan2(Cx, Cy);
          selectedBall.rotate = newR;

          const targetBody = getTarget(selectedBall.id);
          targetBody.rotation.y = newR;
        }

        function onMouseUp() {
          selectedBall = null;
          // 清除事件
          canvasTopView.removeEventListener("mousemove", onMouseMove, false);
          canvasTopView.removeEventListener("mouseup", onMouseUp, false);
        }

        function onMouseUpSector() {
          // 清除事件
          canvasTopView.removeEventListener(
            "mousemove",
            onMouseMoveSector,
            false
          );
          canvasTopView.removeEventListener("mouseup", onMouseUpSector, false);
        }
      },
      false
    );
  };

  const createBall = (id: string) => {
    if (!context) {
      console.error("no context");
      return;
    }
    balls.push(
      new Ball(context, {
        x: 100,
        y: 100,
        color: "red",
        id,
      })
    );
  };

  return {
    init,
    animate,
    createBall,
  };
};
