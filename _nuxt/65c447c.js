(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{474:function(t,e,o){"use strict";o.r(e);var n=o(2),r=(o(35),{fetch:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.store,e.next=3,o.dispatch("blogs/fetchBlogs");case 3:case"end":return e.stop()}}),e)})))()},methods:{goTo:function(){this.$router.push("/blogs/add")}},computed:{blogs:function(){return this.$store.state.blogs.blogs}}}),c=o(41),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("uiAddButton",{attrs:{text:"Add Blog"},on:{click:function(e){return t.goTo()}}}),t._v(" "),t.blogs.length?t._e():o("uiEmpty",{attrs:{imgSrc:"blogs/no-blog.png",caption:"No blogs have been added yet."}}),t._v(" "),o("blogsBlogList",{attrs:{blogs:t.blogs}})],1)}),[],!1,null,null,null);e.default=component.exports}}]);