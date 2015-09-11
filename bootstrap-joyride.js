(function() {
  'use strict';

  var $, cookie;

  $ = jQuery;

  cookie = function(key, value, options) {
    var days, decode, result, t;
    if (arguments.length > 1 && String(value) !== "[object Object]") {
      options = jQuery.extend({}, options);
      if (value == null) {
        options.expires = -1;
      }
      if (typeof options.expires === "number") {
        days = options.expires;
        t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }
      value = String(value);
      return (document.cookie = [encodeURIComponent(key), "=", (options.raw ? value : encodeURIComponent(value)), (options.expires ? "; expires=" + options.expires.toUTCString() : ""), (options.path ? "; path=" + options.path : ""), (options.domain ? "; domain=" + options.domain : ""), (options.secure ? "; secure" : "")].join(""));
    }
    options = value || {};
    result = void 0;
    decode = (options.raw ? function(s) {
      return s;
    } : decodeURIComponent);
    return ((result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null);
  };
  var BootJoyride = function (element, options) {
    this.$current_target =
    this.$current_popover =
    this.$element =
    this.current_step =
    this.options = null

    this.init(element, options);
  }
    if (!$.fn.popover) throw new Error('Boot-Joyride requires popover.js')

  BootJoyride.DEFAULTS = {
    tipContent: '#JoyrideTipContent',
    cookieMonster: false,
    cookieName: 'bootstrapJoyride',
    cookieDomain: false,
    preRideCallback: $.noop,
    postRideCallback: $.noop,
    postStepCallback: $.noop,
    nextOnClose: false,
    debug: false,
    additionalPopoverClass: null
  };
  BootJoyride.prototype.init = function(element, options) {
    this.options = $.extend({}, this.getDefaults(), options);
    this.$element = $(element);
    var self = this;
    var $tips, first_step;
    var $tipContents = $();
    var $tipContent = $(this.options.tipContent).first();
    if ($tipContent == null) {
      this.log("can't find tipContent from selector: " + this.options.tipContent);
    }
    $tips = $tipContent.find('li');
    this.$element.data("tips", $tips);
    first_step = this.currentStep();
    this.log("first step: " + first_step);
    if (first_step > $tips.length) {
      this.log('tour already completed, skipping');
      return;
    }
    $tips.each(function(idx) {
      var $li, $target, target, tip_data;
      if (idx < (first_step - 1)) {
        self.log("skipping step: " + (idx + 1));
        return;
      }
      $li = $(this);
      tip_data = $li.data();
      target = tip_data['target'];
      if (target == null) {
        return;
      }
      
      // Make target encapsulated to original context
      $target = $(target, self.$element).first();
      if (!$target.length) {
        $target = $(target).first();
        if (!$target.length) {
          self.log("no target found: " + target);
          return;
        }
      }
      var titleIcon = "";
      if (tip_data['titleiconclass']) {
        titleIcon = "<span class=\""+tip_data['titleiconclass']+"\"></span>&nbsp;";
      }
      $target.popover({
        html : true,
        trigger: 'manual',
        title: tip_data['title'] ? titleIcon + tip_data['title'] + "  <a class=\"tour-tip-close close\" data-touridx=\"" + (idx + 1) + "\">&times;</a>" : null,
        content: "<p>" + ($li.html()) + "</p><p style=\"text-align: right\"><a href=\"#\" class=\"tour-tip-next btn\" data-touridx=\"" + (idx + 1) + "\">" + ((idx + 1) < $tips.length ? 'Next <i class="icon-chevron-right"></i>' : '<i class="icon-ok"></i> Done') + "</a></p>",
        placement: tip_data['placement'] || 'right',
        container: tip_data['container'] ? $(tip_data['container']) : false,
        viewport: tip_data['viewport'] ? $(tip_data['viewport']) : { selector: 'body', padding: 0 }
      });
      
      $target.popover("tip");
      var $tip = $target.data("bs.popover").$tip
      $tipContents.push($tip);
      if (tip_data['class']) {
        $tip.addClass(tip_data['class']);
      }
      if (self.options.additionalPopoverClass) {
        $tip.addClass(self.options.additionalPopoverClass);
      }
      $li.data('targetElement', $target);
      if (idx === (first_step - 1)) {
        if (!$target.is(':visible')) {
          self.log("first_step is invisible, skip it.");      
          first_step++;
          return $target;
        }

        if (self.options.preRideCallback !== $.noop) {
          self.options.preRideCallback(self.$element);
        }
        self.current_step = idx + 1;
        self.$current_target = $target;
        self.$current_popover = self.$current_target.data("bs.popover");
        $target.popover('show');
        var targetOffset = $tip.offset().top - ($(window).height() / 2 - $tip.height() / 2);
        $('html, body').animate({scrollTop: targetOffset}, 500);
        return $target;
      }
    });
    $tipContents.each(function(idx){
      // clicks only have context of the tooltip created for joyride
      this.on('click', 'a.tour-tip-close', $.proxy(self.onClose, self));

      this.on('click', 'a.tour-tip-next', $.proxy(self.onNext, self));
    });
  }
  BootJoyride.prototype.onClose = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return this._stop(this.options.nextOnClose);
  }
  BootJoyride.prototype.onNext = function(e) {
    e.preventDefault();
    e.stopPropagation();
    this._onNext();
  }
  BootJoyride.prototype._onNext = function() {
    var current_step, next_tip, _ref, id;
    current_step = this.current_step;
    this.log("current step: " + current_step);
    var current_target = this.$current_target;//$(this.options.tipContent).first().find("li:nth-child(" + current_step + ")").data('targetElement');
    if (current_target) {
      if (current_target.data('bs.popover')) {
        current_target.popover('hide');              
      } else if (this.$current_popover) {
        this.$current_popover.hide();
      }
    }
    if (this.options.postStepCallback !== $.noop) {
      this.options.postStepCallback(current_step);
    }
    next_tip = (_ref = $(this.options.tipContent).first().find("li:nth-child(" + (current_step + 1) + ")")) != null ? _ref.data('targetElement') : void 0;
    
    this.setCookieStep(current_step + 1);
    this.current_step = this.current_step + 1;
    if (next_tip != null) {
      if (!next_tip.is(':visible')) {
        this.log("next_tip is invisible, skip it.");      
        return this._onNext();
      }
      this.$current_target = next_tip;
      this.$current_popover = this.$current_target.data("bs.popover");
      next_tip.popover('show');
      var $popover = next_tip.data("bs.popover").$tip;
      if ($popover) {
        var targetOffset = $popover.offset().top - ($(window).height() / 2 - $popover.height() / 2);
        $('html, body').animate({scrollTop: targetOffset}, 500);
      }
      return next_tip;
    } else {
      this.log("No next step. End tour.");      
      if (this.options.postRideCallback !== $.noop) {
        return this.options.postRideCallback(this.$element);
      }
    }
  }
  BootJoyride.prototype._stop = function(nextOnClose) {
    var current_step;
    current_step = this.current_step;
    var current_target = this.$current_target;
    if (!current_target) {
      return;
    }

    if (current_target && current_target.data('bs.popover')) {
      current_target.popover('hide');              
    } else if (this.$current_popover) {
      this.$current_popover.hide();
    }
    if (nextOnClose) {
      this.log("skip current step next time.");
      this.setCookieStep(current_step + 1);
    }
    this.$current_target = null;
    return this.options.postRideCallback(this.$element);
  }
  var DO_NOT_SKIP_TO_NEXT = false;
  var SKIP_TO_NEXT = true;
  BootJoyride.prototype.stop = function() {
    this._stop(SKIP_TO_NEXT);
  }
  BootJoyride.prototype.restart = function() {
    this._stop(DO_NOT_SKIP_TO_NEXT);
    this.init(this.$element, this.options);
  }
  BootJoyride.prototype.getDefaults = function() {
    return BootJoyride.DEFAULTS
  }
  BootJoyride.prototype.log = function(msg) {
    if (this.options.debug) {
      return typeof console !== "undefined" && console !== null ? console.log('[bootstrap-tour]', msg) : void 0;
    }
  }
  BootJoyride.prototype.currentStep = function() {
    var current_cookie;
    if (this.options.cookieMonster == null) {
      return 1;
    }
    current_cookie = cookie(this.options.cookieName);
    if (current_cookie == null) {
      return 1;
    }
    try {
      return parseInt(current_cookie);
    } catch (e) {
      return 1;
    }
  }
  BootJoyride.prototype.setCookieStep = function(step) {
    if (this.options.cookieMonster) {
      this.log("Save cookie: "+this.options.cookieName+"="+step);
      return cookie(this.options.cookieName, "" + step, {
        expires: 365,
        domain: this.options.cookieDomain
      });
    }
  }
  function Plugin(option) {
    return this.each(function () {
        var $this = $(this)
        var options = typeof option == 'object' && option
        var data = $this.data('am.boot-joyride')
        if (!data) {
          $this.data('am.boot-joyride', (data = new BootJoyride(this, options)))
        } else {
          if (options) {
            data.init(this, options)
          }
        }
        if (typeof option == 'string') data[option]()
    });
  }
  $.fn.bootJoyride = Plugin

}).call(this);
