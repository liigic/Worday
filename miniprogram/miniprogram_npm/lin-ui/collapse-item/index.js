import nodeUtil from "../core/utils/node-util";
Component({
  externalClasses: ["l-class", "l-title-class", "l-body-class"],
  relations: {
    "../collapse/index": {
      type: "parent"
    }
  },
  options: {
    multipleSlots: !0,
    pureDataPattern: /^_/
  },
  properties: {
    itemId: {
      type: String,
      value: "default"
    },
    title: {
      type: String,
      value: "默认标题"
    },
    customTitle: {
      type: Boolean,
      value: !1
    },
    disable: {
      type: Boolean,
      value: !1
    },
    animationTime: {
      type: String,
      value: "0.3"
    }
  },
  data: {
    bodyHeight: "0",
    isExpandContent: !1,
    _idDefault: -1
  },
  methods: {
    async onTapTitle() {
      if (this.data.disable) return;
      let t = this.getRelationNodes("../collapse/index");
      await t[0].onTapCollapseItem(this)
    },
    async foldContent() {
      const t = await nodeUtil.getNodeRectFromComponent(this, ".container-body-wrapper");
      this.data.isExpandContent ? (this.setData({
        bodyHeight: t.height + "px"
      }), setTimeout(() => {
        this.setData({
          isExpandContent: !1,
          bodyHeight: "0px"
        })
      }, 20)) : this.setData({
        isExpandContent: !1,
        bodyHeight: "0px"
      })
    },
    async expandContent() {
      const t = await nodeUtil.getNodeRectFromComponent(this, ".container-body-wrapper");
      this.setData({
        isExpandContent: !0,
        bodyHeight: t.height + "px"
      })
    },
    onTransitionend() {
      this.data.isExpandContent && this.setData({
        bodyHeight: "auto"
      })
    }
  }
});