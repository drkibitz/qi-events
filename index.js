/**
 * qi-events 0.0.4
 * http://drkibitz.github.io/qi-events/
 * Copyright (c) 2013 Dr. Kibitz, http://drkibitz.com
 * A no nonsense event API (BASED ON Backbone.Events).
 * built: Sun Sep 08 2013 10:38:44 GMT-0700 (PDT)
 *
 * Backbone.js 0.9.10
 * (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * Backbone may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://backbonejs.org
 */
!function(a,b){"use strict";function c(a,b,c,d,e){var g,h,i;if(!c)return!0;if("string"==typeof c){if(f.test(c))for(g=c.split(f),h=0,i=g.length;i>h;h++)b.call(a,g[h],d,e);return!0}if(Array.isArray(c))for(h=0,i=c.length;i>h;h++)b.call(a,c[h],d,e);else for(var j in c)b.call(a,j,c[j],d)}function d(a,b,c){var d,e=-1,f=a.length,g=b[c],h=b[c+1],i=b[c+2];switch(b.length-c){case 0:for(;++e<f;)(d=a[e]).callback.call(d.context);return;case 1:for(;++e<f;)(d=a[e]).callback.call(d.context,g);return;case 2:for(;++e<f;)(d=a[e]).callback.call(d.context,g,h);return;case 3:for(;++e<f;)(d=a[e]).callback.call(d.context,g,h,i);return;default:for(b=c?Array.prototype.slice.call(b,c):b;++e<f;)(d=a[e]).callback.apply(d.context,b)}}function e(){}b["true"]=a;var f=/\s+/;e.ALL="all";var g=e.prototype;g.mixin=function(a){return a.on=g.on,a.once=g.once,a.off=g.off,a.trigger=g.trigger,a},g.on=function h(a,b,d){return c(this,h,a,b,d)&&b?(this._events||(this._events={}),this._events[a]||(this._events[a]=[]),this._events[a].push({callback:b,context:d||this}),this):this},g.once=function i(a,b,d){if(!c(this,i,a,b,d)||!b)return this;var e,f=this,g=function(){e||(e=!0,f.off(a,g),b.apply(this,arguments))};return g._callback=b,this.on(a,g,d)},g.off=function j(a,b,d){var e,f,g,h,i,k,l,m;if(!this._events||!c(this,j,a,b,d))return this;if(!a&&!b&&!d)return this._events=null,this;for(h=a?[a]:Object.keys(this._events),i=0,k=h.length;k>i;i++)if(a=h[i],g=this._events[a]){if(this._events[a]=e=[],b||d)for(l=0,m=g.length;m>l;l++)f=g[l],(b&&b!==f.callback&&b!==f.callback._callback||d&&d!==f.context)&&e.push(f);e.length||(this._events[a]=null)}return this},g.trigger=function(a){var b,c=this._events;return c?(b=c[e.ALL],c[a]&&d(c[a],arguments,1),b&&d(b,arguments,0),this):this},a=module.exports=new e,a.Events=e}({},function(){return this}());