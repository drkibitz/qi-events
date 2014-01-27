/**
 * qi-events 0.0.5
 * http://drkibitz.github.io/qi-events/
 * Copyright (c) 2013 Dr. Kibitz, http://drkibitz.com
 * A no nonsense event API (BASED ON Backbone.Events).
 * built: Sun Jan 26 2014 23:44:53 GMT-0800 (PST)
 *
 * Backbone.js 0.9.10
 * (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * Backbone may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://backbonejs.org
 */
!function(t,e){"use strict";function n(t,e,n,r,s){var c,l,a;if(!n)return!0;if("string"==typeof n){if(i.test(n))for(c=n.split(i),l=0,a=c.length;a>l;l++)e.call(t,c[l],r,s);return!0}if(Array.isArray(n))for(l=0,a=n.length;a>l;l++)e.call(t,n[l],r,s);else for(var o in n)e.call(t,o,n[o],r)}function r(t,e,n){var r,s=-1,i=t.length,c=e[n],l=e[n+1],a=e[n+2];switch(e.length-n){case 0:for(;++s<i;)(r=t[s]).callback.call(r.context);return;case 1:for(;++s<i;)(r=t[s]).callback.call(r.context,c);return;case 2:for(;++s<i;)(r=t[s]).callback.call(r.context,c,l);return;case 3:for(;++s<i;)(r=t[s]).callback.call(r.context,c,l,a);return;default:for(e=n?Array.prototype.slice.call(e,n):e;++s<i;)(r=t[s]).callback.apply(r.context,e)}}function s(){}var i=/\s+/;s.ALL="all";var c=s.prototype;c.mixin=function(t){return t.on=c.on,t.once=c.once,t.off=c.off,t.trigger=c.trigger,t},c.on=function l(t,e,r){return n(this,l,t,e,r)&&e?(this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push({callback:e,context:r||this}),this):this},c.once=function a(t,e,r){if(!n(this,a,t,e,r)||!e)return this;var s,i=this,c=function(){s||(s=!0,i.off(t,c),e.apply(this,arguments))};return c._callback=e,this.on(t,c,r)},c.off=function o(t,e,r){var s,i,c,l,a,f,h,u;if(!this._events||!n(this,o,t,e,r))return this;if(!t&&!e&&!r)return this._events=null,this;for(l=t?[t]:Object.keys(this._events),a=0,f=l.length;f>a;a++)if(t=l[a],c=this._events[t]){if(this._events[t]=s=[],e||r)for(h=0,u=c.length;u>h;h++)i=c[h],(e&&e!==i.callback&&e!==i.callback._callback||r&&r!==i.context)&&s.push(i);s.length||(this._events[t]=null)}return this},c.trigger=function(t){var e,n=this._events;return n?(e=n[s.ALL],n[t]&&r(n[t],arguments,1),e&&r(e,arguments,0),this):this},e=t.exports=new s,e.Events=s}(module,exports);