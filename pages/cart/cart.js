"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  cartMain();
}
const cartMain = () => "./compoment/cartmain.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cart",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=cart.js.map
