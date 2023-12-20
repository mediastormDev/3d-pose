export default () => {
  const fist = (model: any) => {
    // 右手握拳;
    model.r_fingers["finger_0"].bend = -5;
    model.r_fingers["finger_0"].straddle = -20;
    model.r_fingers["finger_0"].turn = 90;
    model.r_fingers["finger_0"].mid.bend = 15;
    model.r_fingers["finger_0"].tip.bend = 35;

    model.r_fingers["finger_1"].bend = 72;
    model.r_fingers["finger_1"].straddle = 0;
    model.r_fingers["finger_1"].turn = 0;
    model.r_fingers["finger_1"].mid.bend = 104;
    model.r_fingers["finger_1"].tip.bend = 107;

    model.r_fingers["finger_2"].bend = 72;
    model.r_fingers["finger_2"].straddle = 0;
    model.r_fingers["finger_2"].turn = 0;
    model.r_fingers["finger_2"].mid.bend = 104;
    model.r_fingers["finger_2"].tip.bend = 107;

    model.r_fingers["finger_3"].bend = 72;
    model.r_fingers["finger_3"].straddle = 0;
    model.r_fingers["finger_3"].turn = 0;
    model.r_fingers["finger_3"].mid.bend = 104;
    model.r_fingers["finger_3"].tip.bend = 107;

    model.r_fingers["finger_4"].bend = 72;
    model.r_fingers["finger_4"].straddle = 0;
    model.r_fingers["finger_4"].turn = 0;
    model.r_fingers["finger_4"].mid.bend = 104;
    model.r_fingers["finger_4"].tip.bend = 107;
  };

  const thumbsUp = (model: any) => {
    // model.r_fingers["finger_0"].mid.hide();
    // model.r_fingers["finger_0"].tip.hide();
    
    // 点赞
    model.r_fingers["finger_0"].bend = -90;
    model.r_fingers["finger_0"].straddle = -90;
    model.r_fingers["finger_0"].turn = 0;
    model.r_fingers["finger_0"].mid.bend = 10;
    model.r_fingers["finger_0"].tip.bend = 10;

    model.r_fingers["finger_1"].bend = 72;
    model.r_fingers["finger_1"].straddle = 0;
    model.r_fingers["finger_1"].turn = 0;
    model.r_fingers["finger_1"].mid.bend = 104;
    model.r_fingers["finger_1"].tip.bend = 107;

    model.r_fingers["finger_2"].bend = 72;
    model.r_fingers["finger_2"].straddle = 0;
    model.r_fingers["finger_2"].turn = 0;
    model.r_fingers["finger_2"].mid.bend = 104;
    model.r_fingers["finger_2"].tip.bend = 107;

    model.r_fingers["finger_3"].bend = 72;
    model.r_fingers["finger_3"].straddle = 0;
    model.r_fingers["finger_3"].turn = 0;
    model.r_fingers["finger_3"].mid.bend = 104;
    model.r_fingers["finger_3"].tip.bend = 107;

    model.r_fingers["finger_4"].bend = 72;
    model.r_fingers["finger_4"].straddle = 0;
    model.r_fingers["finger_4"].turn = 0;
    model.r_fingers["finger_4"].mid.bend = 104;
    model.r_fingers["finger_4"].tip.bend = 107;

    // // left
    // model.l_fingers["finger_0"].bend = -90;
    // model.l_fingers["finger_0"].straddle = -90;
    // model.l_fingers["finger_0"].turn = 0;
    // model.l_fingers["finger_0"].mid.bend = 10;
    // model.l_fingers["finger_0"].tip.bend = 10;

    // model.l_fingers["finger_1"].bend = 72;
    // model.l_fingers["finger_1"].straddle = 0;
    // model.l_fingers["finger_1"].turn = 0;
    // model.l_fingers["finger_1"].mid.bend = 104;
    // model.l_fingers["finger_1"].tip.bend = 107;

    // model.l_fingers["finger_2"].bend = 72;
    // model.l_fingers["finger_2"].straddle = 0;
    // model.l_fingers["finger_2"].turn = 0;
    // model.l_fingers["finger_2"].mid.bend = 104;
    // model.l_fingers["finger_2"].tip.bend = 107;

    // model.l_fingers["finger_3"].bend = 72;
    // model.l_fingers["finger_3"].straddle = 0;
    // model.l_fingers["finger_3"].turn = 0;
    // model.l_fingers["finger_3"].mid.bend = 104;
    // model.l_fingers["finger_3"].tip.bend = 107;

    // model.l_fingers["finger_4"].bend = 72;
    // model.l_fingers["finger_4"].straddle = 0;
    // model.l_fingers["finger_4"].turn = 0;
    // model.l_fingers["finger_4"].mid.bend = 104;
    // model.l_fingers["finger_4"].tip.bend = 107;
  };

  /**
   * 设置局部姿势
   * @param model 模型
   * @param pose 局部姿势
   */
  const setPartPose = (model: any, pose: string) => {
    switch (pose) {
      case "fist":
        fist(model);
        break;
      case "thumbsUp":
        thumbsUp(model);
        break;

      default:
        break;
    }
  };
  return {
    setPartPose,
  };
};
