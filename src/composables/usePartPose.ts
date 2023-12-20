export default () => {
  const fist = (model: any) => {
    // 右手握拳;
    model.r_fingers["finger_0"].bend = 4.5;
    model.r_fingers["finger_0"].straddle = -30;
    model.r_fingers["finger_0"].turn = 90;
    model.r_fingers["finger_0"].mid.bend = 90;
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

  const finger1 = (model: any) => {
    model.r_fingers["finger_0"].bend = 4.499900562921604;
    model.r_fingers["finger_0"].straddle = -29.99823578996974;
    model.r_fingers["finger_0"].turn = 89.99999999999999;
    model.r_fingers["finger_0"].mid.bend = 89.99999999999999;
    model.r_fingers["finger_0"].tip.bend = 35;
    model.r_fingers["finger_1"].bend = -9.951482453715611;
    model.r_fingers["finger_1"].straddle = 0.09312497791101489;
    model.r_fingers["finger_1"].turn = 0.2935467489416175;
    model.r_fingers["finger_1"].mid.bend = 0.03324942290796243;
    model.r_fingers["finger_1"].tip.bend = 0.06617826223419987;
    model.r_fingers["finger_2"].bend = 71.99957396405568;
    model.r_fingers["finger_2"].straddle = -0.010622734021649446;
    model.r_fingers["finger_2"].turn = -2.3295078633745372e-18;
    model.r_fingers["finger_2"].mid.bend = 104.00000000000001;
    model.r_fingers["finger_2"].tip.bend = 107;
    model.r_fingers["finger_3"].bend = 71.64336579462223;
    model.r_fingers["finger_3"].straddle = -2.6571052269848905;
    model.r_fingers["finger_3"].turn = 5.969958559984784e-16;
    model.r_fingers["finger_3"].mid.bend = 104.00000000000001;
    model.r_fingers["finger_3"].tip.bend = 107;
    model.r_fingers["finger_4"].bend = 61.19954887983764;
    model.r_fingers["finger_4"].straddle = 2.3449302128904765;
    model.r_fingers["finger_4"].turn = 0;
    model.r_fingers["finger_4"].mid.bend = 104.00000000000001;
    model.r_fingers["finger_4"].tip.bend = 107;
  };

  const finger2 = (model: any) => {
    model.r_fingers["finger_0"].bend = 4.499900562921604;
    model.r_fingers["finger_0"].straddle = -29.99823578996974;
    model.r_fingers["finger_0"].turn = 89.99999999999999;
    model.r_fingers["finger_0"].mid.bend = 89.99999999999999;
    model.r_fingers["finger_0"].tip.bend = 35;
    model.r_fingers["finger_1"].bend = -10.12478038170727;
    model.r_fingers["finger_1"].straddle = -10.725432984864307;
    model.r_fingers["finger_1"].turn = 0.2988169334599289;
    model.r_fingers["finger_1"].mid.bend = 0.03324942290796243;
    model.r_fingers["finger_1"].tip.bend = 0.06617826223419987;
    model.r_fingers["finger_2"].bend = -9.965948653046121;
    model.r_fingers["finger_2"].straddle = -0.003332972450944763;
    model.r_fingers["finger_2"].turn = -0.010518462784871046;
    model.r_fingers["finger_2"].mid.bend = 0.017990112304850727;
    model.r_fingers["finger_2"].tip.bend = 0.024916648865104005;
    model.r_fingers["finger_3"].bend = 71.64336579462223;
    model.r_fingers["finger_3"].straddle = -2.657105226984891;
    model.r_fingers["finger_3"].turn = 1.1939917119969568e-15;
    model.r_fingers["finger_3"].mid.bend = 104.00000000000001;
    model.r_fingers["finger_3"].tip.bend = 107;
    model.r_fingers["finger_4"].bend = 61.19954887983764;
    model.r_fingers["finger_4"].straddle = 2.344930212890478;
    model.r_fingers["finger_4"].turn = 0;
    model.r_fingers["finger_4"].mid.bend = 104.00000000000001;
    model.r_fingers["finger_4"].tip.bend = 107;
  };

  const finger3 = (model: any) => {
    model.r_fingers["finger_0"].bend = 4.499999997870571;
    model.r_fingers["finger_0"].straddle = -30.000008179913518;
    model.r_fingers["finger_0"].turn = 90.00000000000007;
    model.r_fingers["finger_0"].mid.bend = 89.99999999999999;
    model.r_fingers["finger_0"].tip.bend = 35;
    model.r_fingers["finger_1"].bend = -10.12478038170727;
    model.r_fingers["finger_1"].straddle = -10.725432984864307;
    model.r_fingers["finger_1"].turn = 0.2988169334599289;
    model.r_fingers["finger_1"].mid.bend = 0.03324942290796243;
    model.r_fingers["finger_1"].tip.bend = 0.06617826223419987;
    model.r_fingers["finger_2"].bend = -9.965948653046121;
    model.r_fingers["finger_2"].straddle = -0.003332972450944763;
    model.r_fingers["finger_2"].turn = -0.010518462784871046;
    model.r_fingers["finger_2"].mid.bend = 0.017990112304850727;
    model.r_fingers["finger_2"].tip.bend = 0.024916648865104005;
    model.r_fingers["finger_3"].bend = -9.950276054796772;
    model.r_fingers["finger_3"].straddle = 5.837317555135125;
    model.r_fingers["finger_3"].turn = 1.4658549936572176;
    model.r_fingers["finger_3"].mid.bend = 0.11324697732945575;
    model.r_fingers["finger_3"].tip.bend = 0.06756235659137624;
    model.r_fingers["finger_4"].bend = 71.96523092923441;
    model.r_fingers["finger_4"].straddle = -1.3493784559483408;
    model.r_fingers["finger_4"].turn = 2.982597130602293e-16;
    model.r_fingers["finger_4"].mid.bend = 104.00000000000001;
    model.r_fingers["finger_4"].tip.bend = 107;
  };

  const finger4 = (model: any) => {
    model.r_fingers["finger_0"].bend = 4.499999997870562;
    model.r_fingers["finger_0"].straddle = -30.000008179913518;
    model.r_fingers["finger_0"].turn = 90.0000000000001;
    model.r_fingers["finger_0"].mid.bend = 89.99999999999999;
    model.r_fingers["finger_0"].tip.bend = 35;
    model.r_fingers["finger_1"].bend = -10.12478038170727;
    model.r_fingers["finger_1"].straddle = -10.725432984864307;
    model.r_fingers["finger_1"].turn = 0.2988169334599289;
    model.r_fingers["finger_1"].mid.bend = 0.03324942290796243;
    model.r_fingers["finger_1"].tip.bend = 0.06617826223419987;
    model.r_fingers["finger_2"].bend = -9.965948653046121;
    model.r_fingers["finger_2"].straddle = -0.003332972450944763;
    model.r_fingers["finger_2"].turn = -0.010518462784871046;
    model.r_fingers["finger_2"].mid.bend = 0.017990112304850727;
    model.r_fingers["finger_2"].tip.bend = 0.024916648865104005;
    model.r_fingers["finger_3"].bend = -9.950276054796769;
    model.r_fingers["finger_3"].straddle = 5.837317555135122;
    model.r_fingers["finger_3"].turn = 1.4658549936572176;
    model.r_fingers["finger_3"].mid.bend = 0.11324697732945577;
    model.r_fingers["finger_3"].tip.bend = 0.06756235659137626;
    model.r_fingers["finger_4"].bend = -10.158162370564444;
    model.r_fingers["finger_4"].straddle = 10.90108054294608;
    model.r_fingers["finger_4"].turn = -1.3616901077022658;
    model.r_fingers["finger_4"].mid.bend = 0.0003323853015744091;
    model.r_fingers["finger_4"].tip.bend = 0.02227072417739739;
  };

  const finger5 = (model: any) => {
    model.r_fingers["finger_0"].bend = -34.81513321173989;
    model.r_fingers["finger_0"].straddle = -0.02881691569615784;
    model.r_fingers["finger_0"].turn = 77.74768370242599;
    model.r_fingers["finger_0"].mid.bend = 11.29315093159676;
    model.r_fingers["finger_0"].tip.bend = 35;
    model.r_fingers["finger_1"].bend = -10.12478038170727;
    model.r_fingers["finger_1"].straddle = -10.725432984864307;
    model.r_fingers["finger_1"].turn = 0.2988169334599289;
    model.r_fingers["finger_1"].mid.bend = 0.03324942290796243;
    model.r_fingers["finger_1"].tip.bend = 0.06617826223419987;
    model.r_fingers["finger_2"].bend = -9.965948653046121;
    model.r_fingers["finger_2"].straddle = -0.003332972450944763;
    model.r_fingers["finger_2"].turn = -0.010518462784871046;
    model.r_fingers["finger_2"].mid.bend = 0.017990112304850727;
    model.r_fingers["finger_2"].tip.bend = 0.024916648865104005;
    model.r_fingers["finger_3"].bend = -9.950276054796769;
    model.r_fingers["finger_3"].straddle = 5.837317555135122;
    model.r_fingers["finger_3"].turn = 1.4658549936572176;
    model.r_fingers["finger_3"].mid.bend = 0.11324697732945577;
    model.r_fingers["finger_3"].tip.bend = 0.06756235659137626;
    model.r_fingers["finger_4"].bend = -10.158162370564444;
    model.r_fingers["finger_4"].straddle = 10.90108054294608;
    model.r_fingers["finger_4"].turn = -1.3616901077022658;
    model.r_fingers["finger_4"].mid.bend = 0.0003323853015744091;
    model.r_fingers["finger_4"].tip.bend = 0.02227072417739739;
  };

  const finger6 = (model: any) => {
    model.r_fingers["finger_0"].bend = -40.2758270502081;
    model.r_fingers["finger_0"].straddle = -25.504036336355615;
    model.r_fingers["finger_0"].turn = 90.00000000000136;
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
    model.r_fingers["finger_4"].bend = -10.12170684157502;
    model.r_fingers["finger_4"].straddle = 10.048935636878246;
    model.r_fingers["finger_4"].turn = 1.0901612786691093;
    model.r_fingers["finger_4"].mid.bend = 0.0666136294603116;
    model.r_fingers["finger_4"].tip.bend = 10;
  };

  const finger7 = (model: any) => {
    model.r_fingers["finger_0"].bend = 1;
    model.r_fingers["finger_0"].straddle = -36;
    model.r_fingers["finger_0"].turn = 90;
    model.r_fingers["finger_0"].mid.bend = 0;
    model.r_fingers["finger_0"].tip.bend = 10;

    model.r_fingers["finger_1"].bend = 80;
    model.r_fingers["finger_1"].straddle = 0;
    model.r_fingers["finger_1"].turn = 0;
    model.r_fingers["finger_1"].mid.bend = 15;
    model.r_fingers["finger_1"].tip.bend = 10;

    model.r_fingers["finger_2"].bend = 78;
    model.r_fingers["finger_2"].straddle = -6;
    model.r_fingers["finger_2"].turn = 1;
    model.r_fingers["finger_2"].mid.bend = 16;
    model.r_fingers["finger_2"].tip.bend = 10;

    model.r_fingers["finger_3"].bend = 70;
    model.r_fingers["finger_3"].straddle = -14;
    model.r_fingers["finger_3"].turn = -5;
    model.r_fingers["finger_3"].mid.bend = 14;
    model.r_fingers["finger_3"].tip.bend = 10;

    model.r_fingers["finger_4"].bend = 64;
    model.r_fingers["finger_4"].straddle = -19;
    model.r_fingers["finger_4"].turn = -6;
    model.r_fingers["finger_4"].mid.bend = 15;
    model.r_fingers["finger_4"].tip.bend = 10;
  };

  const finger8 = (model: any) => {
    model.r_fingers["finger_0"].bend = -40.2758270502081;
    model.r_fingers["finger_0"].straddle = -25.504036336355615;
    model.r_fingers["finger_0"].turn = 90.00000000000136;
    model.r_fingers["finger_0"].mid.bend = 10;
    model.r_fingers["finger_0"].tip.bend = 10;
    model.r_fingers["finger_1"].bend = -9.951482453715611;
    model.r_fingers["finger_1"].straddle = 0.09312497791101489;
    model.r_fingers["finger_1"].turn = 0.2935467489416175;
    model.r_fingers["finger_1"].mid.bend = 0.03324942290796243;
    model.r_fingers["finger_1"].tip.bend = 0.06617826223419987;
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

  const finger9 = (model: any) => {
    model.r_fingers["finger_0"].bend = 4.767659883543907;
    model.r_fingers["finger_0"].straddle = -29.939297465541816;
    model.r_fingers["finger_0"].turn = 89.99999999999993;
    model.r_fingers["finger_0"].mid.bend = 64.77899655699753;
    model.r_fingers["finger_0"].tip.bend = 35;
    model.r_fingers["finger_1"].bend = -9.931045800447427;
    model.r_fingers["finger_1"].straddle = -0;
    model.r_fingers["finger_1"].turn = -0;
    model.r_fingers["finger_1"].mid.bend = 54.95028199255522;
    model.r_fingers["finger_1"].tip.bend = 61.82148379087475;
    model.r_fingers["finger_2"].bend = 71.95618119367379;
    model.r_fingers["finger_2"].straddle = -2.140195483548792;
    model.r_fingers["finger_2"].turn = 7.95693713909972e-16;
    model.r_fingers["finger_2"].mid.bend = 104.00000000000001;
    model.r_fingers["finger_2"].tip.bend = 107;
    model.r_fingers["finger_3"].bend = 71.42269310799188;
    model.r_fingers["finger_3"].straddle = 0.7313789351466449;
    model.r_fingers["finger_3"].turn = -1.491006480918304e-16;
    model.r_fingers["finger_3"].mid.bend = 104.00000000000001;
    model.r_fingers["finger_3"].tip.bend = 107;
    model.r_fingers["finger_4"].bend = 69.94237733998386;
    model.r_fingers["finger_4"].straddle = 7.213254463639377;
    model.r_fingers["finger_4"].turn = 4.007409267432515e-16;
    model.r_fingers["finger_4"].mid.bend = 104.00000000000001;
    model.r_fingers["finger_4"].tip.bend = 107;
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
      case "finger1":
        finger1(model);
        break;
      case "finger2":
        finger2(model);
        break;
      case "finger3":
        finger3(model);
        break;
      case "finger4":
        finger4(model);
        break;
      case "finger5":
        finger5(model);
        break;
      case "finger6":
        finger6(model);
        break;
      case "finger7":
        finger7(model);
        break;
      case "finger8":
        finger8(model);
        break;
      case "finger9":
        finger9(model);
        break;

      default:
        break;
    }
  };
  return {
    setPartPose,
  };
};
