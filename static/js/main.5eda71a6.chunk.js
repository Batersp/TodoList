(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(7),o=n.n(c),r=(n(14),n(8)),l=n(1),s=n(2),u=n(3),d=(n(15),function(e){var t=Object(a.useState)(""),n=Object(u.a)(t,2),c=n[0],o=n[1],r=Object(a.useState)(!1),l=Object(u.a)(r,2),s=l[0],d=l[1],b=function(){c.trim()?e.addTask(e.todoListId,c):d(!0),o("")},m=function(t,n){e.changeFilter(t,n)},f="all"===e.filter?"active-filter":"",j="active"===e.filter?"active-filter":"",O="completed"===e.filter?"active-filter":"",v=s?"error":"",h=e.tasks.length?e.tasks.map((function(t){var n=t.isDone?"is-done":"";return i.a.createElement("li",{key:t.id},i.a.createElement("input",{type:"checkbox",checked:t.isDone,onChange:function(n){e.changeTasksStatus(e.todoListId,t.id,n.currentTarget.checked)}}),i.a.createElement("span",{className:n},t.title),i.a.createElement("button",{onClick:function(){return n=e.todoListId,a=t.id,void e.removeTask(n,a);var n,a}},"del"))})):i.a.createElement("span",null,"\u0412 \u0441\u043f\u0438\u0441\u043a\u0435 \u043d\u0435\u0442 \u0437\u0430\u0434\u0430\u0447");return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("h3",null,e.title,i.a.createElement("button",{onClick:function(){e.removeTodoList(e.todoListId)}},"x")),i.a.createElement("div",null,i.a.createElement("input",{value:c,onChange:function(e){o(e.currentTarget.value),s&&d(!1)},onKeyPress:function(e){"Enter"===e.key&&b()},className:v}),i.a.createElement("button",{onClick:b},"+"),s&&i.a.createElement("div",{className:"error-message"},"Title is required")),i.a.createElement("ul",null,h),i.a.createElement("div",null,i.a.createElement("button",{className:f,onClick:function(){return m(e.todoListId,"all")}},"All"),i.a.createElement("button",{className:j,onClick:function(){return m(e.todoListId,"active")}},"Active"),i.a.createElement("button",{className:O,onClick:function(){return m(e.todoListId,"completed")}},"Completed"))))}),b=n(18);var m=function(){var e,t=Object(b.a)(),n=Object(b.a)(),c=Object(a.useState)([{id:t,title:"What to learn",filter:"all"},{id:n,title:"What to buy",filter:"all"}]),o=Object(u.a)(c,2),m=o[0],f=o[1],j=Object(a.useState)((e={},Object(s.a)(e,t,[{id:Object(b.a)(),title:"HTML&CSS",isDone:!0},{id:Object(b.a)(),title:"JS",isDone:!0},{id:Object(b.a)(),title:"ReactJS",isDone:!1},{id:Object(b.a)(),title:"Rest API",isDone:!1},{id:Object(b.a)(),title:"GraphQL",isDone:!1}]),Object(s.a)(e,n,[{id:Object(b.a)(),title:"HTML&CSS2",isDone:!0},{id:Object(b.a)(),title:"JS2",isDone:!0},{id:Object(b.a)(),title:"ReactJS2",isDone:!1},{id:Object(b.a)(),title:"Rest API2",isDone:!1},{id:Object(b.a)(),title:"GraphQL2",isDone:!1}]),e)),O=Object(u.a)(j,2),v=O[0],h=O[1],k=function(e){f(m.filter((function(t){return t.id!==e}))),delete v[e]},p=function(e,t){h(Object(l.a)(Object(l.a)({},v),{},Object(s.a)({},e,v[e].filter((function(e){return t!==e.id})))))},E=function(e,t){var n={id:Object(b.a)(),title:t,isDone:!1};h(Object(l.a)(Object(l.a)({},v),{},Object(s.a)({},e,[n].concat(Object(r.a)(v[e])))))},D=function(e,t){f(m.map((function(n){return e===n.id?Object(l.a)(Object(l.a)({},n),{},{filter:t}):n})))},g=function(e,t,n){h(Object(l.a)(Object(l.a)({},v),{},Object(s.a)({},e,v[e].map((function(e){return e.id===t?Object(l.a)(Object(l.a)({},e),{},{isDone:n}):e})))))};return i.a.createElement("div",{className:"App"},m.map((function(e){var t=v[e.id];return"active"===e.filter&&(t=v[e.id].filter((function(e){return!1===e.isDone}))),"completed"===e.filter&&(t=v[e.id].filter((function(e){return!0===e.isDone}))),i.a.createElement(d,{key:e.id,todoListId:e.id,title:e.title,tasks:t,filter:e.filter,removeTask:p,changeFilter:D,addTask:E,changeTasksStatus:g,removeTodoList:k})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.5eda71a6.chunk.js.map