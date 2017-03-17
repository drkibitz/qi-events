/**
 * qi-events 1.0.2
 * http://drkibitz.github.io/qi-events/
 * Copyright (c) 2013-2017 Dr. Kibitz, http://drkibitz.com
 * A no nonsense event API (BASED ON Backbone.Events).
 * built: Thu Mar 16 2017 23:12:17 GMT-0700 (PDT)
 *
 * Backbone.js 0.9.10
 * (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * Backbone may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://backbonejs.org
 */
!function(t,e){!function(t,e){"use strict";function n(t,e,n,r,c){var s,l,a;if(!n)return!0;if("string"==typeof n){if(i.test(n))for(s=n.split(i),l=0,a=s.length;l<a;l++)e.call(t,s[l],r,c);return!0}if(Array.isArray(n))for(l=0,a=n.length;l<a;l++)e.call(t,n[l],r,c);else for(var o in n)e.call(t,o,n[o],r)}function r(t,e,n){var r,c=-1,i=t.length,s=e[n],l=e[n+1],a=e[n+2],o=e[n+3];switch(e.length-n){case 0:for(;++c<i;)(r=t[c]).callback.call(r.context);return;case 1:for(;++c<i;)(r=t[c]).callback.call(r.context,s);return;case 2:for(;++c<i;)(r=t[c]).callback.call(r.context,s,l);return;case 3:for(;++c<i;)(r=t[c]).callback.call(r.context,s,l,a);return;case 4:for(;++c<i;)(r=t[c]).callback.call(r.context,s,l,a,o);return;default:for(e=n?Array.prototype.slice.call(e,n):e;++c<i;)(r=t[c]).callback.apply(r.context,e)}}function c(){}var i=/\s+/;c.ALL="all";var s=c.prototype;s.mixin=function(t){return t.on=s.on,t.once=s.once,t.off=s.off,t.trigger=s.trigger,t},s.on=function t(e,r,c){return n(this,t,e,r,c)&&r?(this._events||(this._events={}),this._events[e]||(this._events[e]=[]),this._events[e].push({callback:r,context:c||this}),this):this},s.once=function t(e,r,c){if(!n(this,t,e,r,c)||!r)return this;var i,s=this,l=function(){i||(i=!0,s.off(e,l),r.apply(this,arguments))};return l._callback=r,this.on(e,l,c)},s.off=function t(e,r,c){var i,s,l,a,o,f,h,u;if(!this._events||!n(this,t,e,r,c))return this;if(!e&&!r&&!c)return this._events=null,this;for(a=e?[e]:Object.keys(this._events),o=0,f=a.length;o<f;o++)if(e=a[o],l=this._events[e]){if(this._events[e]=i=[],r||c)for(h=0,u=l.length;h<u;h++)s=l[h],(r&&r!==s.callback&&r!==s.callback._callback||c&&c!==s.context)&&i.push(s);i.length||(this._events[e]=null)}return this},s.trigger=function(t){var e,n=this._events;return n?(e=n[c.ALL],n[t]&&r(n[t],arguments,1),e&&r(e,arguments,0),this):this},e=t.exports=new c,e.Events=c}(module,t),e.events=t}({},function(){return this}());