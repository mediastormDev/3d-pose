import { ref } from "vue";
import { createBall, balls } from "./useTopView";
import UseMannequin, { models } from "./useMannequin";

const { createBody } = UseMannequin();

const bodys = ref<any[]>([]);

export default () => {
  const face2face = () => {
    const selected = balls.filter((ball) => ball.selected);
    if (selected.length !== 2) {
      alert("Please select two balls");
      return;
    }
    const [ball1, ball2] = selected;
    console.log(ball1.id, ball2.id);
    const bodys = models.filter((model) => {
      return model._id === ball1.id || model._id === ball2.id;
    });
    const [body1, body2] = bodys;
    console.log(body1.position, body2.position);
    const radius = Math.atan2(
      body2.position.x - body1.position.x,
      body2.position.z - body1.position.z
    );

    const radius2 = Math.atan2(
      body1.position.x - body2.position.x,
      body1.position.z - body2.position.z
    );

    body1.rotation.y = radius2 + Math.PI;
    body2.rotation.y = radius + Math.PI;
  };

  const back2back = () => {
    const selected = balls.filter((ball) => ball.selected);
    if (selected.length !== 2) {
      alert("Please select two balls");
      return;
    }
    const [ball1, ball2] = selected;
    console.log(ball1.id, ball2.id);
    const bodys = models.filter((model) => {
      return model._id === ball1.id || model._id === ball2.id;
    });
    const [body1, body2] = bodys;
    console.log(body1.position, body2.position);
    const radius = Math.atan2(
      body2.position.x - body1.position.x,
      body2.position.z - body1.position.z
    );

    const radius2 = Math.atan2(
      body1.position.x - body2.position.x,
      body1.position.z - body2.position.z
    );

    body1.rotation.y = radius2;
    body2.rotation.y = radius;
  };

  const face2back = () => {
    const selected = balls.filter((ball) => ball.selected);
    if (selected.length !== 2) {
      alert("Please select two balls");
      return;
    }
    const [ball1, ball2] = selected;
    console.log(ball1.id, ball2.id);
    const bodys = models.filter((model) => {
      return model._id === ball1.id || model._id === ball2.id;
    });
    const [body1, body2] = bodys;
    console.log(body1.position, body2.position);
    const radius = Math.atan2(
      body2.position.x - body1.position.x,
      body2.position.z - body1.position.z
    );

    const radius2 = Math.atan2(
      body1.position.x - body2.position.x,
      body1.position.z - body2.position.z
    );

    body1.rotation.y = radius2 + Math.PI;
    body2.rotation.y = radius;
  };

  const addBody = (id: string, type: string) => {
    bodys.value.push({ id, type, rotation: 0 });
    createBall(id);
    createBody(id, type);
  };

  return {
    bodys,
    addBody,
    face2face,
    back2back,
    face2back,
  };
};
