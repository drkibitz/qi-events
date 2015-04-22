/**
 * qi-events 0.0.5
 * http://drkibitz.github.io/qi-events/
 * Copyright (c) 2013-2015 Dr. Kibitz, http://drkibitz.com
 * A no nonsense event API (BASED ON Backbone.Events).
 * built: Tue Apr 21 2015 22:37:59 GMT-0700 (PDT)
 *
 * Backbone.js 0.9.10
 * (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * Backbone may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://backbonejs.org
 */
!function(t,e){"use strict";function n(t,e,n,r,s){var l,i,a;if(!n)return!0;if("string"==typeof n){if(c.test(n))for(l=n.split(c),i=0,a=l.length;a>i;i++)e.call(t,l[i],r,s);return!0}if(Array.isArray(n))for(i=0,a=n.length;a>i;i++)e.call(t,n[i],r,s);else for(var o in n)e.call(t,o,n[o],r)}function r(t,e,n){var r,s=-1,c=t.length,l=e[n],i=e[n+1],a=e[n+2],o=e[n+3];switch(e.length-n){case 0:for(;++s<c;)(r=t[s]).callback.call(r.context);return;case 1:for(;++s<c;)(r=t[s]).callback.call(r.context,l);return;case 2:for(;++s<c;)(r=t[s]).callback.call(r.context,l,i);return;case 3:for(;++s<c;)(r=t[s]).callback.call(r.context,l,i,a);return;case 4:for(;++s<c;)(r=t[s]).callback.call(r.context,l,i,a,o);return;default:for(e=n?Array.prototype.slice.call(e,n):e;++s<c;)(r=t[s]).callback.apply(r.context,e)}}function s(){}var c=/\s+/;s.ALL="all";var l=s.prototype;l.mixin=function(t){return t.on=l.on,t.once=l.once,t.off=l.off,t.trigger=l.trigger,t},l.on=function i(t,e,r){return n(this,i,t,e,r)&&e?(this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push({callback:e,context:r||this}),this):this},l.once=function a(t,e,r){if(!n(this,a,t,e,r)||!e)return this;var s,c=this,l=function(){s||(s=!0,c.off(t,l),e.apply(this,arguments))};return l._callback=e,this.on(t,l,r)},l.off=function o(t,e,r){var s,c,l,i,a,f,h,u;if(!this._events||!n(this,o,t,e,r))return this;if(!t&&!e&&!r)return this._events=null,this;for(i=t?[t]:Object.keys(this._events),a=0,f=i.length;f>a;a++)if(t=i[a],l=this._events[t]){if(this._events[t]=s=[],e||r)for(h=0,u=l.length;u>h;h++)c=l[h],(e&&e!==c.callback&&e!==c.callback._callback||r&&r!==c.context)&&s.push(c);s.length||(this._events[t]=null)}return this},l.trigger=function(t){var e,n=this._events;return n?(e=n[s.ALL],n[t]&&r(n[t],arguments,1),e&&r(e,arguments,0),this):this},e=t.exports=new s,e.Events=s}(module,exports);