import { models } from "./useMannequin";

export class Ball {
  context: any;
  id?: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  constructor(context, options = {}) {
    this.context = context;
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
  }
}

// let man: any = null;
export const balls: Ball[] = [];
// 获取元素
let canvasTopView;
// 获取上下文
let context;

export default () => {
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

  const init = (dom, ctxt) => {
    canvasTopView = dom;
    context = ctxt;
    // Canvas中的坐标
    const mouse = captureMouse(canvasTopView);
    // 选中的小球
    let selectedBall: Ball | null = null;

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
          }
        });

        function onMouseMove() {
          if (!selectedBall) return;
          selectedBall.x = mouse.x;
          selectedBall.y = mouse.y;
          const bodyId = selectedBall.id;
          if (bodyId) {
            const targetBody = models.filter(
              (body: any) => body._id === bodyId
            );
            if (targetBody.length) {
              targetBody[0].position.x = selectedBall.x - 100;
              targetBody[0].position.z = selectedBall.y - 100;
            }
          }
          selectedBall.vx = 0;
          selectedBall.vy = 0;
        }

        function onMouseUp() {
          selectedBall = null;
          // 清除事件
          canvasTopView.removeEventListener("mousemove", onMouseMove, false);
          canvasTopView.removeEventListener("mouseup", onMouseUp, false);
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
