"use strict";
const common_vendor = require("../../common/vendor.js");
const services_hot = require("../../services/hot.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "hot",
  props: {
    type: null
  },
  setup(__props) {
    const query = __props;
    const urlMap = [
      { type: "1", title: "特惠推荐", url: "/hot/preference" },
      { type: "2", title: "爆款推荐", url: "/hot/inVogue" },
      { type: "3", title: "一站买全", url: "/hot/oneStop" },
      { type: "4", title: "新鲜好物", url: "/hot/new" }
    ];
    const currurlMap = urlMap.find((v) => v.type === query.type);
    common_vendor.index.setNavigationBarTitle({ title: currurlMap.title });
    const bannerList = common_vendor.ref("");
    const subTypes = common_vendor.ref([]);
    const activeIndex = common_vendor.ref(0);
    const getHotRecommentAPI = async () => {
      const rs = await services_hot.getHotRecommendAPI(currurlMap.url, {
        page: 30,
        pageSize: 10
      });
      bannerList.value = rs.result.bannerPicture;
      subTypes.value = rs.result.subTypes;
    };
    common_vendor.onLoad(() => {
      getHotRecommentAPI();
    });
    const onScrollTolower = async () => {
      const currsubTypes = subTypes.value[activeIndex.value];
      if (currsubTypes.goodsItems.page < currsubTypes.goodsItems.pages) {
        currsubTypes.goodsItems.page++;
      } else {
        currsubTypes.finish = true;
        return common_vendor.index.showToast({ icon: "none", title: "没有数据了" });
      }
      currsubTypes.goodsItems.page++;
      const rs = await services_hot.getHotRecommendAPI(currurlMap.url, {
        subType: currsubTypes.id,
        page: currsubTypes.goodsItems.page,
        pageSize: currsubTypes.goodsItems.pageSize
      });
      const newsubTypes = rs.result.subTypes[activeIndex.value];
      currsubTypes.goodsItems.items.push(...newsubTypes.goodsItems.items);
    };
    return (_ctx, _cache) => {
      return {
        a: bannerList.value,
        b: common_vendor.f(subTypes.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id,
            c: index === activeIndex.value ? 1 : "",
            d: common_vendor.o(($event) => activeIndex.value = index, item.id)
          };
        }),
        c: common_vendor.f(subTypes.value, (item, index, i0) => {
          return {
            a: common_vendor.f(item.goodsItems.items, (goods, k1, i1) => {
              return {
                a: goods.picture,
                b: common_vendor.t(goods.desc),
                c: common_vendor.t(goods.price),
                d: goods.id,
                e: `/pages/goods/goods?id=${goods.id}`
              };
            }),
            b: common_vendor.t(item.finish ? "没有数据了" : "正在加载中"),
            c: item.id,
            d: activeIndex.value === index,
            e: common_vendor.o(onScrollTolower, item.id)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pages/hot/hot.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=hot.js.map
