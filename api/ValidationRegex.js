export default (str, ruleName, ruleMsg) => {
  const res = app(str, ruleName, ruleMsg);
  if (res) {
    // console.log(str, ruleName, ruleMsg, res);
    alert(res);
    return false;
  } else {
    return true;
  }
};

const app = (str, ruleName, ruleMsg = null) => {
  if (typeof str == typeof "") {
    if (!(Rules[ruleName] && Rules[ruleName].test(str))) {
      if (ruleMsg) {
        return ruleMsg;
      } else if (RulesMsg[ruleName]) {
        return RulesMsg[ruleName];
      } else {
        return "錯誤";
      }
    }
  } else if (ruleName == "required") {
    if (ruleMsg) {
      return ruleMsg;
    } else if (RulesMsg[ruleName]) {
      return RulesMsg[ruleName];
    } else {
      return "錯誤";
    }
  } else if (ruleName == "same" && typeof str == typeof true && !str) {
    if (ruleMsg) {
      return ruleMsg;
    } else if (RulesMsg[ruleName]) {
      return RulesMsg[ruleName];
    } else {
      return "錯誤";
    }
  }
};

const Rules = {
  required: /^\S*(?=\S{1,})\S*$/,
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/,
};
const RulesMsg = {
  required: "必填未填",
  email: "電子信箱格格是錯誤",
  password: "密碼強度不符合，須包含大寫、小寫與數字並且至少6位數",
  same: "重複參數不相符",
};
